# ov-button

A button element with multiple visual variants, sizes, loading and disabled states, and optional icon slots.

## Tag

```html
<ov-button>Label</ov-button>
```

## Properties

| Property   | Attribute  | Type                                                       | Default     | Description                                    |
|------------|------------|------------------------------------------------------------|-------------|------------------------------------------------|
| `variant`  | `variant`  | `'primary' \| 'secondary' \| 'ghost' \| 'inverse' \| 'accent' \| 'danger'` | `'primary'` | Visual treatment |
| `size`     | `size`     | `'sm' \| 'md' \| 'lg'`                                    | `'md'`      | Physical scale                                 |
| `type`     | `type`     | `'button' \| 'submit' \| 'reset'`                         | `'button'`  | Native button type for forms                   |
| `disabled` | `disabled` | `boolean`                                                  | `false`     | Non-interactive, dimmed                        |
| `loading`  | `loading`  | `boolean`                                                  | `false`     | Shows spinner, preserves width, blocks clicks  |
| `block`    | `block`    | `boolean`                                                  | `false`     | Stretches to 100% of parent width              |

## Slots

| Slot    | Description                        |
|---------|------------------------------------|
| (default) | Button label text                |
| `start` | Leading icon or element            |
| `end`   | Trailing icon or element           |

## Events

| Event   | Type         | Description                                          |
|---------|--------------|------------------------------------------------------|
| `click` | `MouseEvent` | Standard click; suppressed while `disabled` or `loading` |

## CSS custom properties

| Property               | Description                          |
|------------------------|--------------------------------------|
| `--color-brand`        | Background for `primary` variant     |
| `--color-text-on-brand`| Foreground for `primary` variant     |

## Usage examples

```html
<!-- Variants -->
<ov-button variant="primary">Save</ov-button>
<ov-button variant="secondary">Cancel</ov-button>
<ov-button variant="ghost">Learn more</ov-button>
<ov-button variant="accent">Upgrade</ov-button>
<ov-button variant="danger">Delete</ov-button>
<ov-button variant="inverse">Get started</ov-button>

<!-- Sizes -->
<ov-button size="sm">Small</ov-button>
<ov-button size="md">Medium</ov-button>
<ov-button size="lg">Large</ov-button>

<!-- With icons (use ov-icon in slots) -->
<ov-button variant="primary">
  <ov-icon slot="start" name="plus"></ov-icon>
  New item
</ov-button>

<ov-button variant="secondary">
  Export
  <ov-icon slot="end" name="arrow-right"></ov-icon>
</ov-button>

<!-- States -->
<ov-button loading>Saving…</ov-button>
<ov-button disabled>Unavailable</ov-button>

<!-- Full width -->
<ov-button block>Create account</ov-button>

<!-- Form submit -->
<ov-button type="submit" variant="primary">Submit</ov-button>
```

## Rules

- Always provide visible label text; do not use icon-only buttons without an `aria-label`.
- Use `loading` instead of `disabled` when an async action is in progress — it preserves layout width.
- `inverse` is designed for dark backgrounds; wrap it in a dark container or use on a dark page section.
- Slot content (SVGs, icons) automatically receives `width: 1em; height: 1em` sizing.
