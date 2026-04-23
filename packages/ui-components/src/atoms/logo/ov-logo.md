# ov-logo

The OpenValue — Tech Tribes white wordmark. Height is driven by the `--ov-logo-height` CSS custom property, which the `size` prop sets as a default. Any parent can override `--ov-logo-height` directly — with a media query, container token, or inline style — without touching the `size` prop.

## Tag

```html
<ov-logo size="sm"></ov-logo>
```

## Properties

| Property  | Attribute | Type                                    | Default  | Description                                          |
|-----------|-----------|-----------------------------------------|----------|------------------------------------------------------|
| `size`    | `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`   | Named height preset (see CSS custom properties)      |
| `variant` | `variant` | `'white'`                               | `'white'` | Colour treatment (white for dark backgrounds)       |

## CSS custom properties

| Property           | Default  | Description                                                    |
|--------------------|----------|----------------------------------------------------------------|
| `--ov-logo-height` | `44px`   | Rendered height; width is always `auto` (aspect ratio kept)   |

Named size presets set `--ov-logo-height` to: `xs` → 20 px · `sm` → 28 px · `md` → 44 px · `lg` → 72 px · `xl` → 108 px.

## Usage examples

```html
<!-- Named sizes -->
<ov-logo size="xs"></ov-logo>
<ov-logo size="sm"></ov-logo>
<ov-logo size="md"></ov-logo>
<ov-logo size="lg"></ov-logo>
<ov-logo size="xl"></ov-logo>

<!-- In the nav bar -->
<ov-nav-bar active="/">
  <ov-logo slot="logo" size="sm"></ov-logo>
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>

<!-- In the hero -->
<ov-hero src="/office.jpg" overlay="0.6" subheading="Tech Tribes">
  <ov-logo slot="logo" size="lg"></ov-logo>
</ov-hero>

<!-- Parent overrides height via CSS token (responsive example) -->
<style>
  .hero-logo { --ov-logo-height: 72px; }
  @media (max-width: 639px) { .hero-logo { --ov-logo-height: 40px; } }
</style>
<ov-logo class="hero-logo"></ov-logo>
```

## Rules

- `ov-logo` is `display: inline-flex`; wrap it in a block container to control flow layout.
- The logo is always white — place it only on dark or brand-coloured backgrounds.
- Override `--ov-logo-height` on the element or a parent selector to get any size without changing the `size` prop.
- Do not set an explicit `width` — it is calculated automatically from the height and aspect ratio.
