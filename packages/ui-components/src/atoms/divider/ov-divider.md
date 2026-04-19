# ov-divider

A horizontal (or vertical) separator with optional centred label text.

## Tag

```html
<ov-divider></ov-divider>
```

## Properties

| Property      | Attribute     | Type                               | Default        | Description                                         |
|---------------|---------------|------------------------------------|----------------|-----------------------------------------------------|
| `orientation` | `orientation` | `'horizontal' \| 'vertical'`       | `'horizontal'` | Direction of the divider line                       |
| `variant`     | `variant`     | `'default' \| 'subtle' \| 'strong'` | `'default'`    | Line color intensity                                |
| `spacing`     | `spacing`     | `string`                           | `''`           | CSS length for margin (default: `var(--ov-space-4)`) |

## Slots

| Slot      | Description                                             |
|-----------|---------------------------------------------------------|
| (default) | Optional label text centred within a horizontal divider |

## Usage examples

```html
<!-- Horizontal (default) -->
<ov-divider></ov-divider>

<!-- With label -->
<ov-divider>OR</ov-divider>
<ov-divider>Continue with</ov-divider>

<!-- Variants -->
<ov-divider variant="subtle"></ov-divider>
<ov-divider variant="strong"></ov-divider>

<!-- Custom spacing -->
<ov-divider spacing="var(--ov-space-8)"></ov-divider>

<!-- Vertical (use inside a flex container) -->
<div class="nav-row">
  <span>Dashboard</span>
  <ov-divider orientation="vertical"></ov-divider>
  <span>Reports</span>
  <ov-divider orientation="vertical"></ov-divider>
  <span>Settings</span>
</div>
```

## Rules

- Label text only renders on horizontal orientation — slotted content is ignored when `orientation="vertical"`.
- Vertical dividers need `align-self: stretch` or a fixed height on the parent flex container to be visible.
