# ov-logo

The OpenValue — Tech Tribes white wordmark. Width is always derived from the aspect ratio so only `size` needs to be set.

## Tag

```html
<ov-logo size="sm"></ov-logo>
```

## Properties

| Property  | Attribute | Type                              | Default  | Description                                         |
|-----------|-----------|-----------------------------------|----------|-----------------------------------------------------|
| `size`    | `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`   | Height: 20 / 28 / 44 / 72 / 108 px (width auto)   |
| `variant` | `variant` | `'white'`                         | `'white'` | Colour treatment (white for dark backgrounds)      |

## Usage examples

```html
<!-- In the nav bar -->
<ov-nav-bar active="/">
  <ov-logo slot="logo" size="sm"></ov-logo>
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>

<!-- In the hero -->
<ov-hero src="/office.jpg" overlay="0.6" subheading="Tech Tribes">
  <ov-logo slot="logo" size="lg"></ov-logo>
</ov-hero>

<!-- Standalone -->
<ov-logo size="xl"></ov-logo>
```

## Rules

- `ov-logo` is `display: inline-flex`; wrap it in a block container to control flow layout.
- The logo is always white — place it only on dark or brand-coloured backgrounds.
- Do not set an explicit `width` — it is calculated automatically from the height and aspect ratio.
