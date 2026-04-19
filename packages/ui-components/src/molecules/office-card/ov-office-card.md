# ov-office-card

A city office card with a dark header bar showing the city name and a directional arrow, plus a city photo below with a hover zoom effect.

## Tag

```html
<ov-office-card label="Amsterdam" src="/offices/amsterdam.jpg" href="/offices/amsterdam"></ov-office-card>
```

## Properties

| Property | Attribute | Type     | Default | Description                          |
|----------|-----------|----------|---------|--------------------------------------|
| `label`  | `label`   | `string` | `''`    | City or location name in the header  |
| `src`    | `src`     | `string` | `''`    | URL of the city photo                |
| `href`   | `href`    | `string` | `'#'`   | Link destination when card is clicked |

## Usage examples

```html
<ov-office-card
  label="Amsterdam"
  src="/offices/amsterdam.jpg"
  href="/offices/amsterdam"
></ov-office-card>

<ov-office-card
  label="Rotterdam"
  src="/offices/rotterdam.jpg"
  href="/offices/rotterdam"
></ov-office-card>
```

## Rules

- Always provide `label` for accessibility (used as the image `alt` text).
- `href` defaults to `#`; always set a meaningful destination.
- The card is entirely clickable via the wrapping `<a>` element.
