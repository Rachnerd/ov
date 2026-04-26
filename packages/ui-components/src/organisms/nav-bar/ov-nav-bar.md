# ov-nav-bar

Sticky top navigation bar. Items that fit in the available width are shown inline; when any item overflows the links area a hamburger button appears containing all items. All typography is fully encapsulated — no external CSS is needed.

## Tag

```html
<ov-nav-bar brand="OpenValue" tagline="Tech Tribes">
  <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
  <ov-nav-link slot="links" href="/services">Services</ov-nav-link>
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>
```

## Properties

| Property   | Attribute   | Type     | Default | Description                               |
| ---------- | ----------- | -------- | ------- | ----------------------------------------- |
| `brand`    | `brand`     | `string` | `''`    | Primary wordmark text                     |
| `tagline`  | `tagline`   | `string` | `''`    | Sub-brand or tagline below the brand name |
| `logoHref` | `logo-href` | `string` | `'/'`   | href the logo links to                    |

## Slots

| Slot      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| `logo`    | Custom logo (SVG / img); overrides the text wordmark                 |
| `links`   | `ov-nav-link` elements forming the navigation; overflow auto-handled |
| `actions` | CTA buttons on the far right                                         |

## Usage examples

```html
<ov-nav-bar brand="OpenValue" tagline="Tech Tribes">
  <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
  <ov-nav-link slot="links" href="/services">Services</ov-nav-link>
  <ov-nav-link slot="links" href="/about">About</ov-nav-link>
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>

<!-- With image logo -->
<ov-nav-bar logo-href="/">
  <ov-logo slot="logo" size="sm"></ov-logo>
  <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
  <ov-nav-link slot="links" href="/services">Services</ov-nav-link>
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>
```

## Rules

- Place `ov-nav-link` elements in the `links` slot — do not use raw `<a>` elements.
- Set `active` directly on the `ov-nav-link` whose `href` matches the current page.
- Use the `logo` slot only for image/SVG logos; for text wordmarks prefer `brand` + `tagline` props.
- The hamburger appears automatically when items overflow — no breakpoint configuration needed.
