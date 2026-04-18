# ov-textarea

A multi-line text field with configurable resize behaviour and validation-state support.

## Tag

```html
<ov-textarea placeholder="Enter your message…"></ov-textarea>
```

## Properties

| Property      | Attribute     | Type                                             | Default      | Description                                  |
|---------------|---------------|--------------------------------------------------|--------------|----------------------------------------------|
| `value`       | `value`       | `string`                                         | `''`         | Current value (live-bound)                   |
| `placeholder` | `placeholder` | `string`                                         | `''`         | Placeholder text                             |
| `name`        | `name`        | `string`                                         | `''`         | Form field name                              |
| `rows`        | `rows`        | `number`                                         | `4`          | Initial visible row count                    |
| `resize`      | `resize`      | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | User resize behaviour                        |
| `required`    | `required`    | `boolean`                                        | `false`      | Required field                               |
| `disabled`    | `disabled`    | `boolean`                                        | `false`      | Non-interactive, dimmed                      |
| `readonly`    | `readonly`    | `boolean`                                        | `false`      | Value visible but not editable               |
| `invalid`     | `invalid`     | `boolean`                                        | `false`      | Applies error border; sets `aria-invalid`    |

## Events

| Event   | Detail              | Description             |
|---------|---------------------|-------------------------|
| `input` | `{ value: string }` | Fires on every keystroke |

## Methods

| Method  | Signature                        | Description                        |
|---------|----------------------------------|------------------------------------|
| `focus` | `(options?: FocusOptions): void` | Forwards focus to internal textarea |

## Usage examples

```html
<!-- Basic -->
<ov-textarea placeholder="Write your feedback…"></ov-textarea>

<!-- Custom row count -->
<ov-textarea rows="8" placeholder="Long-form content…"></ov-textarea>

<!-- Resize modes -->
<ov-textarea resize="none" placeholder="Fixed size"></ov-textarea>
<ov-textarea resize="both" placeholder="Freely resizable"></ov-textarea>

<!-- States -->
<ov-textarea value="This cannot be changed." readonly></ov-textarea>
<ov-textarea placeholder="Disabled" disabled></ov-textarea>
<ov-textarea value="Too short." invalid></ov-textarea>
```

## Rules

- Always pair with `ov-label` (via `ov-field`) — the component renders no label itself.
- Prefer `resize="none"` when the textarea is inside a constrained layout where overflow would break the grid.
- `value` is live-bound — read from the `input` event detail rather than the attribute after user interaction.
