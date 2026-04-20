# ov-page-layout

Page-level layout shell. The `nav`, `hero`, and `footer` slots stretch to the full viewport width. The default slot constrains its content to a configurable max-width (default 1200 px) and centres it with `margin-inline: auto`.

## Tag

```html
<ov-page-layout>
  <ov-nav-bar slot="nav">…</ov-nav-bar>
  <ov-hero slot="hero">…</ov-hero>

  <!-- constrained to 1200 px -->
  <section>Page body</section>

  <footer slot="footer">…</footer>
</ov-page-layout>
```

## Properties

| Property   | Attribute   | Type     | Default | Description                                                  |
|------------|-------------|----------|---------|--------------------------------------------------------------|
| `maxWidth` | `max-width` | `string` | `''`    | Overrides the `--ov-page-max-width` CSS custom property inline |

## Slots

| Slot     | Description                                                    |
|----------|----------------------------------------------------------------|
| `nav`    | Full-width sticky navigation bar                               |
| `hero`   | Full-width hero section                                        |
| (default)| Body content; centred and capped at `--ov-page-max-width`      |
| `footer` | Full-width footer                                              |

## CSS custom properties

| Property              | Default   | Description                              |
|-----------------------|-----------|------------------------------------------|
| `--ov-page-max-width` | `1200px`  | Max width of the constrained body area   |

## Usage examples

```html
<!-- Standard full page -->
<ov-page-layout>
  <ov-nav-bar slot="nav" logo-href="/" active="/">
    <ov-logo slot="logo" size="sm"></ov-logo>
    <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
  </ov-nav-bar>

  <ov-hero slot="hero" src="/banner.jpg" overlay="0.68">
    <ov-logo slot="logo" size="xl"></ov-logo>
  </ov-hero>

  <section class="intro">Constrained body content here.</section>
  <ov-carousel heading="Our offices">…</ov-carousel>

  <footer slot="footer">Full-width footer content</footer>
</ov-page-layout>

<!-- Custom max-width -->
<ov-page-layout max-width="960px">…</ov-page-layout>

<!-- CSS custom property override -->
<style>
  ov-page-layout { --ov-page-max-width: 960px; }
</style>
<ov-page-layout>…</ov-page-layout>
```

## Rules

- Place `ov-nav-bar` in the `nav` slot — it will stay full-width and its own `position: sticky` continues to work.
- Place `ov-hero` in the `hero` slot — it stays full-width and preserves its `clip-path` edge.
- Every section that needs edge-to-edge treatment (future banners, CTAs) should also use a named slot or be a full-bleed element that breaks out with negative margins.
- Do not add horizontal padding to the component — each child section manages its own internal gutters.
