# ov-breadcrumbs

Accepts an array of `{ label, href? }` items and renders a semantic `<nav aria-label="Breadcrumb"><ol>` trail with chevron separators. The last item is always current-page (`aria-current="page"`, no link).

## Tag

```html
<ov-breadcrumbs .items=${[...]}></ov-breadcrumbs>
```

## Properties

| Property | Attribute | Type              | Default | Description                                           |
|----------|-----------|-------------------|---------|-------------------------------------------------------|
| `items`  | —         | `BreadcrumbItem[]` | `[]`    | Ordered list of items. Last item = current page.      |
| `max`    | `max`     | `number`          | `0`     | Collapse to "…" once more than `max` items exist. `0` = no limit. |

### BreadcrumbItem type

```ts
interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

## Slots

| Slot        | Description                                             |
|-------------|---------------------------------------------------------|
| `separator` | Custom separator element; overrides the default chevron |

## Parts

| Part   | Description      |
|--------|------------------|
| `nav`  | The `<nav>` root |
| `list` | The `<ol>` list  |
| `item` | Each `<li>`      |
| `link` | Each `<a>`       |

## Usage examples

```html
<!-- Basic -->
<ov-breadcrumbs .items=${[
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
]}></ov-breadcrumbs>

<!-- Collapsed (shows first + last, middle → "…") -->
<ov-breadcrumbs
  max="3"
  .items=${[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'OpenValue', href: '/projects/ov' },
    { label: 'Components', href: '/projects/ov/components' },
    { label: 'Breadcrumbs' },
  ]}
></ov-breadcrumbs>

<!-- Custom separator -->
<ov-breadcrumbs .items=${[...]}>
  <span slot="separator">/</span>
</ov-breadcrumbs>
```

## Rules

- `items` must be set as a property (`.items=${[...]}`), not an attribute — arrays cannot be serialized to HTML attributes.
- The last item is always rendered as current page text (no `<a>`), regardless of whether `href` is set.
- `max` collapses middle items to "…" — always shows first and last items.
