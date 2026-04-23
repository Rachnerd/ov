# ov-nav-link

An uppercase navigation link styled for dark nav bars. Shows a brand-color bottom-border indicator when active. Designed to be composed inside `ov-nav-bar` or any dark header surface.

## Tag

```html
<ov-nav-link href="/services">Services</ov-nav-link>
```

## Properties

| Property | Attribute | Type      | Default | Description                                          |
|----------|-----------|-----------|---------|------------------------------------------------------|
| `href`   | `href`    | `string`  | `'#'`   | Link destination                                     |
| `active` | `active`  | `boolean` | `false` | Shows the brand-color underline indicator; sets `aria-current="page"` |

## Slots

| Slot      | Description  |
|-----------|--------------|
| (default) | Link text    |

## CSS custom properties

| Property              | Description                                  |
|-----------------------|----------------------------------------------|
| `--ov-nav-link-color` | Link text color (default: `white`)           |

## Usage examples

```html
<!-- Basic -->
<ov-nav-link href="/services">Services</ov-nav-link>

<!-- Active page -->
<ov-nav-link href="/" active>Home</ov-nav-link>

<!-- In a dark nav bar -->
<nav style="background:#1e2330;display:flex;gap:24px;padding:16px">
  <ov-nav-link href="/" active>Home</ov-nav-link>
  <ov-nav-link href="/services">Services</ov-nav-link>
  <ov-nav-link href="/about">About</ov-nav-link>
</nav>

<!-- Hidden (removed from layout and tab order) -->
<ov-nav-link href="/about" hidden>About</ov-nav-link>
```

## Rules

- Always provide label text — nav links without text have no accessible name.
- Set `active` to the link whose `href` matches the current page; only one link should be active at a time.
- Text color defaults to white; override via `--ov-nav-link-color` for light navigation bars.
- Setting the native `hidden` attribute removes the element from both layout and tab order.
