# ov-card

Structured surface molecule composed of four named regions: media, header, body, and footer. Maps directly to the four approved colour combos from the brand guidelines.

## Tag

```html
<ov-card>Body content</ov-card>
```

## Properties

| Property      | Attribute     | Type                                                       | Default     | Description                                              |
|---------------|---------------|------------------------------------------------------------|-------------|----------------------------------------------------------|
| `variant`     | `variant`     | `'default' \| 'brand' \| 'inverse' \| 'inverse-brand'`    | `'default'` | Color scheme                                             |
| `interactive` | `interactive` | `boolean`                                                  | `false`     | Adds hover elevation + translateY transform              |
| `borderless`  | `borderless`  | `boolean`                                                  | `false`     | Removes the border and box shadow                        |
| `flush`       | `flush`       | `boolean`                                                  | `false`     | Removes all padding — use when card is purely a surface  |

## Slots

| Slot     | Description                                       |
|----------|---------------------------------------------------|
| (default) | Card body content                                |
| `header` | Card header (titles, eyebrow, avatar row)         |
| `footer` | Card footer (actions, metadata, pagination)       |
| `media`  | Full-bleed image/video placed above the header    |

## CSS custom properties

| Property           | Description                                    |
|--------------------|------------------------------------------------|
| `--ov-card-padding` | Inner padding (default: `var(--ov-space-6)`) |
| `--ov-card-gap`     | Gap between header / body / footer            |

## Parts

| Part           | Description         |
|----------------|---------------------|
| `card`         | The root card div   |
| `header`       | Header region       |
| `body`         | Body region         |
| `footer`       | Footer region       |

## Usage examples

```html
<!-- Basic -->
<ov-card>
  <ov-heading level="3" slot="header">Card title</ov-heading>
  <ov-text variant="body" as="p">Card body content goes here.</ov-text>
  <div slot="footer">
    <ov-button variant="primary" size="sm">Action</ov-button>
  </div>
</ov-card>

<!-- Variants -->
<ov-card variant="brand">
  <ov-heading level="3" slot="header" tone="inverse">Brand card</ov-heading>
  White on brand blue.
</ov-card>

<ov-card variant="inverse">
  <ov-heading level="3" slot="header" tone="inverse">Dark card</ov-heading>
  White on charcoal.
</ov-card>

<!-- Interactive -->
<ov-card interactive>
  <ov-heading level="3" slot="header">Clickable card</ov-heading>
  Lifts on hover.
</ov-card>

<!-- With media -->
<ov-card>
  <img slot="media" src="/hero.jpg" alt="Hero">
  <ov-heading level="3" slot="header">Media card</ov-heading>
  Full-bleed image above content.
</ov-card>

<!-- Borderless / flush -->
<ov-card borderless flush>
  <ov-heading level="3" slot="header">Flush card</ov-heading>
  No border, no padding.
</ov-card>
```

## Rules

- `variant="brand"` and `variant="inverse"` use light foreground colors — pair with `tone="inverse"` on headings inside them.
- `interactive` adds `cursor: pointer` and a lift animation; wire up a click handler on the host element.
- `flush` removes all padding; useful when nesting a data table or image directly inside the card.
