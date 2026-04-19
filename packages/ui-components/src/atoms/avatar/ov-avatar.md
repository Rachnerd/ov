# ov-avatar

Displays a user image, derived initials, or explicit initials in a fixed-size circle or square. Falls back gracefully from image → initials → empty.

## Tag

```html
<ov-avatar name="Sarah Kim"></ov-avatar>
```

## Properties

| Property   | Attribute  | Type                                    | Default    | Description                                                  |
|------------|------------|-----------------------------------------|------------|--------------------------------------------------------------|
| `src`      | `src`      | `string`                                | `''`       | Image URL; when set, renders `<img>` instead of initials     |
| `alt`      | `alt`      | `string`                                | `''`       | Alt text for the image (falls back to `name`)                |
| `name`     | `name`     | `string`                                | `''`       | Full name — used to derive initials automatically            |
| `initials` | `initials` | `string`                                | `''`       | Explicit initials (max 2 chars); overrides `name`-derived ones |
| `size`     | `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`     | `20 / 28 / 40 / 56 / 80 px`                                  |
| `shape`    | `shape`    | `'circle' \| 'square'`                  | `'circle'` | Border radius treatment                                      |
| `tone`     | `tone`     | `'brand' \| 'accent' \| 'neutral'`      | `'brand'`  | Background/foreground color when showing initials            |

## Usage examples

```html
<!-- Initials derived from name -->
<ov-avatar name="Sarah Kim"></ov-avatar>
<ov-avatar name="Tom"></ov-avatar>

<!-- Explicit initials -->
<ov-avatar initials="AI"></ov-avatar>

<!-- Image -->
<ov-avatar src="/avatars/sarah.jpg" name="Sarah Kim"></ov-avatar>

<!-- Sizes -->
<ov-avatar name="A B" size="xs"></ov-avatar>
<ov-avatar name="A B" size="sm"></ov-avatar>
<ov-avatar name="A B" size="md"></ov-avatar>
<ov-avatar name="A B" size="lg"></ov-avatar>
<ov-avatar name="A B" size="xl"></ov-avatar>

<!-- Tones -->
<ov-avatar name="Brand User" tone="brand"></ov-avatar>
<ov-avatar name="Accent User" tone="accent"></ov-avatar>
<ov-avatar name="Neutral" tone="neutral"></ov-avatar>

<!-- Square shape (for organizations/entities) -->
<ov-avatar name="Acme Corp" shape="square" size="md"></ov-avatar>

<!-- Avatar stack pattern -->
<div class="avatar-stack">
  <ov-avatar name="Alice W" tone="brand"></ov-avatar>
  <ov-avatar name="Bob M" tone="accent"></ov-avatar>
  <ov-avatar initials="+3" tone="neutral"></ov-avatar>
</div>
```

## Rules

- Always set either `name` or `initials` — without them, an empty circle renders with no content.
- When using `src`, also set `name` as the image `alt` text fallback.
