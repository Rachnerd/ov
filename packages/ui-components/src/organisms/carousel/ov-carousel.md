# ov-carousel

A generic animated carousel. Place any card elements in the default slot — the carousel handles layout, smooth scroll, dot navigation, and optional auto-play. Works with `ov-image-card` or any other block element.

## Tag

```html
<ov-carousel heading="Featured items">
  <ov-image-card label="Item 1" src="/photos/1.jpg" href="/items/1"></ov-image-card>
  <ov-image-card label="Item 2" src="/photos/2.jpg" href="/items/2"></ov-image-card>
</ov-carousel>
```

## Properties

| Property       | Attribute       | Type     | Default | Description                                                |
|----------------|-----------------|----------|---------|------------------------------------------------------------|
| `heading`      | `heading`       | `string` | `''`    | Optional section heading                                   |
| `visibleCount` | `visible-count` | `number` | `3`     | Items visible at full width (≥ 1024 px)                    |
| `countMd`      | `count-md`      | `number` | `2`     | Items visible at medium width (640 – 1023 px)              |
| `countSm`      | `count-sm`      | `number` | `1`     | Items visible at small width (< 640 px)                    |
| `autoPlayMs`   | `auto-play-ms`  | `number` | `4000`  | Auto-play interval in ms; set to `0` to disable            |

## Slots

| Slot          | Description                                             |
|---------------|---------------------------------------------------------|
| (default)     | The card items to display (any block element)           |
| `description` | Optional text or markup rendered below the heading      |

## Usage examples

```html
<!-- With ov-image-card items -->
<ov-carousel heading="Our offices in 8 cities">
  <ov-text slot="description" variant="body" as="p">
    Present throughout the Netherlands.
    <ov-link href="/contact">Contact us</ov-link>.
  </ov-text>
  <ov-image-card label="Amsterdam"  src="/offices/amsterdam.jpg"  href="/offices/amsterdam"></ov-image-card>
  <ov-image-card label="Rotterdam"  src="/offices/rotterdam.jpg"  href="/offices/rotterdam"></ov-image-card>
  <ov-image-card label="Eindhoven"  src="/offices/eindhoven.jpg"  href="/offices/eindhoven"></ov-image-card>
  <ov-image-card label="Utrecht"    src="/offices/utrecht.jpg"    href="/offices/utrecht"></ov-image-card>
  <ov-image-card label="Den Haag"   src="/offices/denhaag.jpg"    href="/offices/denhaag"></ov-image-card>
</ov-carousel>

<!-- Two items visible -->
<ov-carousel heading="Featured" visible-count="2">
  <ov-image-card label="A" src="/a.jpg" href="#"></ov-image-card>
  <ov-image-card label="B" src="/b.jpg" href="#"></ov-image-card>
  <ov-image-card label="C" src="/c.jpg" href="#"></ov-image-card>
</ov-carousel>

<!-- No auto-play -->
<ov-carousel heading="Gallery" auto-play-ms="0">
  ...
</ov-carousel>
```

## Rules

- Slot in any block-level element as a carousel item — sizing is applied via `::slotted(*)`.
- Dot navigation is rendered only when the total item count exceeds `visible-count`.
- Clicking a dot resets the auto-play timer.
- Set `auto-play-ms="0"` to disable auto-play entirely.
