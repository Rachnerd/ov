# ov-input-group

Visually fuses an `ov-input` with attached buttons or text adornments, producing a single compound control (search bar, URL copier, promo-code entry, unit suffix, etc.).

The group collapses inner borders and border-radii so the combined shape reads as one element. The input always fills remaining space.

## Tag

```html
<ov-input-group>
  <ov-input placeholder="Search…"></ov-input>
  <ov-button slot="end">Go</ov-button>
</ov-input-group>
```

## Properties

| Property | Attribute | Type                               | Default  | Description                                                              |
|----------|-----------|------------------------------------|----------|--------------------------------------------------------------------------|
| `attach` | `attach`  | `'start' \| 'end' \| 'both'`       | `'end'`  | Which sides have an attached adornment; drives border-radius adjustments |

## Slots

| Slot      | Description                                                     |
|-----------|-----------------------------------------------------------------|
| (default) | The `ov-input` (required — exactly one)                         |
| `start`   | `ov-button` or plain text attached to the left edge             |
| `end`     | `ov-button` or plain text attached to the right edge            |

## Usage examples

```html
<!-- Button on the right -->
<ov-input-group>
  <ov-input placeholder="Search…"></ov-input>
  <ov-button slot="end" variant="primary">Search</ov-button>
</ov-input-group>

<!-- Button on the left -->
<ov-input-group attach="start">
  <ov-button slot="start" variant="secondary">Filter</ov-button>
  <ov-input placeholder="Enter value"></ov-input>
</ov-input-group>

<!-- Buttons on both sides -->
<ov-input-group attach="both">
  <ov-button slot="start" variant="ghost">−</ov-button>
  <ov-input type="number" value="1"></ov-input>
  <ov-button slot="end" variant="ghost">+</ov-button>
</ov-input-group>

<!-- Text adornment (non-interactive) -->
<ov-input-group>
  <ov-input type="number" placeholder="0.00"></ov-input>
  <span slot="end">USD</span>
</ov-input-group>

<!-- URL prefix + copy button -->
<ov-input-group attach="both">
  <span slot="start">https://</span>
  <ov-input placeholder="your-domain.com"></ov-input>
  <ov-button slot="end" variant="secondary">Copy</ov-button>
</ov-input-group>
```

## Rules

- Always include exactly one `ov-input` in the default slot — the group is sized around it.
- Set `attach` to match the sides where you place `slot="start"` or `slot="end"` elements.
- Plain text adornments (non-button) are styled automatically; do not add extra border or padding to them.
- Do not place multiple `ov-input` elements inside a single group.
