# ov-toast

A transient notification that slides in, auto-dismisses after a configurable duration, and can be manually closed. Fires a `dismiss` event when hidden so the host can remove it from the DOM.

## Tag

```html
<ov-toast
  toast-id="t1"
  variant="success"
  title="Saved"
  message="Your changes have been saved."
></ov-toast>
```

## Properties

| Property   | Attribute   | Type                                            | Default  | Description                                                         |
|------------|-------------|-------------------------------------------------|----------|---------------------------------------------------------------------|
| `toastId`  | `toast-id`  | `string`                                        | `''`     | Identifier echoed in the `dismiss` event detail                     |
| `variant`  | `variant`   | `'info' \| 'success' \| 'warning' \| 'danger'`  | `'info'` | Semantic color intent                                               |
| `title`    | `title`     | `string`                                        | `''`     | Bold title line                                                     |
| `message`  | `message`   | `string`                                        | `''`     | Secondary message text                                              |
| `duration` | `duration`  | `number`                                        | `5000`   | Auto-dismiss delay in ms. Set to `0` to disable auto-dismiss.       |

## Slots

| Slot      | Description                                 |
|-----------|---------------------------------------------|
| (default) | Custom body content; used instead of `message` |

## Events

| Event     | Detail              | Description                                          |
|-----------|---------------------|------------------------------------------------------|
| `dismiss` | `{ id: string }`    | Fires when the toast is hidden (auto or manual close) |

## Methods

| Method | Signature    | Description                          |
|--------|--------------|--------------------------------------|
| `show` | `(): void`   | Makes the toast visible and starts the auto-dismiss timer |
| `hide` | `(): void`   | Hides the toast and fires `dismiss`  |

## Parts

| Part    | Description    |
|---------|----------------|
| `toast` | The toast card |

## Usage examples

```html
<!-- Programmatic usage -->
<ov-toast id="my-toast" toast-id="save-1" variant="success" title="Saved" message="Profile updated."></ov-toast>

<script>
  document.getElementById('my-toast').show();
</script>

<!-- Variants -->
<ov-toast variant="info"    title="Info"    message="New version available."></ov-toast>
<ov-toast variant="success" title="Done"    message="File uploaded successfully."></ov-toast>
<ov-toast variant="warning" title="Warning" message="Your session expires soon."></ov-toast>
<ov-toast variant="danger"  title="Error"   message="Connection failed."></ov-toast>

<!-- No auto-dismiss (duration=0) -->
<ov-toast variant="danger" title="Critical" message="Action required." duration="0"></ov-toast>

<!-- Custom body -->
<ov-toast variant="info" title="Update available">
  <ov-link href="/changelog">View changelog</ov-link>
</ov-toast>
```

## Rules

- Call `show()` after adding the toast to the DOM — it does not auto-show on insertion.
- Listen to `dismiss` to remove the element from the DOM after it hides, or memory will accumulate.
- `duration="0"` disables auto-dismiss; the user must click ✕ to close.
- Use `toastId` to identify which toast was dismissed when managing a stack of multiple toasts.
