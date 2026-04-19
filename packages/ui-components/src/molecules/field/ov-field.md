# ov-field

The canonical form-field wrapper. Composes a label, any control atom, and optional help / status text — wiring the accessibility relationship (`id`, `aria-describedby`) automatically.

## Tag

```html
<ov-field label="Email address">
  <ov-input type="email" name="email"></ov-input>
</ov-field>
```

## Properties

| Property   | Attribute  | Type                                           | Default  | Description                                                            |
|------------|------------|------------------------------------------------|----------|------------------------------------------------------------------------|
| `label`    | `label`    | `string`                                       | `''`     | Text rendered in the label. Use the `label` slot for rich content.     |
| `for`      | `for`      | `string`                                       | `''`     | Mirrors the `for` attribute on the internal `<ov-label>`               |
| `required` | `required` | `boolean`                                      | `false`  | Shows the required asterisk on the label                               |
| `disabled` | `disabled` | `boolean`                                      | `false`  | Disables the label's pointer-cursor (when the control is disabled)     |
| `status`   | `status`   | `'idle' \| 'success' \| 'error' \| 'warning'` | `'idle'` | Validation status — controls message color and forwards `invalid` to control |
| `message`  | `message`  | `string`                                       | `''`     | Status message text. Use the `message` slot for rich content.          |
| `inline`   | `inline`   | `boolean`                                      | `false`  | Compact single-row layout (label left, control right)                  |

## Slots

| Slot      | Description                                                          |
|-----------|----------------------------------------------------------------------|
| (default) | The form control (`ov-input`, `ov-textarea`, `ov-select`, etc.)      |
| `label`   | Custom label content; overrides the `label` property                 |
| `help`    | Helper text shown below the control when `status` is `idle`          |
| `message` | Custom status message; overrides the `message` property              |

## Events

| Event         | Detail | Description                          |
|---------------|--------|--------------------------------------|
| `field-reset` | `void` | Fired when the reset button is clicked |

## CSS custom properties

| Property        | Description                                       |
|-----------------|---------------------------------------------------|
| `--ov-field-gap` | Space between label and control (default: `--ov-space-2`) |

## Parts

| Part           | Description                 |
|----------------|-----------------------------|
| `field`        | Root wrapper div            |
| `label-wrap`   | Label container             |
| `control-wrap` | Control container           |

## Usage examples

```html
<!-- Basic -->
<ov-field label="Email address">
  <ov-input type="email" name="email" placeholder="you@example.com"></ov-input>
</ov-field>

<!-- Required -->
<ov-field label="Full name" required>
  <ov-input name="name"></ov-input>
</ov-field>

<!-- With help text -->
<ov-field label="Password">
  <ov-input type="password" name="password"></ov-input>
  <span slot="help">Minimum 8 characters</span>
</ov-field>

<!-- Error state -->
<ov-field label="Email" status="error" message="Please enter a valid email address.">
  <ov-input type="email" name="email" value="bad@"></ov-input>
</ov-field>

<!-- Success state -->
<ov-field label="Username" status="success" message="Username is available.">
  <ov-input name="username" value="rachnerd"></ov-input>
</ov-field>

<!-- Inline layout -->
<ov-field label="Dark mode" inline>
  <ov-switch name="dark-mode"></ov-switch>
</ov-field>

<!-- Textarea -->
<ov-field label="Message" required>
  <ov-textarea name="message" rows="5"></ov-textarea>
</ov-field>
```

## Rules

- Wrap every label+control pair in `<ov-field>` — never write a bare `<ov-label>` next to a control.
- `status="error"` automatically sets `invalid` on slotted `ov-input` and `ov-textarea`.
- Use `status` + `message` for dynamic validation feedback; use the `help` slot for static hints.
- `inline` is suited for toggle-style fields (switch, checkbox) where label and control sit side by side.
