# @ov/ui-components

Lit 3 web-component library for the OpenValue design system. Components are custom elements (`ov-*`) split into atoms and molecules.

## Skill files

Read the relevant skill file before writing or reviewing any `ov-*` element. Each file documents exact props, slots, events, and valid attribute values.

- @src/atoms/button/ov-button.md
- @src/atoms/badge/ov-badge.md
- @src/atoms/icon/ov-icon.md
- @src/atoms/input/ov-input.md
- @src/atoms/textarea/ov-textarea.md
- @src/atoms/label/ov-label.md
- @src/atoms/link/ov-link.md
- @src/atoms/selection/ov-selection.md
- @src/atoms/heading/ov-heading.md
- @src/atoms/text/ov-text.md
- @src/atoms/avatar-divider/ov-avatar-divider.md

All skill files are also aggregated in `llms.txt` at the package root.

## Generating UI

- Use only props, slots, and attribute values listed in the skill files. Do not invent variants or props.
- Use `ov-heading` for all headings — never `ov-text` for heading-level content.
- Apply design tokens (`var(--color-brand)`, `var(--ov-space-4)`) instead of raw hex or pixel values.

## Generating forms

- Wrap every label+control pair in `<ov-field>` — never a bare `<ov-label>` next to a control.
- Single-line → `<ov-input>`, multi-line → `<ov-textarea>`, boolean → `<ov-switch>`, one-of → `<ov-radio>`, many-of → `<ov-checkbox>`.
- Primary submit: `<ov-button type="submit" variant="primary">`.

## Generating stories

- Read the skill file and the `.ts` source before writing anything.
- Place stories next to the component: `src/atoms/button/ov-button.stories.ts`.
- Required stories: `Default` (args-driven), one per major variant axis, `States`, and one `Real-world: …`.

## Reviewing code

- **Error**: unknown prop/slot, invalid attribute value, `ov-radio` group missing shared `name`, bare `ov-label` without `ov-field`.
- **Warning**: `ov-icon` without `label` as sole interactive content, `target="_blank"` missing `rel="noopener noreferrer"`, `ov-avatar` missing `name` and `initials`.
- **Suggestion**: manual label+control replaceable with `ov-field`, `disabled` where `loading` fits better, raw color where a token exists.

## Importing

No barrel export. Import each component by path:

```ts
import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/atoms/input/ov-input';
import '@ov/ui-components/molecules/field/ov-field';
```
