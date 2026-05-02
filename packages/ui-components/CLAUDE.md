# @ov/ui-components

Lit 3 web-component library for the OpenValue design system. Components are custom elements (`ov-*`) split into atoms, molecules, organisms, and templates.

## Before you write anything

1. Read `@src/authoring.md` before creating or modifying any component.
2. Before touching any `ov-*` tag, read its skill file from the list below.
3. If a prop, slot, variant, or token isn't in the skill file — ask, don't invent.

---

## Skill files

**Atoms**

- @src/atoms/button/ov-button.md
- @src/atoms/badge/ov-badge.md
- @src/atoms/icon/ov-icon.md
- @src/atoms/spinner/ov-spinner.md
- @src/atoms/input/ov-input.md
- @src/atoms/textarea/ov-textarea.md
- @src/atoms/label/ov-label.md
- @src/atoms/link/ov-link.md
- @src/atoms/nav-link/ov-nav-link.md
- @src/atoms/checkbox/ov-checkbox.md
- @src/atoms/radio/ov-radio.md
- @src/atoms/switch/ov-switch.md
- @src/atoms/heading/ov-heading.md
- @src/atoms/text/ov-text.md
- @src/atoms/avatar/ov-avatar.md
- @src/atoms/divider/ov-divider.md

**Molecules**

- @src/molecules/field/ov-field.md
- @src/molecules/alert/ov-alert.md
- @src/molecules/card/ov-card.md
- @src/molecules/image-card/ov-image-card.md
- @src/molecules/breadcrumbs/ov-breadcrumbs.md
- @src/molecules/input-group/ov-input-group.md
- @src/molecules/tabs/ov-tabs.md
- @src/molecules/menu-item/ov-menu-item.md
- @src/molecules/stat/ov-stat.md
- @src/molecules/toast/ov-toast.md
- @src/molecules/empty-state/ov-empty-state.md
- @src/molecules/service-card/ov-service-card.md

**Organisms**

- @src/organisms/nav-bar/ov-nav-bar.md
- @src/organisms/hero/ov-hero.md
- @src/organisms/carousel/ov-carousel.md
- @src/organisms/services-section/ov-services-section.md

**Templates**

- @src/templates/page-layout/ov-page-layout.md

---

## Rules

### UI

- Use only props, slots, and attribute values listed in the skill file. Never invent variants or props.
- Use `ov-heading` for all headings — never `ov-text` for heading-level content.
- Apply design tokens (`var(--color-brand)`, `var(--ov-space-4)`) instead of raw hex or pixel values. Raw hex/px where a token exists → **Error**.

### Forms

- Wrap every label+control pair in `<ov-field>`. A bare `<ov-label>` next to a control → **Error**.
- Single-line → `<ov-input>`, multi-line → `<ov-textarea>`, boolean → `<ov-switch>`, one-of → `<ov-radio>`, many-of → `<ov-checkbox>`.
- Primary submit: `<ov-button type="submit" variant="primary">`.

### Importing

Always import by exact path — no barrel export exists:

```ts
import '@ov/ui-components/<tier>/<name>/ov-<name>';

// Examples:
import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/molecules/field/ov-field';
import '@ov/ui-components/organisms/nav-bar/ov-nav-bar';
import '@ov/ui-components/templates/page-layout/ov-page-layout';
```

---

## Component file structure

Each component lives in its own folder containing exactly three files — no more, no fewer:

```
<tier>/<name>/
  ov-<name>.ts          # Lit element class
  ov-<name>.md          # Skill file (props, slots, events, examples)
  ov-<name>.stories.ts  # Storybook stories
```

Never put multiple components in one file. Never create a component without all three files.

---

## Stories

When writing or reviewing Storybook stories, read `src/authoring-stories.md`.

---

## Code review severity

### Error — must fix

- Unknown prop, slot, or invalid attribute value
- `ov-radio` group missing a shared `name`
- Bare `<ov-label>` without `<ov-field>`
- Raw hex or px value where a design token exists

### Warning — should fix

- `ov-icon` without `label` as sole interactive content
- `target="_blank"` missing `rel="noopener noreferrer"`
- `ov-avatar` missing both `name` and `initials`

### Suggestion — worth considering

- Manual label+control replaceable with `<ov-field>`
- `disabled` where `loading` fits better
- Raw color value where a token exists

---

## When in doubt

If a prop, slot, variant, or token isn't in the skill file — **ask, don't invent**.
