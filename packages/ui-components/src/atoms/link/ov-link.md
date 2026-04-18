# ov-link

A semantic `<a>` element with design-system color and underline behaviour. Renders a real anchor so SEO and keyboard navigation work correctly.

## Tag

```html
<ov-link href="/dashboard">Go to dashboard</ov-link>
```

## Properties

| Property    | Attribute   | Type                                          | Default     | Description                           |
|-------------|-------------|-----------------------------------------------|-------------|---------------------------------------|
| `href`      | `href`      | `string`                                      | `'#'`       | Link destination                      |
| `target`    | `target`    | `string`                                      | `''`        | Native anchor target (`_blank`, etc.) |
| `rel`       | `rel`       | `string`                                      | `''`        | Native anchor rel attribute           |
| `download`  | `download`  | `string`                                      | `''`        | Native anchor download attribute      |
| `variant`   | `variant`   | `'default' \| 'subtle' \| 'brand' \| 'inverse'` | `'default'` | Color treatment               |
| `underline` | `underline` | `'hover' \| 'always' \| 'none'`              | `'hover'`   | Underline visibility                  |
| `size`      | `size`      | `'sm' \| 'md' \| 'lg'`                       | `'md'`      | Text scale                            |

## Slots

| Slot      | Description  |
|-----------|--------------|
| (default) | Link text    |

## Usage examples

```html
<!-- Basic -->
<ov-link href="/reports">View reports</ov-link>

<!-- Variants -->
<ov-link href="#" variant="default">Default link</ov-link>
<ov-link href="#" variant="brand">Brand link</ov-link>
<ov-link href="#" variant="subtle">Subtle link</ov-link>

<!-- On a dark background -->
<div style="background: var(--ov-charcoal); padding: 16px">
  <ov-link href="#" variant="inverse">Inverse link</ov-link>
</div>

<!-- Underline modes -->
<ov-link href="#" underline="always">Always underlined</ov-link>
<ov-link href="#" underline="none">Never underlined</ov-link>

<!-- Sizes -->
<ov-link href="#" size="sm">Small</ov-link>
<ov-link href="#" size="lg">Large</ov-link>

<!-- External link -->
<ov-link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External site
</ov-link>

<!-- Download -->
<ov-link href="/report.pdf" download="Q1-Report.pdf">Download PDF</ov-link>

<!-- Inline in prose -->
<p>
  See the <ov-link href="/docs">full documentation</ov-link> for details.
</p>
```

## Rules

- Always provide meaningful link text — avoid "click here" or "read more" without context.
- When using `target="_blank"`, always add `rel="noopener noreferrer"` for security.
- Use `variant="inverse"` only on dark backgrounds — it renders white text.
- `ov-link` is `display: inline`; do not place block-level elements inside it.
