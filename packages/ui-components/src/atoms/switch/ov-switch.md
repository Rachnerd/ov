# ov-switch

A toggle switch for boolean on/off settings. Uses `role="switch"` internally.

## Tag

```html
<ov-switch>Dark mode</ov-switch>
```

## Properties

| Property   | Attribute  | Type      | Default | Description                   |
|------------|------------|-----------|---------|-------------------------------|
| `checked`  | `checked`  | `boolean` | `false` | Whether the switch is on      |
| `disabled` | `disabled` | `boolean` | `false` | Non-interactive               |
| `name`     | `name`     | `string`  | `''`    | Form field name               |
| `value`    | `value`    | `string`  | `'on'`  | Value submitted when checked  |

## Events

| Event    | Detail                                | Description                        |
|----------|---------------------------------------|------------------------------------|
| `change` | `{ checked: boolean, value: string }` | Fires when toggle state changes    |

## Slots

| Slot      | Description |
|-----------|-------------|
| (default) | Label text  |

## Usage examples

```html
<ov-switch>Enable notifications</ov-switch>
<ov-switch checked>Dark mode</ov-switch>
<ov-switch disabled>Unavailable setting</ov-switch>
<ov-switch checked disabled>Locked-on setting</ov-switch>
<ov-switch name="newsletter" value="subscribed">Weekly digest</ov-switch>
```

## Rules

- Always provide label text via the default slot for accessibility.
- Do not nest `ov-switch` inside another switch or checkbox.
- Listen to the `change` event rather than polling `.checked` directly.
