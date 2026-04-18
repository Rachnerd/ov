# ov-input

A single-line text field with prefix/suffix slots, multiple input types, and full validation-state support.

## Tag

```html
<ov-input placeholder="Enter value"></ov-input>
```

## Properties

| Property       | Attribute      | Type                                                             | Default  | Description                                  |
|----------------|----------------|------------------------------------------------------------------|----------|----------------------------------------------|
| `type`         | `type`         | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | Native input type |
| `value`        | `value`        | `string`                                                         | `''`     | Current value (live-bound)                   |
| `placeholder`  | `placeholder`  | `string`                                                         | `''`     | Placeholder text                             |
| `name`         | `name`         | `string`                                                         | `''`     | Form field name                              |
| `autocomplete` | `autocomplete` | `string`                                                         | `'off'`  | Native autocomplete hint                     |
| `size`         | `size`         | `'sm' \| 'md' \| 'lg'`                                          | `'md'`   | Physical scale                               |
| `required`     | `required`     | `boolean`                                                        | `false`  | Required field                               |
| `disabled`     | `disabled`     | `boolean`                                                        | `false`  | Non-interactive, dimmed                      |
| `readonly`     | `readonly`     | `boolean`                                                        | `false`  | Value visible but not editable               |
| `invalid`      | `invalid`      | `boolean`                                                        | `false`  | Applies error border; sets `aria-invalid`    |

## Slots

| Slot     | Description                                      |
|----------|--------------------------------------------------|
| `prefix` | Leading icon or element (search glyph, currency) |
| `suffix` | Trailing icon or element (unit, clear button)    |

## Events

| Event    | Detail                    | Description                            |
|----------|---------------------------|----------------------------------------|
| `input`  | `{ value: string }`       | Fires on every keystroke               |
| `change` | `{ value: string }`       | Fires on commit (blur or Enter)        |

## Methods

| Method  | Signature                        | Description                     |
|---------|----------------------------------|---------------------------------|
| `focus` | `(options?: FocusOptions): void` | Forwards focus to internal input |

## Parts

| Part   | Description               |
|--------|---------------------------|
| `wrap` | The border/background div |

## Usage examples

```html
<!-- Basic -->
<ov-input placeholder="Search…"></ov-input>

<!-- Types -->
<ov-input type="email" placeholder="you@example.com"></ov-input>
<ov-input type="password" placeholder="••••••••"></ov-input>
<ov-input type="number" placeholder="0"></ov-input>

<!-- Sizes -->
<ov-input size="sm" placeholder="Small"></ov-input>
<ov-input size="lg" placeholder="Large"></ov-input>

<!-- With prefix/suffix icons -->
<ov-input placeholder="Search…">
  <ov-icon slot="prefix" name="search"></ov-icon>
</ov-input>

<ov-input type="number" value="42">
  <span slot="suffix">kg</span>
</ov-input>

<!-- States -->
<ov-input value="Read-only" readonly></ov-input>
<ov-input placeholder="Disabled" disabled></ov-input>
<ov-input value="bad@" invalid></ov-input>

<!-- Inside a form -->
<ov-input name="email" type="email" required autocomplete="email"></ov-input>
```

## Rules

- Always pair with `ov-label` (via `ov-field`) to satisfy accessibility — the component does not render its own label.
- Set `invalid` through `ov-field` rather than directly when using the field molecule; `ov-field` syncs it automatically.
- `prefix` and `suffix` slots expect `display: inline-flex` children; plain text will need a wrapper `<span>`.
- `value` is live-bound — read it from the `input` or `change` event detail, not the attribute.
