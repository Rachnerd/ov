# @ov/ui-components

Lit 3 web-component library for the OpenValue design system. All components are standard custom elements (`ov-*`) that work in any framework or plain HTML.

## Usage

Import components individually by path — there is no barrel export:

```ts
import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/atoms/input/ov-input';
import '@ov/ui-components/molecules/field/ov-field';
import '@ov/ui-components/molecules/image-card/ov-image-card';
import '@ov/ui-components/organisms/nav-bar/ov-nav-bar';
import '@ov/ui-components/organisms/hero/ov-hero';
import '@ov/ui-components/organisms/carousel/ov-carousel';
import '@ov/ui-components/organisms/page-layout/ov-page-layout';
```

Also import `@ov/style` once in your app entry — the components rely on its CSS custom properties:

```ts
import '@ov/style';
```

## Components

### Atoms

| Component | Tag | Description |
|-----------|-----|-------------|
| Button | `<ov-button>` | Multi-variant action button with loading state |
| Badge | `<ov-badge>` | Inline status label |
| Icon | `<ov-icon>` | Built-in SVG icons or custom slot |
| Spinner | `<ov-spinner>` | Animated loading indicator |
| Input | `<ov-input>` | Single-line text field |
| Textarea | `<ov-textarea>` | Multi-line text field |
| Label | `<ov-label>` | Accessible form label |
| Link | `<ov-link>` | Semantic anchor with design-system styles |
| Checkbox | `<ov-checkbox>` | Custom checkbox |
| Radio | `<ov-radio>` | Custom radio button |
| Switch | `<ov-switch>` | Toggle switch |
| Heading | `<ov-heading>` | `h1`–`h6` with independent visual size |
| Text | `<ov-text>` | Body copy with variant and tone control |
| Avatar | `<ov-avatar>` | User image or derived initials |
| Divider | `<ov-divider>` | Horizontal or vertical separator |

### Molecules

| Component | Tag | Description |
|-----------|-----|-------------|
| Field | `<ov-field>` | Label + control + validation message wrapper |
| Alert | `<ov-alert>` | Contextual feedback banner |
| Card | `<ov-card>` | Structured content surface |
| Image Card | `<ov-image-card>` | Clickable photo card with title bar |
| Breadcrumbs | `<ov-breadcrumbs>` | Navigation trail |
| Input Group | `<ov-input-group>` | Input fused with prefix/suffix buttons |
| Tabs | `<ov-tabs>` | Accessible tab list |
| Menu Item | `<ov-menu-item>` | Row for dropdowns and command palettes |
| Stat | `<ov-stat>` | Metric display with trend delta |
| Toast | `<ov-toast>` | Auto-dismissing notification |
| Empty State | `<ov-empty-state>` | Placeholder for empty lists or views |

### Organisms

| Component | Tag | Description |
|-----------|-----|-------------|
| Nav Bar | `<ov-nav-bar>` | Sticky top navigation with wordmark and links |
| Hero | `<ov-hero>` | Full-width banner with heading and CTA |
| Carousel | `<ov-carousel>` | Animated slot-based card carousel |
| Page Layout | `<ov-page-layout>` | Full-page shell with max-width content area |

## Component skill files

Each component has an `.md` skill file documenting its exact props, slots, events, CSS custom properties, and usage examples:

```
src/atoms/button/ov-button.md
src/molecules/field/ov-field.md
src/organisms/carousel/ov-carousel.md
…
```

## Development

```bash
# Storybook — isolated component explorer
npm run storybook

# Unit tests (browser-native via Web Test Runner)
npm test
npm run test:watch

# Regenerate custom-elements.json manifest and VS Code IntelliSense data
npm run analyze
```

## Storybook

Storybook runs at `http://localhost:6006`. Every component has:
- A `Default` story driven by `args` (controls panel)
- Stories for each major variant axis
- A `States` story
- At least one `Real-world` story

Toggle dark mode using the moon/sun icon in the Storybook toolbar.

## Testing

Tests run in a real browser (Chromium) via Playwright. Each component has a `.test.ts` file covering rendering, properties, events, and axe accessibility.

```bash
npm test              # single run
npm run test:watch    # watch mode
```

## Architecture notes

- Components use **shadow DOM** — global CSS classes do not apply inside them. All theming is done via CSS custom properties from `@ov/style`.
- Every component imports `baseStyles` from `src/shared-styles.ts` for consistent font, color, box-sizing, and reduced-motion handling.
- Prop types are centralised in `src/tokens.ts` (atoms) and `src/molecule-tokens.ts` (molecules).

See [`CLAUDE.md`](./CLAUDE.md) for authoring guidance and rules.
