# ov-radio

A custom radio button. Groups by shared `name`. Selecting one automatically unchecks its siblings within the same root.

## Tag

```html
<ov-radio name="plan" value="pro">Pro plan</ov-radio>
```

## Properties

| Property   | Attribute  | Type      | Default | Description                              |
|------------|------------|-----------|---------|------------------------------------------|
| `checked`  | `checked`  | `boolean` | `false` | Whether this radio is selected           |
| `disabled` | `disabled` | `boolean` | `false` | Non-interactive                          |
| `name`     | `name`     | `string`  | `''`    | Group name — required for exclusivity    |
| `value`    | `value`    | `string`  | `''`    | Value emitted in the change event        |

## Events

| Event    | Detail                               | Description                               |
|----------|--------------------------------------|-------------------------------------------|
| `change` | `{ checked: true, value: string }`   | Fires when this radio becomes selected    |

## Slots

| Slot      | Description |
|-----------|-------------|
| (default) | Label text  |

## Usage examples

```html
<!-- Radio group -->
<ov-radio name="plan" value="free" checked>Free</ov-radio>
<ov-radio name="plan" value="pro">Pro — $29/month</ov-radio>
<ov-radio name="plan" value="enterprise">Enterprise</ov-radio>
<ov-radio name="plan" value="legacy" disabled>Legacy (unavailable)</ov-radio>
```

## Rules

- Always set a shared `name` on every radio in a group — without it, exclusivity will not work.
- Always provide label text via the default slot for accessibility.
- Listen to the `change` event rather than polling `.checked` directly.
