# ov-text

General-purpose text atom. Controls typography variant, color tone, font weight, and the rendered HTML element independently.

## Tag

```html
<ov-text variant="body" as="p">Paragraph text</ov-text>
```

## Properties

| Property  | Attribute | Type                                                                                      | Default   | Description                              |
|-----------|-----------|-------------------------------------------------------------------------------------------|-----------|------------------------------------------|
| `variant` | `variant` | `'body' \| 'body-sm' \| 'lead' \| 'caption' \| 'eyebrow' \| 'code'`                      | `'body'`  | Typography style                         |
| `tone`    | `tone`    | `'primary' \| 'secondary' \| 'tertiary' \| 'muted' \| 'brand' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'inverse'` | `'primary'` | Text color |
| `weight`  | `weight`  | `'' \| 'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold'`                         | `''`      | Font weight override; empty uses variant default |
| `as`      | *(prop)*  | `'span' \| 'p' \| 'div' \| 'small' \| 'strong' \| 'em'`                                  | `'span'`  | HTML element to render                   |

## Variant descriptions

| Variant   | Use for                                              |
|-----------|------------------------------------------------------|
| `body`    | Standard paragraph text                              |
| `body-sm` | Secondary / smaller body copy                        |
| `lead`    | Intro paragraph, slightly larger with relaxed line height |
| `caption` | Timestamps, footnotes, helper annotations            |
| `eyebrow` | Small uppercase label above a heading                |
| `code`    | Inline code snippet with monospace font and background |

## Importing

```ts
import '@ov/ui-components/atoms/text/ov-text';
```

## Usage examples

```html
<!-- Paragraph variants -->
<ov-text variant="lead" as="p">Introductory paragraph with more visual weight.</ov-text>
<ov-text variant="body" as="p">Standard body copy for content areas.</ov-text>
<ov-text variant="body-sm" as="p">Smaller secondary copy.</ov-text>
<ov-text variant="caption" as="p">Posted April 18, 2026</ov-text>

<!-- Eyebrow + heading pattern -->
<ov-text variant="eyebrow">Market Update</ov-text>
<ov-heading level="2">Q1 Results Exceed Forecast</ov-heading>

<!-- Inline code -->
<p>Call <ov-text variant="code">portfolio.rebalance()</ov-text> to trigger a sync.</p>

<!-- Tones -->
<ov-text tone="success" as="p">↑ 14.3% this quarter</ov-text>
<ov-text tone="danger" as="p">↓ Margin alert</ov-text>
<ov-text tone="secondary" as="p">Last updated 2 hours ago</ov-text>

<!-- Weight override -->
<ov-text variant="body" weight="semibold">Important notice</ov-text>

<!-- Semantic elements -->
<ov-text as="strong" weight="semibold">Bold text</ov-text>
<ov-text as="em">Italicised text</ov-text>
<ov-text as="small" variant="caption">Fine print</ov-text>
```

## Rules

- `ov-text` is `display: inline` by default; use `as="p"` or `as="div"` to make it block.
- `eyebrow` variant is always uppercase and small — do not additionally uppercase it via CSS.
- `code` variant is intended for short inline snippets; use a `<pre>` block for multi-line code.
- Set `tone` on the atom rather than a wrapping `color` style to stay within the design token system.
