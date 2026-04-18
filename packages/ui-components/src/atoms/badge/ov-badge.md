# ov-badge

A small inline label used to convey status, counts, or categorical metadata. Supports three rendering appearances across six semantic variants.

## Tag

```html
<ov-badge>Label</ov-badge>
```

## Properties

| Property     | Attribute    | Type                                                                 | Default     | Description                      |
|--------------|--------------|----------------------------------------------------------------------|-------------|----------------------------------|
| `variant`    | `variant`    | `'default' \| 'brand' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Semantic colour intent |
| `appearance` | `appearance` | `'soft' \| 'solid' \| 'outline'`                                     | `'soft'`    | Rendering style                  |
| `size`       | `size`       | `'sm' \| 'md'`                                                       | `'md'`      | Physical scale                   |
| `pill`       | `pill`       | `boolean`                                                            | `true`      | Fully rounded corners            |

## Slots

| Slot      | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| (default) | Badge text content                                                          |
| `dot`     | Optional leading status dot; only shown when explicitly slotted             |

## Usage examples

```html
<!-- Variants (soft appearance, default) -->
<ov-badge variant="default">Default</ov-badge>
<ov-badge variant="brand">New</ov-badge>
<ov-badge variant="success">Published</ov-badge>
<ov-badge variant="warning">Draft</ov-badge>
<ov-badge variant="danger">Error</ov-badge>
<ov-badge variant="info">In review</ov-badge>
<ov-badge variant="accent">Featured</ov-badge>

<!-- Solid appearance -->
<ov-badge variant="success" appearance="solid">Active</ov-badge>
<ov-badge variant="danger" appearance="solid">Critical</ov-badge>

<!-- Outline appearance -->
<ov-badge variant="brand" appearance="outline">Beta</ov-badge>

<!-- Small size -->
<ov-badge variant="warning" size="sm">Pending</ov-badge>

<!-- Square corners -->
<ov-badge variant="info" pill="false">Tag</ov-badge>

<!-- With a status dot -->
<ov-badge variant="success">
  <span slot="dot" style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span>
  Online
</ov-badge>
```

## Rules

- Badges are inline and purely visual — do not put interactive elements inside one.
- The `dot` slot is opt-in; omitting it renders no dot even though the slot exists in shadow DOM.
- Prefer `size="sm"` when badges appear inside table rows or dense list items.
- `solid` on `default` variant renders dark-on-light (inverted) — use sparingly as a count bubble.
