# ov-spinner

An animated circular loading indicator. Color inherits from `currentColor`.

## Tag

```html
<ov-spinner></ov-spinner>
```

## Properties

| Property | Attribute | Type                                  | Default     | Description             |
|----------|-----------|---------------------------------------|-------------|-------------------------|
| `size`   | `size`    | `'sm' \| 'md' \| 'lg' \| 'xl'`        | `'md'`      | `14 / 20 / 32 / 40 px`  |
| `tone`   | `tone`    | `'brand' \| 'neutral' \| 'inverse'`   | `'brand'`   | Color tone              |
| `label`  | `label`   | `string`                              | `'Loading'` | `aria-label` text       |

## Usage examples

```html
<ov-spinner></ov-spinner>
<ov-spinner size="sm" tone="neutral"></ov-spinner>
<ov-spinner size="lg" tone="brand"></ov-spinner>

<!-- On a dark background -->
<div class="dark-surface">
  <ov-spinner tone="inverse"></ov-spinner>
</div>

<!-- Custom accessible label -->
<ov-spinner label="Fetching results"></ov-spinner>
```

## Rules

- `ov-spinner` always has `role="progressbar"` — do not wrap it in another ARIA live region.
- Inherits `currentColor`; set color on a parent element, not directly on the component.
- Use `tone="inverse"` on dark backgrounds only.
