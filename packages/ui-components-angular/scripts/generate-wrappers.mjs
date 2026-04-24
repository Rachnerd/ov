#!/usr/bin/env node
/**
 * generate-wrappers.mjs
 *
 * Reads packages/ui-components/custom-elements.json and generates Angular
 * wrapper components into packages/ui-components-angular/src/lib/.
 * Also regenerates module.ts to keep the barrel export in sync.
 *
 * Run:  node scripts/generate-wrappers.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ANGULAR_PKG = join(__dir, '..');
const UI_PKG = join(__dir, '../../ui-components');
const LIB_DIR = join(ANGULAR_PKG, 'src/lib');

// ── Type resolution ──────────────────────────────────────────────────────────

function parseTypeAliases(src) {
  const map = {};
  for (const [, name, body] of src.matchAll(
    /export type (\w+)\s*=\s*((?:(?!export\s)[\s\S])*?);/g,
  )) {
    // Strip inline comments before storing so they don't corrupt union types.
    const clean = body.replace(/\/\/[^\n]*/g, '').trim().replace(/\s+/g, ' ');
    map[name] = clean;
  }
  return map;
}

function parseInterfaces(src) {
  const map = {};
  for (const [, name, body] of src.matchAll(
    /export interface (\w+)\s*\{([^}]*)\}/gs,
  )) {
    map[name] = body.trim();
  }
  return map;
}

/** Parse `export const NAME = ['a', 'b'] as const` → { NAME: "'a' | 'b'" } */
function parseConstArrays(src) {
  const map = {};
  for (const [, name, body] of src.matchAll(
    /export const (\w+)\s*=\s*\[([\s\S]*?)\]\s*as\s*const/g,
  )) {
    const values = [...body.matchAll(/'([^']+)'/g)].map(m => `'${m[1]}'`);
    if (values.length) map[name] = values.join(' | ');
  }
  return map;
}

const _tokensSource = readFileSync(join(UI_PKG, 'src/tokens.ts'), 'utf8');

// Load global design-system type definitions once.
const GLOBAL_TYPES = {
  ...parseTypeAliases(_tokensSource),
  ...parseTypeAliases(readFileSync(join(UI_PKG, 'src/molecule-tokens.ts'), 'utf8')),
};
const GLOBAL_INTERFACES = {
  ...parseInterfaces(_tokensSource),
  ...parseInterfaces(readFileSync(join(UI_PKG, 'src/molecule-tokens.ts'), 'utf8')),
};
const CONST_ARRAYS = parseConstArrays(_tokensSource);

/**
 * Fully resolve a type expression:
 *  - Expands `typeof ARRAY[number]` to the actual string literal union
 *  - Substitutes known PascalCase type aliases recursively
 */
function fullyResolve(typeText, visited = new Set()) {
  // Expand typeof X[number] (as const array types)
  typeText = typeText.replace(/typeof (\w+)\[number\]/g, (_, name) =>
    CONST_ARRAYS[name] ?? `typeof ${name}[number]`,
  );
  // Substitute remaining PascalCase type name references
  typeText = typeText.replace(/\b([A-Z][A-Za-z0-9]+)\b/g, (match) => {
    if (visited.has(match) || !GLOBAL_TYPES[match]) return match;
    visited.add(match);
    return fullyResolve(GLOBAL_TYPES[match], visited);
  });
  return typeText;
}

function resolveType(typeText, localInterfaces = {}) {
  if (!typeText) return 'unknown';
  if (['string', 'number', 'boolean'].includes(typeText)) return typeText;
  // Global type alias (ButtonVariant, ControlSize, …) — fully resolve to avoid
  // unresolvable references like BuiltInIconName in the generated file.
  if (GLOBAL_TYPES[typeText]) return fullyResolve(GLOBAL_TYPES[typeText]);
  // Array type — keep as-is; the interface will be declared locally
  if (/^\w+\[\]$/.test(typeText)) return typeText;
  // Always run fullyResolve: handles pure literal unions (no-op) and mixed
  // expressions like `BuiltInIconName | ''` that contain unresolved names.
  return fullyResolve(typeText);
}

/** Extract the TypeScript detail type from a CustomEvent<T> string. */
function resolveEventDetail(eventTypeText, localInterfaces = {}) {
  const inner = eventTypeText?.match(/CustomEvent<(.+)>$/)?.[1]?.trim();
  if (!inner) return 'void';
  if (inner.startsWith('{')) return inner;
  const allInterfaces = { ...GLOBAL_INTERFACES, ...localInterfaces };
  if (allInterfaces[inner]) {
    return `{ ${allInterfaces[inner].replace(/\n\s*/g, ' ').trim()} }`;
  }
  if (GLOBAL_TYPES[inner]) return GLOBAL_TYPES[inner];
  return inner;
}

// ── Naming helpers ───────────────────────────────────────────────────────────

const toPascalCase = tag => tag.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');

/** field-reset → fieldResetEvent */
const toOutputName = event => event.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Event';

const getTier = path =>
  path.match(/src\/(atoms|molecules|organisms|templates)\//)?.[1] ?? null;

const getLitImport = path => path.replace(/^src\//, '').replace(/\.ts$/, '');

// ── Wrapper generator ────────────────────────────────────────────────────────

// Native DOM events — Angular handles these directly; no @Output needed.
const SKIP_EVENTS = new Set(['click']);

function generateWrapper({ tagName, modulePath, fields, events }) {
  const litSrcPath = join(UI_PKG, modulePath);
  const litImport = getLitImport(modulePath);
  const className = `${toPascalCase(tagName)}Component`;

  // Scan the Lit source for any locally-exported interfaces (e.g. NavItem).
  let localInterfaces = {};
  try {
    const src = readFileSync(litSrcPath, 'utf8');
    localInterfaces = { ...parseInterfaces(src), ...parseTypeAliases(src) };
  } catch {}

  // ── Process props
  const props = fields.map(f => {
    const raw = f.type?.text ?? 'string';
    const arrMatch = raw.match(/^(\w+)\[\]$/);
    return {
      name: f.name,
      type: resolveType(raw, localInterfaces),
      default: f.default ?? "''",
      // Interface name for array types that need a local declaration
      arrayItemType: arrMatch?.[1] ?? null,
    };
  });

  // Collect interface bodies that need to be declared in this file.
  const neededInterfaces = new Map();
  for (const p of props) {
    if (!p.arrayItemType) continue;
    const body = { ...GLOBAL_INTERFACES, ...localInterfaces }[p.arrayItemType];
    if (body) neededInterfaces.set(p.arrayItemType, body);
  }

  // ── Process events
  const filteredEvents = events.filter(e => !SKIP_EVENTS.has(e.name));
  const outputs = filteredEvents.map(e => ({
    name: e.name,
    outputName: toOutputName(e.name),
    detailType: resolveEventDetail(e.type?.text, localInterfaces),
  }));

  const hasProps = props.length > 0;
  const hasEvents = outputs.length > 0;

  // ── Build Angular import list
  const ngImports = ['Component', 'Input'];
  if (hasEvents) ngImports.push('Output', 'EventEmitter');
  ngImports.push('ElementRef');
  const lifecycle = [
    ...(hasProps ? ['OnChanges'] : []),
    ...(hasEvents ? ['OnInit', 'OnDestroy'] : []),
  ];
  ngImports.push(...lifecycle, 'ChangeDetectionStrategy', 'inject');

  const utilImports = [
    ...(hasProps ? ['applyProps'] : []),
    ...(hasEvents ? ['listen'] : []),
  ];

  const impl = lifecycle.length ? ` implements ${lifecycle.join(', ')}` : '';

  // ── Emit
  const out = [];

  out.push(`import {`);
  out.push(`  ${ngImports.join(',\n  ')},`);
  out.push(`} from '@angular/core';`);
  if (utilImports.length) {
    out.push(`import { ${utilImports.join(', ')} } from '../../utils.js';`);
  }
  out.push(`import '@ov/ui-components/${litImport}';`);
  out.push('');

  for (const [name, body] of neededInterfaces) {
    out.push(`export interface ${name} {`);
    body.split('\n').forEach(l => { const t = l.trim(); if (t) out.push(`  ${t}`); });
    out.push('}');
    out.push('');
  }

  out.push(`@Component({`);
  out.push(`  selector: '${tagName}',`);
  out.push(`  standalone: true,`);
  out.push(`  template: '<ng-content></ng-content>',`);
  out.push(`  changeDetection: ChangeDetectionStrategy.OnPush,`);
  out.push(`})`);
  out.push(`export class ${className}${impl} {`);

  for (const p of props) {
    const isPrimitive = ['string', 'number', 'boolean'].includes(p.type);
    if (isPrimitive) {
      out.push(`  @Input() ${p.name} = ${p.default};`);
    } else {
      out.push(`  @Input() ${p.name}: ${p.type} = ${p.default};`);
    }
  }

  if (hasEvents) {
    if (hasProps) out.push('');
    for (const o of outputs) {
      out.push(`  @Output() ${o.outputName} = new EventEmitter<${o.detailType}>();`);
    }
  }

  out.push('');
  out.push(`  private _el = inject(ElementRef);`);
  if (hasEvents) out.push(`  private _teardowns: Array<() => void> = [];`);

  if (hasProps) {
    out.push('');
    out.push(`  ngOnChanges(): void {`);
    out.push(`    applyProps(this._el, {`);
    for (const p of props) out.push(`      ${p.name}: this.${p.name},`);
    out.push(`    });`);
    out.push(`  }`);
  }

  if (hasEvents) {
    out.push('');
    out.push(`  ngOnInit(): void {`);
    out.push(`    this._teardowns.push(`);
    outputs.forEach((o, i) => {
      const comma = i < outputs.length - 1 ? ',' : '';
      out.push(`      listen<CustomEvent<${o.detailType}>>(this._el, '${o.name}', (ev) => {`);
      out.push(`        this.${o.outputName}.emit(ev.detail);`);
      out.push(`      })${comma}`);
    });
    out.push(`    );`);
    out.push(`  }`);

    out.push('');
    out.push(`  ngOnDestroy(): void {`);
    out.push(`    this._teardowns.forEach((fn) => fn());`);
    out.push(`  }`);
  }

  out.push('}');
  out.push('');

  return out.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────

const cem = JSON.parse(readFileSync(join(UI_PKG, 'custom-elements.json'), 'utf8'));
let count = 0;

for (const mod of cem.modules) {
  const decl = mod.declarations?.find(d => d.tagName && d.customElement);
  if (!decl) continue;

  const tier = getTier(mod.path);
  if (!tier) continue;

  const fields = (decl.members ?? []).filter(
    m => m.kind === 'field' && !m.privacy && m.attribute,
  );

  const content = generateWrapper({
    tagName: decl.tagName,
    modulePath: mod.path,
    fields,
    events: decl.events ?? [],
  });

  const outDir = join(LIB_DIR, tier);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${decl.tagName}.ts`), content);

  console.log(`  ${tier}/${decl.tagName}.ts`);
  count++;
}

console.log(`\n${count} wrappers generated.`);
