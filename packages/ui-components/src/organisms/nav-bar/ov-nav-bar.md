# ov-nav-bar

Sticky top navigation bar. All typography — wordmark, nav link style, active underline — is fully encapsulated. Consumers pass structured data via props; no external CSS is needed.

## Tag

```html
<ov-nav-bar
  brand="OpenValue"
  tagline="Tech Tribes"
  .items=${navItems}
  active="/"
>
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>
```

## Properties

| Property   | Attribute    | Type         | Default | Description                                          |
|------------|--------------|--------------|---------|------------------------------------------------------|
| `brand`    | `brand`      | `string`     | `''`    | Primary wordmark text                                |
| `tagline`  | `tagline`    | `string`     | `''`    | Sub-brand or tagline below the brand name            |
| `logoHref` | `logo-href`  | `string`     | `'/'`   | href the logo links to                               |
| `items`    | —            | `NavItem[]`  | `[]`    | Navigation items. Set as a JS property, not attribute|
| `active`   | `active`     | `string`     | `''`    | `href` of the active item — marks it `aria-current="page"` |

### NavItem type

```ts
interface NavItem {
  label: string;
  href: string;
}
```

## Slots

| Slot      | Description                                            |
|-----------|--------------------------------------------------------|
| `logo`    | Custom logo (SVG / img); overrides the text wordmark   |
| `actions` | CTA buttons on the far right                           |

## Usage examples

```html
<script type="module">
  const NAV_ITEMS = [
    { label: 'Home',     href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About',    href: '/about' },
  ];
  document.querySelector('ov-nav-bar').items = NAV_ITEMS;
</script>

<ov-nav-bar brand="OpenValue" tagline="Tech Tribes" active="/">
  <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
</ov-nav-bar>
```

## Rules

- `items` is an array property — set it in JavaScript, not as an HTML attribute.
- Set `active` to the exact `href` string of the current page to show the underline indicator.
- Use the `logo` slot only for image/SVG logos; for text wordmarks prefer `brand` + `tagline` props.
