# OpenValue Design System

Monorepo containing the OpenValue design system and a Vite demo application.

## Packages

| Package | Description |
|---------|-------------|
| [`packages/style`](./packages/style) | Design token CSS — `@ov/style` |
| [`packages/ui-components`](./packages/ui-components) | Lit 3 web-component library — `@ov/ui-components` |
| [`apps/my-app`](./apps/my-app) | Vite demo application |

## Quick start

```bash
# Install all dependencies (workspace root)
npm install

# Start the demo app  →  http://localhost:5173
cd apps/my-app && npm run dev

# Component explorer (Storybook)  →  http://localhost:6006
cd packages/ui-components && npm run storybook

# Unit tests
cd packages/ui-components && npm test
```

## Architecture

The design system follows **atomic design** — components are grouped into three tiers:

```
atoms       primitive UI elements  (button, input, icon, badge, heading…)
molecules   compositions of atoms  (field, card, alert, tabs, image-card…)
organisms   full page sections      (nav-bar, hero, carousel, page-layout)
```

Styling is driven by a **two-tier CSS custom property system** in `@ov/style`:

- **Tier 1 — Primitives** (`--ov-*`): raw palette values. Never used directly in UI.
- **Tier 2 — Semantics** (`--color-*`, `--shadow-*`): theme-aware aliases consumed by all components.

Switching themes is a single attribute on `<html>`:

```html
<html data-theme="light">   <!-- force light -->
<html data-theme="dark">    <!-- force dark  -->
<html>                      <!-- follow OS preference (default) -->
```

Because CSS custom properties pierce shadow DOM boundaries, every `ov-*` component re-themes automatically — no component needs to know about dark mode.

## Component overview

### Atoms

`ov-button` `ov-badge` `ov-icon` `ov-spinner` `ov-input` `ov-textarea` `ov-label` `ov-link` `ov-checkbox` `ov-radio` `ov-switch` `ov-heading` `ov-text` `ov-avatar` `ov-divider`

### Molecules

`ov-field` `ov-alert` `ov-card` `ov-image-card` `ov-breadcrumbs` `ov-input-group` `ov-tabs` `ov-menu-item` `ov-stat` `ov-toast` `ov-empty-state`

### Organisms

`ov-nav-bar` `ov-hero` `ov-carousel` `ov-page-layout`

## Importing components

```ts
import '@ov/style';  // design tokens — import once in app entry

import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/atoms/input/ov-input';
import '@ov/ui-components/molecules/field/ov-field';
import '@ov/ui-components/molecules/image-card/ov-image-card';
import '@ov/ui-components/organisms/nav-bar/ov-nav-bar';
import '@ov/ui-components/organisms/hero/ov-hero';
import '@ov/ui-components/organisms/carousel/ov-carousel';
import '@ov/ui-components/organisms/page-layout/ov-page-layout';
```

There is no barrel export — import each component by path.

## TypeScript

Every variant, size, and tone is a string-literal union exported from `tokens.ts` / `molecule-tokens.ts`. `HTMLElementTagNameMap` augmentation means `document.querySelector('ov-button')` returns a typed `OvButton`.

```ts
import type { ButtonVariant, FieldStatus, TabItem } from '@ov/ui-components/src/tokens.js';

const btn = document.querySelector('ov-button')!;
btn.variant = 'danger';     // ✓
btn.variant = 'prumary';    // ✗ TS error — not assignable to ButtonVariant
```

## Repository structure

```
ov/
├── apps/
│   └── my-app/                  Vite demo application
├── packages/
│   ├── style/                   @ov/style
│   │   ├── tokens/              primitives.css · semantic.css · motion.css
│   │   ├── base/                reset.css · fonts.css · typography.css
│   │   ├── components/          layout.css (.ov-container, .ov-stack…)
│   │   ├── utilities/           color · spacing · shape · a11y
│   │   ├── index.css            full system entry point
│   │   ├── CLAUDE.md            usage rules and best practices
│   │   ├── tokens.md            complete token reference
│   │   └── README.md
│   └── ui-components/           @ov/ui-components
│       └── src/
│           ├── atoms/           15 atom components
│           ├── molecules/       11 molecule components
│           ├── organisms/       4 organism components
│           ├── shared-styles.ts baseStyles + focusRing
│           ├── tokens.ts        atom prop type unions
│           └── molecule-tokens.ts  molecule prop type unions
└── CLAUDE.md                    AI assistant guidance
```

## Technology

- **[Lit 3](https://lit.dev)** — web components with reactive properties and shadow DOM
- **CSS custom properties** — design tokens that pierce shadow DOM for zero-overhead theming
- **[Storybook 8](https://storybook.js.org)** — component explorer with dark mode toggle and auto-generated docs
- **[Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)** + **[@open-wc/testing](https://open-wc.org/docs/testing/helpers/)** — browser-native unit tests with axe accessibility checks
- **[Vite](https://vitejs.dev)** — demo app dev server and bundler

## Browser support

Chrome 67+ · Edge 79+ · Firefox 63+ · Safari 14+
