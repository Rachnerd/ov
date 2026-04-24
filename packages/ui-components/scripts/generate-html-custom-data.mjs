#!/usr/bin/env node
/**
 * Generates .vscode/html.custom-data.json from the custom element definitions
 * already present in .htmlvalidate.json. Runs automatically after `cem analyze`.
 * Never edit html.custom-data.json by hand.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const validateConfig = JSON.parse(
  readFileSync(resolve(root, '.htmlvalidate.json'), 'utf8'),
);

// The elements array is ["html5", { "ov-*": { ... }, ... }]
const customElements = validateConfig.elements.find(
  (e) => typeof e === 'object',
);

const tags = Object.entries(customElements).map(([name, meta]) => {
  const attributes = Object.entries(meta.attributes ?? {}).map(
    ([attrName, attrMeta]) => {
      const entry = { name: attrName };
      if (attrMeta.description) entry.description = attrMeta.description;
      if (Array.isArray(attrMeta.enum)) {
        entry.values = attrMeta.enum
          .filter((v) => v !== '')
          .map((v) => ({ name: v }));
      }
      return entry;
    },
  );

  const tag = { name };
  if (meta.description) tag.description = meta.description;
  if (attributes.length) tag.attributes = attributes;
  return tag;
});

const output = { version: 1.1, tags };
writeFileSync(
  resolve(root, '.vscode/html.custom-data.json'),
  JSON.stringify(output, null, 2) + '\n',
);

console.log(
  `Generated .vscode/html.custom-data.json (${tags.length} elements)`,
);
