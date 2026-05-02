# @ov/style

Design token and base-style package for the OpenValue design system.

## Reference

Full token reference: [@tokens.md](./tokens.md)

## Importing

Import the complete system in your app or Storybook entry:

```ts
import '@ov/style';
```

Import individual layers when you need only part of the system:

```ts
import '@ov/style/tokens/primitives.css';
import '@ov/style/tokens/semantic.css';
import '@ov/style/tokens/motion.css';
import '@ov/style/base/reset.css';
import '@ov/style/components/layout.css';
```

## Two-tier token system

The package defines tokens in two tiers. **Always use tier-2 (semantic) tokens in UI code.** Only use tier-1 (primitive) tokens when building the design system itself (new token definitions, component internals).

| Tier           | Prefix                    | Example         | When to use                         |
| -------------- | ------------------------- | --------------- | ----------------------------------- |
| 1 — Primitives | `--ov-*`                  | `--ov-blue-500` | Token definitions only, never in UI |
| 2 — Semantic   | `--color-*`, `--shadow-*` | `--color-brand` | All UI code and components          |

**Correct:**

```css
color: var(--color-text-primary);
background: var(--color-brand);
box-shadow: var(--shadow-md);
```

**Wrong:**

```css
color: var(--ov-neutral-800); /* tier-1 — bypasses theme */
background: var(--ov-blue-500); /* tier-1 — bypasses theme */
color: #1d252d; /* raw hex — never */
```

## Theming

Set `data-theme="light"` or `data-theme="dark"` on the `<html>` element. Without an attribute, `@media (prefers-color-scheme)` is used automatically.

```html
<!-- Explicit themes -->
<html data-theme="light">
  <html data-theme="dark">
    <!-- Auto (follows OS setting) -->
    <html></html>
  </html>
</html>
```

Toggle in JavaScript:

```js
document.documentElement.dataset.theme = 'dark';
```

Semantic tokens resolve to their correct palette automatically. You never need to write dark-mode overrides in your own CSS — use `--color-*` tokens and theming is free.

## CSS authoring

Never use raw px, rem, hex, numeric font-weight, or magic z-index values. Every CSS need has a token — see the [quick reference](./tokens.md#quick-reference) for the right family.

| Need        | Token family                                                    |
| ----------- | --------------------------------------------------------------- |
| Spacing     | `--ov-space-*` (4px base: `--ov-space-4` = 16px)                |
| Font size   | `--ov-fs-xs` … `--ov-fs-3xl` (fluid, clamps between viewports)  |
| Font weight | `--ov-fw-light` … `--ov-fw-bold` — never numeric                |
| Motion      | `--ov-duration-*` · `--ov-ease-*` — already reduced-motion–safe |
| Z-index     | `--ov-z-base` … `--ov-z-tooltip` — never magic numbers          |

## Layout classes

Use instead of writing one-off flex/grid wrappers. Full docs in [tokens.md](./tokens.md#layout-classes).

```html
<div class="ov-container">…</div>
<!-- centered, max 1280px -->
<div class="ov-stack">…</div>
<!-- vertical flex, 16px gap -->
<div class="ov-row">…</div>
<!-- horizontal flex, centered -->
<div class="ov-grid">…</div>
<!-- auto-fit grid, min 240px cols -->
```

## Shadow DOM and utility classes

CSS utility classes (`.ov-text-primary`, `.ov-bg-surface`, etc.) **do not pierce shadow DOM boundaries**. They work in regular HTML but have no effect inside a Lit component's shadow root.

CSS custom properties **do** pierce shadow DOM. That is the entire reason the design system exposes `--color-*` tokens — a `data-theme` flip on the `<html>` element propagates into every shadow root automatically.

**Consequence:** never try to apply utility classes to elements inside a web component's template. Always use CSS custom properties via `var(--color-*)` in component CSS.

```css
/* ✓ Works inside shadow DOM */
:host {
  color: var(--color-text-primary);
}
.card {
  background: var(--color-bg-surface);
  box-shadow: var(--shadow-md);
}

/* ✗ Has no effect inside shadow DOM */
:host {
  @apply ov-text-primary;
} /* doesn't exist and wouldn't work */
```

Utility classes and layout classes (`.ov-container`, `.ov-stack`) are only for **light-DOM HTML** — page templates, app shells, prose content outside of web components.

## Rules

- **Never use raw hex or pixel values** where a token exists.
- **Never use tier-1 (`--ov-*`) tokens in UI** — they are palette primitives, not semantic intent.
- **Never write dark-mode overrides** for `--color-*` tokens — the theme system handles it.
- **Never override `--color-*` tokens locally** (e.g., scoped to a component) — this breaks theme coherence.
- Always use `--ov-space-*` for spacing, `--ov-fs-*` for font sizes, `--ov-fw-*` for weights.
- Motion tokens are already reduced-motion–safe; do not add separate `@media (prefers-reduced-motion)` guards for transitions using these tokens.
