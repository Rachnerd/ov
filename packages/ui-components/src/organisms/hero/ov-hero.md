# ov-hero

Full-width hero section. Heading size, letter-spacing, uppercase treatment, and colour are all encapsulated — consumers pass text as props and CTA buttons via the `actions` slot.

## Tag

```html
<ov-hero heading="OpenValue" subheading="Tech Tribes"></ov-hero>
```

## Properties

| Property     | Attribute    | Type     | Default | Description                                       |
|--------------|--------------|----------|---------|---------------------------------------------------|
| `heading`    | `heading`    | `string` | `''`    | Main display heading (rendered as `<h1>`)         |
| `subheading` | `subheading` | `string` | `''`    | Subtitle below the heading                        |
| `src`        | `src`        | `string` | `''`    | Background image URL; omit for solid dark fill    |
| `overlay`    | `overlay`    | `number` | `0.55`  | Dark overlay opacity on top of the image (0–1)   |

## Slots

| Slot      | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| `logo`    | Brand logo displayed above the heading (e.g. `<ov-logo>`)               |
| `actions` | CTA buttons/links; laid out as a centred flex row below the subheading   |

## Usage examples

```html
<!-- Text only -->
<ov-hero heading="OpenValue" subheading="Tech Tribes"></ov-hero>

<!-- With background photo -->
<ov-hero
  heading="OpenValue"
  subheading="Tech Tribes"
  src="/office.jpg"
  overlay="0.6"
></ov-hero>

<!-- With CTA actions -->
<ov-hero heading="Build. Share. Grow." subheading="Tech Tribes">
  <ov-button slot="actions" variant="primary" size="lg">Get in touch</ov-button>
  <ov-button slot="actions" variant="inverse" size="lg">Our services</ov-button>
</ov-hero>
```

## Rules

- `heading` renders as a semantic `<h1>` — use only once per page.
- Increase `overlay` toward `1` when text contrast over the image is insufficient.
- The bottom edge is diagonally clipped; avoid placing critical content close to the bottom of the section.
