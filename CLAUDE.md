# OpenValue

Monorepo containing the OpenValue design system and applications.

## Packages

- `packages/ui-components` — Lit 3 web-component library (`ov-*` custom elements)
- `packages/style` — Design token CSS (`@ov/style`)
- `apps/my-app` — Vite application consuming the components

## UI Components

### Skill files

Read the relevant skill file before writing or reviewing any `ov-*` element. Each file documents the exact props, slots, events, and valid attribute values for that component.

**Atoms**
- @packages/ui-components/src/atoms/button/ov-button.md
- @packages/ui-components/src/atoms/badge/ov-badge.md
- @packages/ui-components/src/atoms/icon/ov-icon.md
- @packages/ui-components/src/atoms/spinner/ov-spinner.md
- @packages/ui-components/src/atoms/input/ov-input.md
- @packages/ui-components/src/atoms/textarea/ov-textarea.md
- @packages/ui-components/src/atoms/label/ov-label.md
- @packages/ui-components/src/atoms/link/ov-link.md
- @packages/ui-components/src/atoms/checkbox/ov-checkbox.md
- @packages/ui-components/src/atoms/radio/ov-radio.md
- @packages/ui-components/src/atoms/switch/ov-switch.md
- @packages/ui-components/src/atoms/heading/ov-heading.md
- @packages/ui-components/src/atoms/text/ov-text.md
- @packages/ui-components/src/atoms/avatar/ov-avatar.md
- @packages/ui-components/src/atoms/divider/ov-divider.md

**Molecules**
- @packages/ui-components/src/molecules/field/ov-field.md
- @packages/ui-components/src/molecules/alert/ov-alert.md
- @packages/ui-components/src/molecules/card/ov-card.md
- @packages/ui-components/src/molecules/breadcrumbs/ov-breadcrumbs.md
- @packages/ui-components/src/molecules/input-group/ov-input-group.md
- @packages/ui-components/src/molecules/tabs/ov-tabs.md
- @packages/ui-components/src/molecules/menu-item/ov-menu-item.md
- @packages/ui-components/src/molecules/stat/ov-stat.md
- @packages/ui-components/src/molecules/toast/ov-toast.md
- @packages/ui-components/src/molecules/empty-state/ov-empty-state.md

### Generating UI

When asked to build UI with these components:

- Use only props, slots, and attribute values listed in the skill files. Do not invent variants or props.
- Use `ov-heading` for all headings — never `ov-text` for heading-level content.
- Apply design tokens (`var(--color-brand)`, `var(--ov-space-4)`) instead of raw hex or pixel values.
- **Never use `style="..."` attributes on any element.** Define a named class in the `<style>` block (or external stylesheet) instead. The project enforces `no-inline-style` via html-validate.

### Generating forms

When asked to build a form:

- Wrap every label+control pair in `<ov-field>` — never write a bare `<ov-label>` next to a control.
- Use `<ov-input>` for single-line fields, `<ov-textarea>` for multi-line, `<ov-switch>` / `<ov-checkbox>` / `<ov-radio>` for selections.
- The primary submit action is `<ov-button type="submit" variant="primary">`.

### Component file structure

Each component lives in its own folder (`atoms/<name>/` or `molecules/<name>/`) containing exactly:
- `ov-<name>.ts` — the Lit element class
- `ov-<name>.md` — the skill file (props, slots, events, examples)
- `ov-<name>.stories.ts` — Storybook stories

Never put multiple components in a single file. Never create a component without all three files.

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

### Adding or changing a component's API

When a component's attributes or allowed values change, update `.htmlvalidate.json` — it is the single source of truth for both HTML validation and VS Code IntelliSense. `.vscode/html.custom-data.json` is regenerated automatically when `npm run analyze` runs in `packages/ui-components`. Never edit it by hand; it is git-ignored.

### Importing components

Import components individually by path — there is no barrel export:

```ts
import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/atoms/input/ov-input';
import '@ov/ui-components/molecules/field/ov-field';
```
