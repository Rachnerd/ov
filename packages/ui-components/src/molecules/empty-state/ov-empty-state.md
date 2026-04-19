# ov-empty-state

A centred placeholder shown when a list, table, or data area has no content. Composes an icon, heading, description, and optional action buttons.

## Tag

```html
<ov-empty-state heading="No results found"></ov-empty-state>
```

## Properties

| Property      | Attribute     | Type                               | Default  | Description                                                  |
|---------------|---------------|------------------------------------|----------|--------------------------------------------------------------|
| `heading`     | `heading`     | `string`                           | `''`     | Main heading text                                            |
| `description` | `description` | `string`                           | `''`     | Explanatory body text below the heading                      |
| `icon`        | `icon`        | `BuiltInIconName \| ''`            | `''`     | Built-in icon name; empty shows a default dashed-box SVG     |
| `size`        | `size`        | `'sm' \| 'md' \| 'lg'`            | `'md'`   | Scale: controls padding, icon wrap, and heading font size    |

## Slots

| Slot      | Description                                                      |
|-----------|------------------------------------------------------------------|
| `icon`    | Illustration or `ov-icon` override (replaces built-in icon)      |
| `actions` | Buttons / links below the description                            |

## Parts

| Part          | Description           |
|---------------|-----------------------|
| `empty-state` | Root container div    |
| `icon`        | Icon wrapper div      |

## Usage examples

```html
<!-- Basic -->
<ov-empty-state
  heading="No projects yet"
  description="Create your first project to get started."
></ov-empty-state>

<!-- With built-in icon -->
<ov-empty-state
  icon="search"
  heading="No results"
  description="Try adjusting your search or filters."
></ov-empty-state>

<!-- With action -->
<ov-empty-state
  heading="No team members"
  description="Invite colleagues to collaborate on this project."
>
  <ov-button slot="actions" variant="primary">
    <ov-icon slot="start" name="plus"></ov-icon>
    Invite member
  </ov-button>
</ov-empty-state>

<!-- Sizes -->
<ov-empty-state size="sm" heading="Nothing here" description="This list is empty."></ov-empty-state>
<ov-empty-state size="lg" heading="Welcome aboard!" description="Let's get started by creating your first item."></ov-empty-state>

<!-- Custom illustration -->
<ov-empty-state heading="No notifications">
  <img slot="icon" src="/illustrations/inbox-empty.svg" alt="">
  <ov-button slot="actions" variant="ghost">Refresh</ov-button>
</ov-empty-state>
```

## Rules

- Always provide at least a `heading` — a blank empty state is confusing for users.
- `description` should explain why the state is empty and hint at what the user can do.
- The `icon` slot takes precedence over the `icon` property — use the slot for custom illustrations.
- `size="sm"` suits tight panels or sidebars; `size="lg"` suits full-page empty states.
