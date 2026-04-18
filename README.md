# OpenValue Design System — Atoms & Molecules
### Lit 3 · TypeScript · v2.0

> 15 atoms · 10 molecules · zero hard-coded colours · strict TypeScript throughout

---

## Contents

- [Quick start](#quick-start)
- [Theming & dark mode](#theming--dark-mode)
- [TypeScript usage](#typescript-usage)
- [Atom reference](#atom-reference)
- [Molecule reference](#molecule-reference)
- [Token architecture](#token-architecture)
- [Project structure](#project-structure)
- [Build commands](#build-commands)
- [Browser support](#browser-support)

---

## Quick start

```html
<!-- 1. Design tokens -->
<link rel="stylesheet" href="./openvalue.css">

<!-- 2. Self-contained bundle (Lit + atoms + molecules) -->
<script type="module" src="./dist/openvalue-atoms.js"></script>

<!-- 3. Use -->
<ov-button variant="primary" size="lg">
  <ov-icon slot="start" name="plus"></ov-icon>
  New project
</ov-button>

<ov-field label="Email" for="em" required status="error" message="Invalid address">
  <ov-input id="em" type="email" value="oops" invalid></ov-input>
</ov-field>
```

For bundler projects (Vite / esbuild / webpack):

```ts
import 'openvalue-atoms';              // registers all 25 tags
import { OvButton } from 'openvalue-atoms'; // typed class ref
import type { ButtonVariant } from 'openvalue-atoms'; // type-only
```

---

## Theming & dark mode

All colours are CSS custom properties (`--color-*`) in `openvalue.css`.
Custom properties cross Shadow DOM boundaries, so no component needs to
know about themes — they read the token, and the token re-binds when the
attribute changes on any ancestor.

```html
<!-- Respect OS preference (default — no attribute needed) -->
<html>

<!-- Force light or dark -->
<html data-theme="light">
<html data-theme="dark">

<!-- Scope to a subtree -->
<div data-theme="dark">
  <ov-card>Always dark here</ov-card>
</div>
```

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## TypeScript usage

Every variant, size, and tone is a **string literal union** exported from
`tokens.ts` / `molecule-tokens.ts`. `HTMLElementTagNameMap` augmentation
means `document.querySelector('ov-button')` returns a typed `OvButton`.

```ts
import { OvButton, OvToast } from 'openvalue-atoms';
import type { ButtonVariant, FieldStatus, TabItem, ToastVariant } from 'openvalue-atoms';

// querySelector typed via HTMLElementTagNameMap
const btn = document.querySelector('ov-button')!; // OvButton
btn.variant = 'danger';    // OK
btn.variant = 'prumary';   // TS2322 — not assignable to ButtonVariant

// Field status union
const field = document.querySelector('ov-field')!;
field.status = 'error';    // OK — 'idle'|'success'|'error'|'warning'
field.status = 'critical'; // TS2322

// Typed CustomEvent detail
const inp = document.querySelector('ov-input')!;
inp.addEventListener('input', (e: CustomEvent<{ value: string }>) => {
  console.log(e.detail.value); // string, not any
});

// Tabs with typed items array
const tabs = document.querySelector('ov-tabs')!;
const items: TabItem[] = [
  { key: 'overview', label: 'Overview', count: 4 },
  { key: 'settings', label: 'Settings', disabled: true },
];
tabs.tabs = items;
tabs.active = 'overview';

// Programmatic toast
const toast = document.createElement('ov-toast'); // OvToast
toast.variant  = 'success';     // ToastVariant
toast.title    = 'Saved';
toast.duration = 4000;
document.body.appendChild(toast);
toast.show();
toast.addEventListener('dismiss', () => toast.remove(), { once: true });
```

---

## Atom reference

| Element | Key properties | Events | Slots |
|---|---|---|---|
| `ov-button` | `variant: ButtonVariant`, `size: ButtonSize`, `loading`, `disabled`, `block` | `click` | default, `start`, `end` |
| `ov-input` | `type: InputType`, `value`, `invalid`, `size: ControlSize` | `input`, `change` (detail: `{value}`) | `prefix`, `suffix` |
| `ov-textarea` | `value`, `rows`, `resize: TextareaResize`, `invalid` | `input` | — |
| `ov-label` | `for`, `required`, `size` | — | default, `hint` |
| `ov-heading` | `level: HeadingLevel`, `size: HeadingSize`, `tone: HeadingTone` | — | default |
| `ov-text` | `variant: TextVariant`, `tone: Tone`, `weight: FontWeight`, `as: TextTag` | — | default |
| `ov-badge` | `variant: BadgeVariant`, `appearance: BadgeAppearance`, `size`, `pill` | — | default, `dot` |
| `ov-icon` | `name: IconName`, `size: IconSize`, `label` | — | default (custom SVG) |
| `ov-spinner` | `size: IconSize`, `tone: SpinnerTone`, `label` | — | — |
| `ov-avatar` | `src`, `name`, `initials`, `size: AvatarSize`, `shape`, `tone: AvatarTone` | — | — |
| `ov-divider` | `orientation: DividerOrientation`, `variant: DividerVariant`, `spacing` | — | default (label) |
| `ov-checkbox` | `checked`, `indeterminate`, `disabled`, `name`, `value` | `change` (`{checked,value}`) | default |
| `ov-radio` | `checked`, `disabled`, `name` (reflects), `value` | `change` (`{checked,value}`) | default |
| `ov-switch` | `checked`, `disabled`, `name`, `value` | `change` (`{checked,value}`) | default |
| `ov-link` | `href`, `variant: LinkVariant`, `underline: LinkUnderline`, `size` | — | default |

---

## Molecule reference

| Element | Composes | Key properties | Slots |
|---|---|---|---|
| `ov-field` | `ov-label` + any control | `label`, `for`, `required`, `status: FieldStatus`, `message`, `inline` | default, `label`, `help`, `message` |
| `ov-input-group` | `ov-input` + `ov-button`/text | `attach: InputGroupAttach` | default (input), `start`, `end` |
| `ov-alert` | icon + title + body | `variant: AlertVariant`, `title`, `dismissible` | default, `title`, `actions` |
| `ov-card` | surface + regions | `variant: CardVariant`, `interactive`, `borderless`, `flush` | default, `header`, `footer`, `media` |
| `ov-breadcrumbs` | `ov-link` chain | `items: BreadcrumbItem[]`, `max` | `separator` |
| `ov-tabs` | tab list | `tabs: TabItem[]`, `active`, `appearance`, `fill` | — |
| `ov-menu-item` | icon + label + shortcut | `label`, `description`, `selected`, `disabled`, `separator` | `icon`, `shortcut`, `trailing` |
| `ov-stat` | value + delta | `label`, `value`, `delta`, `trend: StatDelta`, `sublabel` | — |
| `ov-toast` | alert + animation | `variant: ToastVariant`, `title`, `message`, `duration`, `toastId` | default |
| `ov-empty-state` | icon + heading + CTA | `heading`, `description`, `icon`, `size` | `icon`, `actions` |

`ov-toast` imperative API:

```ts
toast.show();  // mount visible + start auto-dismiss timer
toast.hide();  // dismiss (fires 'dismiss' event)
```

`ov-tabs` keyboard: `← / →` move focus · `Home / End` first/last · `Tab` exits.

---

## Token architecture

```
openvalue.css
  ├── Primitive tokens  --ov-*          raw palette, spacing, type scale
  └── Semantic tokens   --color-*       what components read
        ├── [data-theme="light"]        default
        ├── [data-theme="dark"]         forced dark
        └── @media prefers-color-scheme auto-dark (no attribute needed)

src/tokens.ts            string-literal unions mirroring CSS tokens
src/molecule-tokens.ts   molecule-specific types and event detail shapes
```

Components **never** read `--ov-*` primitives. They always read the semantic
`--color-*` layer, so one attribute swap re-themes every shadow root.

---

## Project structure

```
openvalue.css
src/
  tokens.ts
  molecule-tokens.ts
  shared-styles.ts          baseStyles + focusRing (CSSResult)
  index.ts                  barrel — exports everything
  atoms/
    ov-button.ts
    ov-input.ts
    ov-textarea.ts
    ov-label.ts
    ov-typography.ts        ov-heading + ov-text
    ov-badge.ts
    ov-icon.ts              ov-icon + ov-spinner
    ov-avatar-divider.ts    ov-avatar + ov-divider
    ov-selection.ts         ov-checkbox + ov-radio + ov-switch
    ov-link.ts
  molecules/
    ov-field.ts
    ov-input-group.ts
    ov-alert.ts
    ov-card.ts
    ov-breadcrumbs.ts
    ov-tabs.ts
    ov-molecules-misc.ts    ov-menu-item + ov-stat + ov-toast + ov-empty-state
build/                      tsc output (.js + .d.ts + source maps)
dist/
  openvalue-atoms.js        dev bundle + source map  (~115 kB)
  openvalue-atoms.min.js    production bundle         (~95 kB)
demo.html
tsconfig.json
```

---

## Build commands

```bash
npm install

# Type-check (no emit)
npx tsc --noEmit

# Emit JS + .d.ts to build/
npx tsc

# Dev bundle
npx esbuild src/index.ts --bundle --format=esm \
  --outfile=dist/openvalue-atoms.js --sourcemap --loader:.ts=ts

# Production bundle
npx esbuild src/index.ts --bundle --format=esm \
  --outfile=dist/openvalue-atoms.min.js --minify --loader:.ts=ts
```

---

## Browser support

Chrome 67+ · Edge 79+ · Firefox 63+ · Safari 14+
