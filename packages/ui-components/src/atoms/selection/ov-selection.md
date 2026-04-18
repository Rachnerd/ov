# ov-checkbox / ov-radio / ov-switch

Three selection controls sharing a common visual language. All hide the native input visually and render a custom control while preserving full keyboard and screen-reader accessibility.

---

## ov-checkbox

### Tag

```html
<ov-checkbox>Accept terms</ov-checkbox>
```

### Properties

| Property        | Attribute       | Type      | Default | Description                                    |
|-----------------|-----------------|-----------|---------|------------------------------------------------|
| `checked`       | `checked`       | `boolean` | `false` | Whether the checkbox is checked                |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Partial-selection state (overrides `checked` visually) |
| `disabled`      | `disabled`      | `boolean` | `false` | Non-interactive                                |
| `required`      | `required`      | `boolean` | `false` | Required for form validation                   |
| `name`          | `name`          | `string`  | `''`    | Form field name                                |
| `value`         | `value`         | `string`  | `'on'`  | Value submitted with the form                  |

### Events

| Event    | Detail                           | Description                        |
|----------|----------------------------------|------------------------------------|
| `change` | `{ checked: boolean, value: string }` | Fires when checked state changes |

### Usage examples

```html
<ov-checkbox>Receive email updates</ov-checkbox>
<ov-checkbox checked>Pre-selected option</ov-checkbox>
<ov-checkbox indeterminate>Partially selected group</ov-checkbox>
<ov-checkbox disabled>Unavailable option</ov-checkbox>
<ov-checkbox name="terms" value="accepted" required>I accept the terms</ov-checkbox>
```

---

## ov-radio

Groups by shared `name`. Selecting one automatically unchecks its siblings within the same root.

### Tag

```html
<ov-radio name="plan" value="pro">Pro plan</ov-radio>
```

### Properties

| Property   | Attribute  | Type      | Default | Description                      |
|------------|------------|-----------|---------|----------------------------------|
| `checked`  | `checked`  | `boolean` | `false` | Whether this radio is selected   |
| `disabled` | `disabled` | `boolean` | `false` | Non-interactive                  |
| `name`     | `name`     | `string`  | `''`    | Group name — required for exclusivity |
| `value`    | `value`    | `string`  | `''`    | Value emitted in the change event |

### Events

| Event    | Detail                           | Description                             |
|----------|----------------------------------|-----------------------------------------|
| `change` | `{ checked: true, value: string }` | Fires when this radio becomes selected |

### Usage examples

```html
<!-- Radio group -->
<ov-radio name="plan" value="free" checked>Free</ov-radio>
<ov-radio name="plan" value="pro">Pro — $29/month</ov-radio>
<ov-radio name="plan" value="enterprise">Enterprise</ov-radio>
<ov-radio name="plan" value="legacy" disabled>Legacy (unavailable)</ov-radio>
```

---

## ov-switch

A toggle switch for boolean on/off settings.

### Tag

```html
<ov-switch>Dark mode</ov-switch>
```

### Properties

| Property   | Attribute  | Type      | Default | Description                      |
|------------|------------|-----------|---------|----------------------------------|
| `checked`  | `checked`  | `boolean` | `false` | Whether the switch is on         |
| `disabled` | `disabled` | `boolean` | `false` | Non-interactive                  |
| `name`     | `name`     | `string`  | `''`    | Form field name                  |
| `value`    | `value`    | `string`  | `'on'`  | Value submitted when checked     |

### Events

| Event    | Detail                           | Description                        |
|----------|----------------------------------|------------------------------------|
| `change` | `{ checked: boolean, value: string }` | Fires when toggle state changes |

### Usage examples

```html
<ov-switch>Enable notifications</ov-switch>
<ov-switch checked>Dark mode</ov-switch>
<ov-switch disabled>Unavailable setting</ov-switch>
<ov-switch checked disabled>Locked-on setting</ov-switch>
<ov-switch name="newsletter" value="subscribed">Weekly digest</ov-switch>
```

---

## Rules

- All three controls render their label via the default slot — always provide label text for accessibility.
- For `ov-radio`, always set a shared `name` on every radio in a group or exclusivity will not work.
- `indeterminate` on `ov-checkbox` is a visual-only state — the `checked` property still governs the submitted form value.
- `ov-switch` uses `role="switch"` internally; do not nest it inside another switch or checkbox.
- Listen to the `change` event on individual controls rather than polling `.checked` directly.
