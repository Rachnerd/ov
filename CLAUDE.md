# OpenValue

Monorepo containing the OpenValue design system and applications.

## Packages

- `packages/ui-components` — Lit 3 web-component library (`ov-*` custom elements)
- `packages/style` — Design token CSS (`@ov/style`)
- `apps/my-app` — Vite application consuming the components

## UI Components

### Skill files

Read the relevant skill file before writing or reviewing any `ov-*` element. Each file documents the exact props, slots, events, and valid attribute values for that component.

- @packages/ui-components/src/atoms/button/ov-button.md
- @packages/ui-components/src/atoms/badge/ov-badge.md
- @packages/ui-components/src/atoms/icon/ov-icon.md
- @packages/ui-components/src/atoms/input/ov-input.md
- @packages/ui-components/src/atoms/textarea/ov-textarea.md
- @packages/ui-components/src/atoms/label/ov-label.md
- @packages/ui-components/src/atoms/link/ov-link.md
- @packages/ui-components/src/atoms/selection/ov-selection.md
- @packages/ui-components/src/atoms/heading/ov-heading.md
- @packages/ui-components/src/atoms/text/ov-text.md
- @packages/ui-components/src/atoms/avatar-divider/ov-avatar-divider.md

### Generating UI

When asked to build UI with these components:

- Use only props, slots, and attribute values listed in the skill files. Do not invent variants or props.
- Use `ov-heading` for all headings — never `ov-text` for heading-level content.
- Apply design tokens (`var(--color-brand)`, `var(--ov-space-4)`) in inline styles instead of raw hex or pixel values.

### Generating forms

When asked to build a form:

- Wrap every label+control pair in `<ov-field>` — never write a bare `<ov-label>` next to a control.
- Use `<ov-input>` for single-line fields, `<ov-textarea>` for multi-line, `<ov-switch>` / `<ov-checkbox>` / `<ov-radio>` for selections.
- The primary submit action is `<ov-button type="submit" variant="primary">`.

### Generating stories

When asked to write a Storybook story for a component:

- Read the component's skill file and its `.ts` source before writing anything.
- Place the story file next to the component: `src/atoms/button/ov-button.stories.ts`.
- Always include: a `Default` story driven by `args`, one story per major variant axis, a `States` story, and at least one `Real-world: …` story.

### Reviewing code

When asked to review `ov-*` usage:

- **Error**: unknown prop or slot, invalid attribute value, `ov-radio` group missing shared `name`, standalone `ov-label` without `ov-field`.
- **Warning**: `ov-icon` without `label` as sole content of an interactive element, `target="_blank"` missing `rel="noopener noreferrer"`, `ov-avatar` missing both `name` and `initials`.
- **Suggestion**: manual label+control pair replaceable with `ov-field`, `disabled` where `loading` is more appropriate, raw color where a token exists.

### Importing components

Import components individually by path — there is no barrel export:

```ts
import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/atoms/input/ov-input';
import '@ov/ui-components/molecules/field/ov-field';
```
