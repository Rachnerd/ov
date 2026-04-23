# Design Token Reference

Full reference for all tokens in `@ov/style`. See [CLAUDE.md](./CLAUDE.md) for usage rules.

> **Tier-1 primitives** (`--ov-*`) are raw scale values — use them only when defining new tokens.  
> **Tier-2 semantic tokens** (`--color-*`, `--shadow-*`) are theme-aware — use these in all UI code.

---

## Semantic tokens (use these in UI)

### Colors — Surfaces

| Token | Light | Dark |
|-------|-------|------|
| `--color-bg-canvas` | `#F1F5F6` | `#10161B` |
| `--color-bg-surface` | `#FFFFFF` | `#1D252D` |
| `--color-bg-surface-alt` | `#F1F5F6` | `#2E3A3E` |
| `--color-bg-surface-muted` | `#E4EBED` | `#455558` |
| `--color-bg-inverse` | `#1D252D` | `#F1F5F6` |
| `--color-bg-overlay` | `rgba(29,37,45,0.55)` | `rgba(0,0,0,0.65)` |

### Colors — Text

| Token | Light | Dark |
|-------|-------|------|
| `--color-text-primary` | `#1D252D` | `#F1F5F6` |
| `--color-text-secondary` | `#455558` | `#CBD9DA` |
| `--color-text-tertiary` | `#5E7478` | `#A9BCBE` |
| `--color-text-muted` | `#809FA2` | `#5E7478` |
| `--color-text-inverse` | `#FFFFFF` | `#1D252D` |
| `--color-text-link` | `#2F66AB` | `#7FB0E2` |
| `--color-text-link-hover` | `#254F86` | `#ADCDEE` |
| `--color-text-on-brand` | `#FFFFFF` | `#FFFFFF` |
| `--color-text-on-accent` | `#FFFFFF` | `#FFFFFF` |

### Colors — Borders

| Token | Light | Dark |
|-------|-------|------|
| `--color-border-subtle` | `#E4EBED` | `#2E3A3E` |
| `--color-border` | `#CBD9DA` | `#455558` |
| `--color-border-strong` | `#A9BCBE` | `#5E7478` |
| `--color-border-inverse` | `#455558` | `#A9BCBE` |
| `--color-border-focus` | `#3D7DC9` | `#5B96D6` |

### Colors — Brand (Blue)

| Token | Description |
|-------|-------------|
| `--color-brand` | Base brand blue |
| `--color-brand-hover` | Hover state |
| `--color-brand-active` | Active/pressed state |
| `--color-brand-subtle` | Tinted background |
| `--color-brand-muted` | Muted background |
| `--color-brand-contrast` | Text on brand backgrounds |

### Colors — Accent (Midnight Teal)

| Token | Description |
|-------|-------------|
| `--color-accent` | Base accent teal |
| `--color-accent-hover` | Hover state |
| `--color-accent-active` | Active/pressed state |
| `--color-accent-subtle` | Tinted background |
| `--color-accent-contrast` | Text on accent backgrounds |

### Colors — Semantic States

| Token | Intent |
|-------|--------|
| `--color-success` | Success indicator |
| `--color-success-bg` | Success tinted background |
| `--color-success-text` | Success text (passes contrast) |
| `--color-warning` | Warning indicator |
| `--color-warning-bg` | Warning tinted background |
| `--color-warning-text` | Warning text |
| `--color-danger` | Danger/error indicator |
| `--color-danger-bg` | Danger tinted background |
| `--color-danger-text` | Danger text |
| `--color-info` | Info indicator |
| `--color-info-bg` | Info tinted background |
| `--color-info-text` | Info text |

### Colors — Form Controls

| Token | Description |
|-------|-------------|
| `--color-control-bg` | Input/select background |
| `--color-control-bg-hover` | Input hover background |
| `--color-control-bg-disabled` | Disabled input background |
| `--color-control-border` | Input border |
| `--color-control-border-hover` | Input border on hover |

### Shadows

| Token | Use for |
|-------|---------|
| `--shadow-xs` | Subtle lift (chip, tag) |
| `--shadow-sm` | Card resting state |
| `--shadow-md` | Card hover, dropdown |
| `--shadow-lg` | Modal, large overlay |
| `--shadow-xl` | Full-screen overlay |
| `--shadow-focus` | Focus ring (3px blue glow) |

---

## Primitive tokens (design system internals only)

### Color Palette

#### Brand colors

| Token | Value | Description |
|-------|-------|-------------|
| `--ov-blue` | `#3D7DC9` | Primary brand blue (PMS 660 C) |
| `--ov-charcoal` | `#1D252D` | Primary charcoal (PMS 433 C) |
| `--ov-midnight` | `#014046` | Accent midnight teal |
| `--ov-steel-gray` | `#CBD9DA` | Accent steel gray |
| `--ov-light-steel-gray` | `#F1F5F6` | Accent light steel gray |
| `--ov-white` | `#FFFFFF` | Pure white |
| `--ov-black` | `#000000` | Pure black |

#### Blue scale

| Token | Value |
|-------|-------|
| `--ov-blue-50` | `#EEF5FC` |
| `--ov-blue-100` | `#D6E6F6` |
| `--ov-blue-200` | `#ADCDEE` |
| `--ov-blue-300` | `#7FB0E2` |
| `--ov-blue-400` | `#5B96D6` |
| `--ov-blue-500` | `#3D7DC9` |
| `--ov-blue-600` | `#2F66AB` |
| `--ov-blue-700` | `#254F86` |
| `--ov-blue-800` | `#1C3B65` |
| `--ov-blue-900` | `#132849` |

#### Neutral scale

| Token | Value |
|-------|-------|
| `--ov-neutral-0` | `#FFFFFF` |
| `--ov-neutral-50` | `#F1F5F6` |
| `--ov-neutral-100` | `#E4EBED` |
| `--ov-neutral-200` | `#CBD9DA` |
| `--ov-neutral-300` | `#A9BCBE` |
| `--ov-neutral-400` | `#809FA2` |
| `--ov-neutral-500` | `#5E7478` |
| `--ov-neutral-600` | `#455558` |
| `--ov-neutral-700` | `#2E3A3E` |
| `--ov-neutral-800` | `#1D252D` |
| `--ov-neutral-900` | `#10161B` |
| `--ov-neutral-1000` | `#000000` |

#### Midnight (teal) scale

| Token | Value |
|-------|-------|
| `--ov-midnight-50` | `#E6EEEF` |
| `--ov-midnight-100` | `#C1D5D7` |
| `--ov-midnight-200` | `#809FA2` |
| `--ov-midnight-300` | `#4A7479` |
| `--ov-midnight-400` | `#265158` |
| `--ov-midnight-500` | `#014046` |
| `--ov-midnight-600` | `#013338` |
| `--ov-midnight-700` | `#01262A` |
| `--ov-midnight-800` | `#00191C` |

#### State color scales

| Token | Value |
|-------|-------|
| `--ov-success-50` | `#E6F4EC` |
| `--ov-success-500` | `#2E9B57` |
| `--ov-success-700` | `#1E6B3C` |
| `--ov-warning-50` | `#FFF6E5` |
| `--ov-warning-500` | `#E39A1F` |
| `--ov-warning-700` | `#A26810` |
| `--ov-danger-50` | `#FDECEC` |
| `--ov-danger-500` | `#D23B3B` |
| `--ov-danger-700` | `#922121` |

---

### Typography

#### Font families

| Token | Value |
|-------|-------|
| `--ov-font-primary` | Montserrat, Avenir Next, system sans-serif |
| `--ov-font-secondary` | Avenir Next, Montserrat, system sans-serif |
| `--ov-font-mono` | SF Mono, Menlo, Consolas, monospace |

#### Font sizes (fluid — clamp between viewports)

| Token | Size range |
|-------|------------|
| `--ov-fs-xs` | ~12–13px |
| `--ov-fs-sm` | ~14–15px |
| `--ov-fs-base` | ~16–17px |
| `--ov-fs-md` | ~18–20px |
| `--ov-fs-lg` | ~22–26px |
| `--ov-fs-xl` | ~28–36px |
| `--ov-fs-2xl` | ~36–48px |
| `--ov-fs-3xl` | ~48–72px |

#### Font weights

| Token | Value |
|-------|-------|
| `--ov-fw-light` | 300 |
| `--ov-fw-regular` | 400 |
| `--ov-fw-medium` | 500 |
| `--ov-fw-semibold` | 600 |
| `--ov-fw-bold` | 700 |

#### Line heights

| Token | Value |
|-------|-------|
| `--ov-lh-tight` | 1.1 |
| `--ov-lh-snug` | 1.25 |
| `--ov-lh-normal` | 1.5 |
| `--ov-lh-relaxed` | 1.7 |

#### Letter spacing

| Token | Value |
|-------|-------|
| `--ov-ls-tighter` | −0.02em |
| `--ov-ls-tight` | −0.01em |
| `--ov-ls-normal` | 0 |
| `--ov-ls-wide` | 0.04em |
| `--ov-ls-wider` | 0.08em |
| `--ov-ls-widest` | 0.14em |
| `--ov-ls-display` | 0.25em |

---

### Spacing (4px base grid)

| Token | Value |
|-------|-------|
| `--ov-space-0` | 0 |
| `--ov-space-1` | 4px |
| `--ov-space-2` | 8px |
| `--ov-space-3` | 12px |
| `--ov-space-4` | 16px |
| `--ov-space-5` | 20px |
| `--ov-space-6` | 24px |
| `--ov-space-8` | 32px |
| `--ov-space-10` | 40px |
| `--ov-space-12` | 48px |
| `--ov-space-16` | 64px |
| `--ov-space-20` | 80px |
| `--ov-space-24` | 96px |
| `--ov-space-32` | 128px |

---

### Border radius

| Token | Value |
|-------|-------|
| `--ov-radius-none` | 0 |
| `--ov-radius-xs` | 2px |
| `--ov-radius-sm` | 4px |
| `--ov-radius-md` | 8px |
| `--ov-radius-lg` | 12px |
| `--ov-radius-xl` | 16px |
| `--ov-radius-2xl` | 24px |
| `--ov-radius-pill` | 999px |

### Border widths

| Token | Value |
|-------|-------|
| `--ov-border-thin` | 1px |
| `--ov-border-base` | 1.5px |
| `--ov-border-thick` | 2px |

---

### Motion

#### Durations

| Token | Value | Use for |
|-------|-------|---------|
| `--ov-duration-instant` | 80ms | Micro-interactions (toggle) |
| `--ov-duration-fast` | 140ms | Hover, focus, color changes |
| `--ov-duration-base` | 220ms | Standard transitions |
| `--ov-duration-slow` | 360ms | Panel open/close |
| `--ov-duration-slower` | 520ms | Page-level transitions |

#### Easing curves

| Token | Curve | Use for |
|-------|-------|---------|
| `--ov-ease-linear` | `linear` | Progress bars |
| `--ov-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Elements entering view |
| `--ov-ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Shared-axis transitions |
| `--ov-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounce (badges, toasts) |

All duration tokens are set to `0.01ms` under `prefers-reduced-motion: reduce`.

---

### Z-index layers

| Token | Value | Layer |
|-------|-------|-------|
| `--ov-z-base` | 0 | Normal flow |
| `--ov-z-raised` | 10 | Elevated cards |
| `--ov-z-dropdown` | 100 | Dropdowns, menus |
| `--ov-z-sticky` | 200 | Sticky headers |
| `--ov-z-overlay` | 300 | Overlays, backdrops |
| `--ov-z-modal` | 400 | Modal dialogs |
| `--ov-z-popover` | 500 | Popovers, tooltips anchored to elements |
| `--ov-z-toast` | 600 | Toast notifications |
| `--ov-z-tooltip` | 700 | Floating tooltips |

---

### Container widths / Breakpoints

| Token | Value |
|-------|-------|
| `--ov-bp-sm` / `--ov-container-sm` | 640px |
| `--ov-bp-md` / `--ov-container-md` | 768px |
| `--ov-bp-lg` / `--ov-container-lg` | 1024px |
| `--ov-bp-xl` / `--ov-container-xl` | 1280px |
| `--ov-bp-2xl` / `--ov-container-2xl` | 1536px |

> Breakpoint tokens cannot be used directly in `@media` queries (CSS custom properties don't work there). Use the raw values (`640px`, `768px`, etc.) in media queries, and the `--ov-container-*` tokens for `max-width` values in CSS.

---

## Layout classes

### `.ov-container`

Centered content wrapper with responsive inline padding.

```html
<div class="ov-container">
  <!-- max-width 1280px, centered, 24–32px inline padding -->
</div>
```

### `.ov-stack`

Vertical flex column with gap.

```html
<div class="ov-stack">…</div>              <!-- 16px gap -->
<div class="ov-stack ov-stack--sm">…</div> <!-- 8px gap -->
<div class="ov-stack ov-stack--lg">…</div> <!-- 24px gap -->
<div class="ov-stack ov-stack--xl">…</div> <!-- 32px gap -->
```

### `.ov-row`

Horizontal flex row, vertically centered.

```html
<div class="ov-row">…</div>                      <!-- center-aligned, 16px gap -->
<div class="ov-row ov-row--between">…</div>      <!-- space-between -->
<div class="ov-row ov-row--start">…</div>        <!-- flex-start -->
<div class="ov-row ov-row--end">…</div>          <!-- flex-end -->
```

### `.ov-grid`

Auto-fit responsive grid.

```html
<div class="ov-grid">
  <!-- auto-fit columns, minimum 240px wide, 24px gap -->
</div>
```

---

## Utility classes

### Text color

`.ov-text-primary` `.ov-text-secondary` `.ov-text-tertiary` `.ov-text-muted`  
`.ov-text-brand` `.ov-text-accent` `.ov-text-inverse`  
`.ov-text-success` `.ov-text-warning` `.ov-text-danger`

### Text style

`.ov-text-center` `.ov-text-right`  
`.ov-text-uppercase` (also applies `--ov-ls-widest` letter-spacing)  
`.ov-fw-light` `.ov-fw-regular` `.ov-fw-medium` `.ov-fw-semibold` `.ov-fw-bold`

### Background

`.ov-bg-canvas` `.ov-bg-surface` `.ov-bg-surface-alt`  
`.ov-bg-brand` `.ov-bg-accent` `.ov-bg-inverse`

### Borders

`.ov-border` (default border)  
`.ov-border-subtle`  
`.ov-border-strong`

### Spacing

Margin: `.ov-m-0` `.ov-mt-2` `.ov-mt-4` `.ov-mt-6` `.ov-mt-8` `.ov-mb-2` `.ov-mb-4` `.ov-mb-6` `.ov-mb-8`  
Padding: `.ov-p-2` `.ov-p-4` `.ov-p-6` `.ov-p-8`

### Shadows

`.ov-shadow-sm` `.ov-shadow-md` `.ov-shadow-lg` `.ov-shadow-xl`

### Border radius

`.ov-rounded-sm` `.ov-rounded` `.ov-rounded-lg` `.ov-rounded-xl` `.ov-rounded-pill`

### Accessibility

`.ov-visually-hidden` — visually hidden but readable by screen readers (use for screen-reader-only labels)
