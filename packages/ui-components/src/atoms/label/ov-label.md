# ov-label

An accessible form label that associates with a control via the `for` attribute and optionally displays a required indicator and hint text.

## Tag

```html
<ov-label for="my-input">Email address</ov-label>
```

## Properties

| Property   | Attribute  | Type               | Default | Description                                      |
|------------|------------|--------------------|---------|--------------------------------------------------|
| `for`      | `for`      | `string`           | `''`    | `id` of the associated form control              |
| `required` | `required` | `boolean`          | `false` | Renders a red `*` after the label text           |
| `size`     | `size`     | `'sm' \| 'md'`    | `'md'`  | Text scale                                       |

## Slots

| Slot      | Description                                     |
|-----------|-------------------------------------------------|
| (default) | Label text                                      |
| `hint`    | Optional supplementary text shown beside label  |

## Usage examples

```html
<!-- Basic -->
<ov-label for="email">Email address</ov-label>
<ov-input id="email" type="email"></ov-input>

<!-- Required field -->
<ov-label for="name" required>Full name</ov-label>
<ov-input id="name"></ov-input>

<!-- With hint -->
<ov-label for="pw">
  Password
  <span slot="hint">Min. 8 characters</span>
</ov-label>
<ov-input id="pw" type="password"></ov-input>

<!-- Small size -->
<ov-label for="search" size="sm">Search</ov-label>
```

## Rules

- Always set `for` to match the `id` of the associated control so screen readers announce the label correctly.
- Prefer `ov-field` over manual `ov-label` + control composition — it wires `for`/`id` and validation states automatically.
- The `hint` slot renders at a smaller size and muted color; keep hint text brief (under 10 words).
