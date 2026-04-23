# ov-icon

Renders one of the built-in SVG icons by name, or acts as a sized wrapper for a custom SVG passed via the default slot. Color is always `currentColor` so icons inherit from surrounding text.

## Tag

```html
<ov-icon name="check"></ov-icon>
```

## Properties

| Property | Attribute | Type                                                                                                        | Default | Description                                  |
|----------|-----------|-------------------------------------------------------------------------------------------------------------|---------|----------------------------------------------|
| `name`   | `name`    | `'check' \| 'x' \| 'arrow-right' \| 'arrow-left' \| 'search' \| 'mail' \| 'info' \| 'warning' \| 'sun' \| 'moon' \| 'plus' \| 'user' \| 'menu' \| ''` | `''`    | Built-in icon name; empty falls back to slot |
| `size`   | `size`    | `'sm' \| 'md' \| 'lg' \| 'xl'`                                                                             | `'md'`  | `12 / 16 / 20 / 24 px`                       |
| `label`  | `label`   | `string`                                                                                                    | `''`    | Accessible label; when set, `role="img"` is applied |

## Slots

| Slot      | Description                                      |
|-----------|--------------------------------------------------|
| (default) | Custom SVG to render when `name` is not a built-in |

## Usage examples

```html
<!-- Built-in icons -->
<ov-icon name="check"></ov-icon>
<ov-icon name="x"></ov-icon>
<ov-icon name="search"></ov-icon>
<ov-icon name="mail"></ov-icon>
<ov-icon name="info"></ov-icon>
<ov-icon name="warning"></ov-icon>
<ov-icon name="plus"></ov-icon>
<ov-icon name="user"></ov-icon>
<ov-icon name="arrow-right"></ov-icon>
<ov-icon name="arrow-left"></ov-icon>
<ov-icon name="sun"></ov-icon>
<ov-icon name="moon"></ov-icon>
<ov-icon name="menu"></ov-icon>

<!-- Sizes -->
<ov-icon name="user" size="sm"></ov-icon>
<ov-icon name="user" size="md"></ov-icon>
<ov-icon name="user" size="lg"></ov-icon>
<ov-icon name="user" size="xl"></ov-icon>

<!-- Accessible (labelled) -->
<ov-icon name="warning" label="Warning"></ov-icon>

<!-- Custom SVG via slot -->
<ov-icon size="lg">
  <svg viewBox="0 0 24 24" fill="none"><path d="..." stroke="currentColor"/></svg>
</ov-icon>

<!-- Inheriting color from parent -->
<span style="color: var(--color-danger)">
  <ov-icon name="x"></ov-icon>
</span>
```

## Rules

- `ov-icon` is decorative by default (`aria-hidden="true"`); only set `label` when the icon conveys meaning not available from surrounding text.
- Never put text inside `ov-icon` — it is a sizing wrapper only.
- Color inherits from `currentColor`; set color on a parent element, not directly on the component.
- For loading indicators, use `ov-spinner` (see `atoms/spinner/ov-spinner.md`).
