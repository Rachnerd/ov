# ov-avatar / ov-divider

Two layout-support atoms: `ov-avatar` for user/entity representation and `ov-divider` for visual separation.

---

## ov-avatar

Displays a user image, derived initials, or explicit initials in a fixed-size circle or square. Falls back gracefully from image → initials → empty.

### Tag

```html
<ov-avatar name="Sarah Kim"></ov-avatar>
```

### Properties

| Property   | Attribute  | Type                                    | Default    | Description                                                  |
|------------|------------|-----------------------------------------|------------|--------------------------------------------------------------|
| `src`      | `src`      | `string`                                | `''`       | Image URL; when set, renders `<img>` instead of initials     |
| `alt`      | `alt`      | `string`                                | `''`       | Alt text for the image (falls back to `name`)                |
| `name`     | `name`     | `string`                                | `''`       | Full name — used to derive initials automatically            |
| `initials` | `initials` | `string`                                | `''`       | Explicit initials (max 2 chars); overrides `name`-derived ones |
| `size`     | `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`     | `20 / 28 / 40 / 56 / 80 px`                                  |
| `shape`    | `shape`    | `'circle' \| 'square'`                  | `'circle'` | Border radius treatment                                      |
| `tone`     | `tone`     | `'brand' \| 'accent' \| 'neutral'`      | `'brand'`  | Background/foreground color when showing initials            |

### Usage examples

```html
<!-- Initials derived from name -->
<ov-avatar name="Sarah Kim"></ov-avatar>         <!-- renders "SK" -->
<ov-avatar name="Tom"></ov-avatar>               <!-- renders "T" -->

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
<div style="display:flex">
  <ov-avatar name="Alice W" tone="brand" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
  <ov-avatar name="Bob M" tone="accent" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
  <ov-avatar initials="+3" tone="neutral" style="border:2px solid white;border-radius:50%"></ov-avatar>
</div>
```

---

## ov-divider

A horizontal (or vertical) separator with optional centred label text.

### Tag

```html
<ov-divider></ov-divider>
```

### Properties

| Property      | Attribute     | Type                          | Default        | Description                                    |
|---------------|---------------|-------------------------------|----------------|------------------------------------------------|
| `orientation` | `orientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Direction of the divider line                  |
| `variant`     | `variant`     | `'default' \| 'subtle' \| 'strong'` | `'default'` | Line color intensity                      |
| `spacing`     | `spacing`     | `string`                      | `''`           | CSS length for margin (`var(--ov-space-4)` default) |

### Slots

| Slot      | Description                                        |
|-----------|----------------------------------------------------|
| (default) | Optional label text centred within a horizontal divider |

### Usage examples

```html
<!-- Horizontal (default) -->
<ov-divider></ov-divider>

<!-- With label -->
<ov-divider>OR</ov-divider>
<ov-divider>Continue with</ov-divider>

<!-- Variants -->
<ov-divider variant="subtle"></ov-divider>
<ov-divider variant="strong"></ov-divider>

<!-- Custom spacing -->
<ov-divider spacing="var(--ov-space-8)"></ov-divider>

<!-- Vertical (use inside a flex container) -->
<div style="display:flex; align-items:center; height:40px">
  <span>Dashboard</span>
  <ov-divider orientation="vertical"></ov-divider>
  <span>Reports</span>
  <ov-divider orientation="vertical"></ov-divider>
  <span>Settings</span>
</div>
```

---

## Rules

- `ov-avatar`: always set either `name` or `initials` — without them, an empty circle renders with no content.
- `ov-avatar`: when using `src`, also set `name` as the image `alt` text fallback.
- `ov-divider`: label text only renders on horizontal orientation — slotted content is ignored when `orientation="vertical"`.
- `ov-divider`: vertical dividers need `align-self: stretch` or a fixed height on the parent flex container to be visible.
