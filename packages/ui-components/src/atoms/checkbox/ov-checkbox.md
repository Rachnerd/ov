# ov-checkbox

A custom checkbox control. Hides the native input visually and renders a custom control while preserving full keyboard and screen-reader accessibility.

## Tag

```html
<ov-checkbox>Accept terms</ov-checkbox>
```

## Properties

| Property        | Attribute       | Type      | Default | Description                                             |
|-----------------|-----------------|-----------|---------|--------------------------------------------------------|
| `checked`       | `checked`       | `boolean` | `false` | Whether the checkbox is checked                         |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Partial-selection state (overrides `checked` visually)  |
| `disabled`      | `disabled`      | `boolean` | `false` | Non-interactive                                         |
| `required`      | `required`      | `boolean` | `false` | Required for form validation                            |
| `name`          | `name`          | `string`  | `''`    | Form field name                                         |
| `value`         | `value`         | `string`  | `'on'`  | Value submitted with the form                           |

## Events

| Event    | Detail                                   | Description                        |
|----------|------------------------------------------|------------------------------------|
| `change` | `{ checked: boolean, value: string }`    | Fires when checked state changes   |

## Slots

| Slot      | Description                |
|-----------|----------------------------|
| (default) | Label text or rich content |

## Usage examples

```html
<ov-checkbox>Receive email updates</ov-checkbox>
<ov-checkbox checked>Pre-selected option</ov-checkbox>
<ov-checkbox indeterminate>Partially selected group</ov-checkbox>
<ov-checkbox disabled>Unavailable option</ov-checkbox>
<ov-checkbox name="terms" value="accepted" required>I accept the terms</ov-checkbox>

<!-- Rich label with link -->
<ov-checkbox name="terms" value="accepted" required>
  <span>I agree to the <ov-link href="/terms">Terms</ov-link> and <ov-link href="/privacy">Privacy Policy</ov-link></span>
</ov-checkbox>
```

## Rules

- Always provide label text via the default slot for accessibility.
- `indeterminate` is a visual-only state — the `checked` property still governs the submitted form value.
- When using rich content (links, multiple elements) inside the default slot, wrap everything in a single `<span>` to avoid layout issues.
- Listen to the `change` event rather than polling `.checked` directly.
