# Component Stories

Load this file when **writing or reviewing Storybook stories** for any `ov-*` component.

---

## Before writing

1. Read the component's `.md` skill file.
2. Read the component's `.ts` source.
3. Check a sibling component's stories file for formatting patterns.

---

## Required stories for every component

| Story                      | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| `Default`                  | Args-driven; `argTypes` covers every documented prop            |
| One per major variant axis | e.g. one story per `variant` value                              |
| `States`                   | Every meaningful state: disabled, loading, invalid, empty, etc. |
| `Real-world: …`            | A realistic, composed usage example                             |

---

## Sync rules — after any `.ts` change

| What changed                            | Story action required                       |
| --------------------------------------- | ------------------------------------------- |
| New prop or variant                     | Add story or extend `argTypes` / `args`     |
| Removed prop or variant                 | Remove or update affected story             |
| New visible state                       | Add to `States` story                       |
| Pure CSS token swap (no visual change)  | No update needed                            |
| New child atom/molecule used internally | No update needed unless exposed API changed |

---

## File location

Place stories next to the component:

```
src/<tier>/<name>/ov-<name>.stories.ts
```

Example: `src/atoms/button/ov-button.stories.ts`

---

## Rules

- Never invent props or slots that aren't in the skill file — stories are documentation, not exploration.
- The `Default` story must be fully args-driven so Storybook controls work.
- `States` should show all relevant booleans (`disabled`, `loading`, `invalid`, `checked`, etc.) together in one story.
- `Real-world` stories use realistic data and demonstrate the component in context (inside a form, card, nav bar, etc.).
