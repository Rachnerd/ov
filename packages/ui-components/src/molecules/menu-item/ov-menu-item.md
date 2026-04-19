# ov-menu-item

A single item within a dropdown menu or command palette. Supports icons, descriptions, keyboard shortcut chips, trailing elements, a selected state, a disabled state, and a separator mode.

## Tag

```html
<ov-menu-item label="Edit profile"></ov-menu-item>
```

## Properties

| Property      | Attribute     | Type      | Default | Description                                              |
|---------------|---------------|-----------|---------|----------------------------------------------------------|
| `label`       | `label`       | `string`  | `''`    | Primary text                                             |
| `description` | `description` | `string`  | `''`    | Secondary text below the label                           |
| `disabled`    | `disabled`    | `boolean` | `false` | Non-interactive, dimmed                                  |
| `selected`    | `selected`    | `boolean` | `false` | Highlights the item with brand color (for active state)  |
| `separator`   | `separator`   | `boolean` | `false` | Renders a horizontal rule instead of an item             |

## Slots

| Slot        | Description                                    |
|-------------|------------------------------------------------|
| `icon`      | Leading 16 px icon                             |
| `shortcut`  | Keyboard shortcut chips (styled automatically) |
| `trailing`  | Any trailing element (badge, chevron, etc.)    |

## Events

| Event    | Detail              | Description                         |
|----------|---------------------|-------------------------------------|
| `select` | `{ label: string }` | Fires when the item is clicked      |

## Parts

| Part   | Description        |
|--------|--------------------|
| `item` | The row `div`      |

## Usage examples

```html
<!-- Basic -->
<ov-menu-item label="Edit profile"></ov-menu-item>
<ov-menu-item label="Sign out"></ov-menu-item>

<!-- With icon -->
<ov-menu-item label="New project">
  <ov-icon slot="icon" name="plus"></ov-icon>
</ov-menu-item>

<!-- With description -->
<ov-menu-item
  label="Export as CSV"
  description="Download a spreadsheet of all records"
></ov-menu-item>

<!-- With keyboard shortcut -->
<ov-menu-item label="Search">
  <ov-icon slot="icon" name="search"></ov-icon>
  <kbd slot="shortcut">⌘</kbd>
  <kbd slot="shortcut">K</kbd>
</ov-menu-item>

<!-- Selected state -->
<ov-menu-item label="Dashboard" selected></ov-menu-item>

<!-- Disabled -->
<ov-menu-item label="Delete" disabled></ov-menu-item>

<!-- Separator -->
<ov-menu-item separator></ov-menu-item>

<!-- Full menu example -->
<div role="menu">
  <ov-menu-item label="Profile">
    <ov-icon slot="icon" name="user"></ov-icon>
  </ov-menu-item>
  <ov-menu-item label="Settings">
    <ov-icon slot="icon" name="info"></ov-icon>
  </ov-menu-item>
  <ov-menu-item separator></ov-menu-item>
  <ov-menu-item label="Sign out"></ov-menu-item>
</div>
```

## Rules

- `separator` renders a horizontal rule; all other props are ignored when `separator` is set.
- `shortcut` slot content is automatically styled as monospace key chips — wrap each key in `<kbd>`.
- `select` event does not fire when `disabled` or `separator` is true.
- Wrap multiple items in an element with `role="menu"` for correct ARIA semantics.
