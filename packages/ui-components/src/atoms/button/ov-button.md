# ov-button

A button element with multiple visual variants, sizes, loading and disabled states, and optional icon slots.

## Tag

```html
<ov-button>Label</ov-button>
```

## Properties

| Property   | Attribute  | Type                                                                       | Default     | Description                                                                                                    |
| ---------- | ---------- | -------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `variant`  | `variant`  | `'primary' \| 'secondary' \| 'ghost' \| 'inverse' \| 'accent' \| 'danger'` | `'primary'` | Visual treatment                                                                                               |
| `size`     | `size`     | `'sm' \| 'md' \| 'lg'`                                                     | `'md'`      | Physical scale                                                                                                 |
| `type`     | `type`     | `'button' \| 'submit' \| 'reset'`                                          | `'button'`  | Native button type for forms                                                                                   |
| `disabled` | `disabled` | `boolean`                                                                  | `false`     | Non-interactive, dimmed. Use only when the action is permanently unavailable — use `loading` for async states. |
| `loading`  | `loading`  | `boolean`                                                                  | `false`     | Shows spinner, preserves layout width, suppresses clicks                                                       |
| `block`    | `block`    | `boolean`                                                                  | `false`     | Stretches to 100% of parent width                                                                              |

## Slots

| Slot      | Description              |
| --------- | ------------------------ |
| (default) | Button label text        |
| `start`   | Leading icon or element  |
| `end`     | Trailing icon or element |

## CSS custom properties

| Property                | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `--color-brand`         | Background for `primary` variant                                    |
| `--color-text-on-brand` | Foreground for `primary` variant                                    |
| `--ov-button-radius`    | Border radius override; used by `ov-input-group` to flatten corners |

## Examples

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

<!-- Icon slots -->
<ov-button variant="primary">
  <ov-icon slot="start" name="plus"></ov-icon>
  New item
</ov-button>
<ov-button variant="secondary">
  Export
  <ov-icon slot="end" name="arrow-right"></ov-icon>
</ov-button>

<!-- Icon-only: aria-label required -->
<ov-button variant="ghost" aria-label="Close dialog">
  <ov-icon slot="start" name="x"></ov-icon>
</ov-button>

<!-- States -->
<ov-button loading>Saving…</ov-button>
<ov-button disabled>Unavailable</ov-button>

<!-- Full width -->
<ov-button block variant="primary">Create account</ov-button>

<!-- Form submit -->
<ov-button type="submit" variant="primary">Submit</ov-button>

<!-- Combinations -->
<ov-button variant="primary" size="lg" block>Get started</ov-button>
<ov-button variant="danger" loading>Deleting…</ov-button>
<ov-button variant="primary" type="submit" loading>
  <ov-icon slot="start" name="save"></ov-icon>
  Saving…
</ov-button>
```

## Rules

- Provide visible label text on every button. Icon-only buttons **must** have `aria-label`.
- Use `loading` for async actions in progress — never `disabled`. `loading` preserves layout width and suppresses clicks.
- `inverse` is for dark backgrounds only; wrap it in a dark container or dark page section.
- Slot content (icons, SVGs) is automatically sized to `1em × 1em`.

## Errors

| Violation                                  | Correct pattern                                       |
| ------------------------------------------ | ----------------------------------------------------- |
| `disabled` on a button mid-async action    | Use `loading` instead                                 |
| Icon-only button with no `aria-label`      | Add `aria-label="…"` to the element                   |
| Unknown variant (e.g. `variant="outline"`) | Only: `primary secondary ghost inverse accent danger` |
| Raw `<button>` inside an organism          | Use `<ov-button>`                                     |
