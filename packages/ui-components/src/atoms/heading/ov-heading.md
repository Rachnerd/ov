# ov-heading

Renders the correct `<h1>`–`<h6>` element while allowing the visual size to be set independently, keeping document outline correct even when designers want an `h2` styled as a display heading.

## Tag

```html
<ov-heading level="2">Section title</ov-heading>
```

## Properties

| Property | Attribute | Type                                                               | Default     | Description                                       |
| -------- | --------- | ------------------------------------------------------------------ | ----------- | ------------------------------------------------- |
| `level`  | `level`   | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                       | `2`         | Semantic heading level (`<h1>`–`<h6>`)            |
| `size`   | `size`    | `'' \| 'display-1' \| 'display-2' \| 'h1' \| 'h2' \| 'h3' \| 'h4'` | `''`        | Visual size override; empty inherits from `level` |
| `tone`   | `tone`    | `'primary' \| 'secondary' \| 'brand' \| 'accent' \| 'inverse'`     | `'primary'` | Text color                                        |

## Importing

```ts
import '@ov/ui-components/atoms/heading/ov-heading';
```

## Usage examples

```html
<!-- Semantic levels with default sizes -->
<ov-heading level="1">Page title</ov-heading>
<ov-heading level="2">Section title</ov-heading>
<ov-heading level="3">Subsection</ov-heading>
<ov-heading level="4">Card heading</ov-heading>
<ov-heading level="5">Label heading</ov-heading>
<ov-heading level="6">Eyebrow / category</ov-heading>

<!-- Size overrides (semantic level stays correct) -->
<ov-heading level="2" size="display-1">Display 1</ov-heading>
<ov-heading level="2" size="display-2">Section hero</ov-heading>
<ov-heading level="3" size="h2">Visually promoted subsection</ov-heading>

<!-- Tones -->
<ov-heading level="2" tone="brand">Brand-colored heading</ov-heading>
<ov-heading level="2" tone="secondary">Subdued heading</ov-heading>
<ov-heading level="2" tone="accent">Accent heading</ov-heading>

<!-- On dark background -->
<div style="background: var(--ov-charcoal)">
  <ov-heading level="2" tone="inverse">Inverse heading</ov-heading>
</div>
```

## Rules

- Use `ov-heading` for all headings — never `ov-text` with a large size — so the document outline stays correct.
- `level` controls the rendered HTML element (`<h1>`–`<h6>`); `size` is purely visual.
- `inverse` is designed for dark backgrounds only.
