# ov-alert

Contextual feedback message. Composes an icon, title, body copy, and an optional dismiss button into one cohesive unit.

## Tag

```html
<ov-alert variant="info">Something happened.</ov-alert>
```

## Properties

| Property      | Attribute     | Type                                            | Default  | Description                                        |
|---------------|---------------|-------------------------------------------------|----------|----------------------------------------------------|
| `variant`     | `variant`     | `'info' \| 'success' \| 'warning' \| 'danger'`  | `'info'` | Semantic color intent                              |
| `title`       | `title`       | `string`                                        | `''`     | Main title text                                    |
| `dismissible` | `dismissible` | `boolean`                                       | `false`  | Shows ✕ button; fires `dismiss` event on click     |

## Slots

| Slot      | Description                                                   |
|-----------|---------------------------------------------------------------|
| (default) | Alert body copy                                               |
| `title`   | Custom title markup; overrides the `title` property           |
| `actions` | Optional call-to-action links or buttons below the body       |

## Events

| Event     | Detail | Description                              |
|-----------|--------|------------------------------------------|
| `dismiss` | `void` | Fires when the user clicks the ✕ button  |

## CSS custom properties

| Property           | Description               |
|--------------------|---------------------------|
| `--ov-alert-radius` | Border radius override   |

## Parts

| Part    | Description         |
|---------|---------------------|
| `alert` | The root alert div  |

## Usage examples

```html
<!-- Variants -->
<ov-alert variant="info">Your session will expire in 10 minutes.</ov-alert>
<ov-alert variant="success" title="Changes saved">Your profile has been updated.</ov-alert>
<ov-alert variant="warning" title="Low storage">You have less than 100 MB remaining.</ov-alert>
<ov-alert variant="danger" title="Payment failed">Please update your billing details.</ov-alert>

<!-- Dismissible -->
<ov-alert variant="info" title="New feature" dismissible>
  Dark mode is now available in settings.
</ov-alert>

<!-- With actions -->
<ov-alert variant="warning" title="Unsaved changes">
  You have unsaved changes that will be lost.
  <div slot="actions">
    <ov-button variant="ghost" size="sm">Discard</ov-button>
    <ov-button variant="primary" size="sm">Save now</ov-button>
  </div>
</ov-alert>

<!-- Custom title slot -->
<ov-alert variant="danger">
  <strong slot="title">Critical error — action required</strong>
  Contact support if this persists.
</ov-alert>
```

## Rules

- `ov-alert` renders with `role="alert"` — do not put it inside another live region.
- After dismissal the component hides itself internally; remove it from the DOM if you need to reuse it.
- Prefer `title` property for plain text; use the `title` slot only for rich markup.
