# ov-office-carousel

An animated carousel section displaying office city cards. Shows 3 cards at a time with smooth scroll animation, dot navigation, and optional auto-play.

## Tag

```html
<ov-office-carousel heading="Our offices in 8 cities" .items=${offices}></ov-office-carousel>
```

## Properties

| Property      | Attribute      | Type           | Default | Description                                            |
|---------------|----------------|----------------|---------|--------------------------------------------------------|
| `heading`     | `heading`      | `string`       | `''`    | Section heading                                        |
| `items`       | —              | `OfficeItem[]` | `[]`    | List of office items to display                        |
| `autoPlayMs`  | `auto-play-ms` | `number`       | `4000`  | Auto-play interval in ms; set to `0` to disable        |

### OfficeItem type

```ts
interface OfficeItem {
  label: string;  // City or location name
  src:   string;  // City photo URL
  href:  string;  // Link destination
}
```

## Slots

| Slot          | Description                                        |
|---------------|----------------------------------------------------|
| `description` | Optional text or markup rendered below the heading |

## Usage examples

```html
<ov-office-carousel
  heading="Our offices in 8 cities"
  auto-play-ms="4000"
>
  <ov-text slot="description" variant="body" as="p">
    Find us across the Netherlands.
    <ov-link href="/contact">Contact us</ov-link>
  </ov-text>
</ov-office-carousel>

<script type="module">
  document.querySelector('ov-office-carousel').items = [
    { label: 'Amsterdam',  src: '/offices/amsterdam.jpg',  href: '/offices/amsterdam' },
    { label: 'Rotterdam',  src: '/offices/rotterdam.jpg',  href: '/offices/rotterdam' },
    { label: 'Eindhoven',  src: '/offices/eindhoven.jpg',  href: '/offices/eindhoven' },
    { label: 'Utrecht',    src: '/offices/utrecht.jpg',    href: '/offices/utrecht' },
    { label: 'Den Haag',   src: '/offices/denhaag.jpg',    href: '/offices/denhaag' },
    { label: 'Groningen',  src: '/offices/groningen.jpg',  href: '/offices/groningen' },
    { label: 'Tilburg',    src: '/offices/tilburg.jpg',    href: '/offices/tilburg' },
    { label: 'Breda',      src: '/offices/breda.jpg',      href: '/offices/breda' },
  ];
</script>
```

## Rules

- `items` must be set as a JS property — arrays cannot be serialized to HTML attributes.
- Dots are rendered only when `items.length > 3`; clicking a dot scrolls to that card and resets auto-play.
- Set `auto-play-ms="0"` to disable auto-play entirely.
