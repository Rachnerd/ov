# ov-image-card

A clickable card composed of a dark title bar with a label and directional arrow, plus a photo below. The entire card is a single `<a>` element. The image scales in on hover.

## Tag

```html
<ov-image-card label="Amsterdam" src="/photos/amsterdam.jpg" href="/cities/amsterdam"></ov-image-card>
```

## Properties

| Property | Attribute | Type     | Default | Description                            |
|----------|-----------|----------|---------|----------------------------------------|
| `label`  | `label`   | `string` | `''`    | Title text shown in the header bar     |
| `src`    | `src`     | `string` | `''`    | URL of the photo                       |
| `href`   | `href`    | `string` | `'#'`   | Link destination when card is clicked  |

## Usage examples

```html
<!-- Basic -->
<ov-image-card
  label="Amsterdam"
  src="/photos/amsterdam.jpg"
  href="/cities/amsterdam"
></ov-image-card>

<!-- Inside a carousel -->
<ov-carousel heading="Our offices">
  <ov-image-card label="Amsterdam" src="/offices/amsterdam.jpg" href="/offices/amsterdam"></ov-image-card>
  <ov-image-card label="Rotterdam" src="/offices/rotterdam.jpg" href="/offices/rotterdam"></ov-image-card>
  <ov-image-card label="Eindhoven" src="/offices/eindhoven.jpg" href="/offices/eindhoven"></ov-image-card>
</ov-carousel>
```

## Rules

- Always provide `label` — it doubles as the image `alt` text for accessibility.
- Always set a meaningful `href`; defaults to `#` which is not useful in production.
- The card is entirely clickable via the wrapping `<a>` element.
