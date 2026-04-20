# @ov/style

Design token and base-style package for the OpenValue design system. Provides a two-tier CSS custom property system, browser reset, typography defaults, layout helpers, and utility classes.

## Installation

This package is consumed as a workspace dependency. Import the full system once in your app entry point:

```ts
import '@ov/style';
```

Or import individual layers:

```ts
import '@ov/style/tokens/semantic.css';   // theme-aware color tokens only
import '@ov/style/tokens/motion.css';      // durations and easing
import '@ov/style/components/layout.css';  // .ov-container, .ov-stack, etc.
```

## Token system

Tokens are organised in two tiers.

**Tier 1 — Primitives** (`--ov-*`): raw palette values, scales, and constants. Never use these in UI — they are building blocks for the semantic layer.

**Tier 2 — Semantics** (`--color-*`, `--shadow-*`): theme-aware aliases. These are the tokens to use in all UI code and component CSS. They resolve to different primitive values in light and dark mode automatically.

```css
/* ✓ Use semantic tokens */
color: var(--color-text-primary);
background: var(--color-bg-surface);
box-shadow: var(--shadow-md);
padding: var(--ov-space-4);         /* spacing is always primitive — no semantic alias needed */

/* ✗ Never use primitive color tokens in UI */
color: var(--ov-neutral-800);
background: var(--ov-blue-500);
```

## Theming

Set `data-theme` on `<html>`. Without it, the OS preference is used automatically.

```html
<html data-theme="light">
<html data-theme="dark">
<html>  <!-- auto -->
```

```js
document.documentElement.dataset.theme = 'dark';
```

## Shadow DOM

CSS utility classes do **not** pierce shadow DOM boundaries. CSS custom properties **do**. All `ov-*` web components rely exclusively on `var(--color-*)` tokens — never on utility classes — so theming propagates through shadow roots automatically.

## What's included

| File | Contents |
|------|----------|
| `tokens/primitives.css` | Brand palette, spacing scale, type scale, radii, z-index, shadows |
| `tokens/semantic.css` | Theme-aware color aliases for light, dark, auto, and high-contrast |
| `tokens/motion.css` | Duration and easing tokens, reduced-motion override |
| `base/fonts.css` | Montserrat import from Google Fonts |
| `base/reset.css` | Box-sizing, antialiasing, focus ring, element defaults |
| `base/typography.css` | `h1`–`h4`, link, `code`/`kbd` element defaults |
| `components/layout.css` | `.ov-container`, `.ov-stack`, `.ov-row`, `.ov-grid` |
| `utilities/color.css` | Text, background, and border color utilities |
| `utilities/spacing.css` | Margin, padding, and shadow utilities |
| `utilities/shape.css` | Border-radius utilities |
| `utilities/a11y.css` | `.ov-visually-hidden` |

## Full reference

See [`tokens.md`](./tokens.md) for every token grouped by category with light/dark values.

See [`CLAUDE.md`](./CLAUDE.md) for usage rules and best practices.
