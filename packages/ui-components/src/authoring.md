# Component Authoring

Apply this whenever you **create a component**, **modify a component**, or **write markup** using `ov-*` elements.

---

## 1. Before writing anything

1. Identify the tier (§2).
2. Read the skill file for every `ov-*` element involved — never rely on memory for props, slots, or variants.
3. Skim `packages/style/tokens.md` before writing any CSS.

---

## 2. Atomic design hierarchy

| Tier         | Folder                  | Rule                                                                                                                |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Atom**     | `src/atoms/<name>/`     | Single HTML element or tightly coupled pair. No `ov-*` children.                                                    |
| **Molecule** | `src/molecules/<name>/` | Composes 2–5 atoms. Adds behaviour (validation, keyboard nav).                                                      |
| **Organism** | `src/organisms/<name>/` | Section-level UI. Must compose existing atoms/molecules. Hand-roll HTML only for layout scaffolding no atom covers. |
| **Template** | `src/templates/<name>/` | Full page skeleton. Slots only — no UI content of its own.                                                          |

**New UI decision flow:**

```
Does a fitting ov-* element exist?
├─ YES → use it; never duplicate its styling in a higher tier
└─ NO  → does it belong at atom or molecule level?
          ├─ YES → create it first, then compose it up
          └─ NO  → hand-roll inside the organism, keep it minimal
```

---

## 3. Composition rules

- **Import atoms/molecules** via side-effect imports: `import '../../atoms/…/ov-…js'` — never copy their CSS.
- **Dark/inverse contexts** → override CSS custom properties on the host or a parent selector. Never fork atom internals.
- **Never hand-roll** `<button>`, `<a>`, `<input>`, etc. inside an organism if a suitable `ov-*` exists.
- **`ov-heading`** for all headings — never `ov-text` for heading-level content.
- **`ov-field`** wraps every label+control pair — never a bare `ov-label` next to a control.

---

## 4. CSS — mandatory token usage

**No raw hex, px, or string literals anywhere.** Every CSS value must resolve to a token or a local variable that wraps one.

### Decision flow for any CSS value

```
Does a token exist in packages/style/tokens.md?
├─ YES → use it: color: var(--color-brand)
└─ NO  → will this value be used in ≥ 2 components?
          ├─ YES → add it to primitives.css, document it in tokens.md, then use it
          └─ NO  → declare a local var on :host:
                    --ov-<component>-<property>: var(--ov-…);
```

**Local variable example:**

```css
:host {
  --ov-nav-bar-height: var(--ov-space-16);
  --ov-nav-bar-fg: var(--ov-white);
}
nav {
  min-height: var(--ov-nav-bar-height);
}
```

### Token tiers

| Tier      | Prefix                    | Use in UI?                                           |
| --------- | ------------------------- | ---------------------------------------------------- |
| Semantic  | `--color-*`, `--shadow-*` | **Yes — always prefer**                              |
| Primitive | `--ov-*`                  | Only in token definitions and local component tokens |
| Raw       | `#hex`, `px`, literal     | **Never**                                            |

### Token quick reference

| Need           | Token family                                                       |
| -------------- | ------------------------------------------------------------------ |
| Color          | `--color-text-*` `--color-bg-*` `--color-brand` `--color-border-*` |
| Space / size   | `--ov-space-1` … `--ov-space-32`                                   |
| Font size      | `--ov-fs-xs` … `--ov-fs-3xl`                                       |
| Font weight    | `--ov-fw-light` … `--ov-fw-bold`                                   |
| Line height    | `--ov-lh-none` `--ov-lh-tight` `--ov-lh-normal` `--ov-lh-relaxed`  |
| Letter spacing | `--ov-ls-tighter` … `--ov-ls-display`                              |
| Border width   | `--ov-border-thin` `--ov-border-base` `--ov-border-thick`          |
| Border radius  | `--ov-radius-xs` … `--ov-radius-pill`                              |
| Shadow         | `--shadow-xs` … `--shadow-xl` `--shadow-focus`                     |
| Z-index        | `--ov-z-base` … `--ov-z-tooltip`                                   |
| Motion         | `--ov-duration-*` `--ov-ease-*`                                    |

---

## 5. File structure

Every component requires exactly three files — no more, no fewer:

```
src/<tier>/<name>/
  ov-<name>.ts          Lit element class
  ov-<name>.md          Skill file (props · slots · events · examples · rules)
  ov-<name>.stories.ts  Storybook stories
```

Never create a component without all three. Never put two components in one file.

**After creating a new component, also update:**

- `packages/ui-components/CLAUDE.md` — add the skill file path
- `src/authoring.md` §6 — add the registry entry
- `.htmlvalidate.json` — add the element (single source of truth for attribute validation and IntelliSense)

---

## 6. Component registry

Add an entry here whenever a new component is created.

**Atoms** · `src/atoms/`

| Element       | Skill file                         |
| ------------- | ---------------------------------- |
| `ov-button`   | @src/atoms/button/ov-button.md     |
| `ov-badge`    | @src/atoms/badge/ov-badge.md       |
| `ov-icon`     | @src/atoms/icon/ov-icon.md         |
| `ov-spinner`  | @src/atoms/spinner/ov-spinner.md   |
| `ov-input`    | @src/atoms/input/ov-input.md       |
| `ov-textarea` | @src/atoms/textarea/ov-textarea.md |
| `ov-label`    | @src/atoms/label/ov-label.md       |
| `ov-link`     | @src/atoms/link/ov-link.md         |
| `ov-nav-link` | @src/atoms/nav-link/ov-nav-link.md |
| `ov-checkbox` | @src/atoms/checkbox/ov-checkbox.md |
| `ov-radio`    | @src/atoms/radio/ov-radio.md       |
| `ov-switch`   | @src/atoms/switch/ov-switch.md     |
| `ov-heading`  | @src/atoms/heading/ov-heading.md   |
| `ov-text`     | @src/atoms/text/ov-text.md         |
| `ov-avatar`   | @src/atoms/avatar/ov-avatar.md     |
| `ov-divider`  | @src/atoms/divider/ov-divider.md   |

**Molecules** · `src/molecules/`

| Element           | Skill file                                     |
| ----------------- | ---------------------------------------------- |
| `ov-field`        | @src/molecules/field/ov-field.md               |
| `ov-alert`        | @src/molecules/alert/ov-alert.md               |
| `ov-card`         | @src/molecules/card/ov-card.md                 |
| `ov-image-card`   | @src/molecules/image-card/ov-image-card.md     |
| `ov-breadcrumbs`  | @src/molecules/breadcrumbs/ov-breadcrumbs.md   |
| `ov-input-group`  | @src/molecules/input-group/ov-input-group.md   |
| `ov-tabs`         | @src/molecules/tabs/ov-tabs.md                 |
| `ov-menu-item`    | @src/molecules/menu-item/ov-menu-item.md       |
| `ov-stat`         | @src/molecules/stat/ov-stat.md                 |
| `ov-toast`        | @src/molecules/toast/ov-toast.md               |
| `ov-empty-state`  | @src/molecules/empty-state/ov-empty-state.md   |
| `ov-service-card` | @src/molecules/service-card/ov-service-card.md |

**Organisms** · `src/organisms/`

| Element               | Skill file                                             |
| --------------------- | ------------------------------------------------------ |
| `ov-nav-bar`          | @src/organisms/nav-bar/ov-nav-bar.md                   |
| `ov-hero`             | @src/organisms/hero/ov-hero.md                         |
| `ov-carousel`         | @src/organisms/carousel/ov-carousel.md                 |
| `ov-services-section` | @src/organisms/services-section/ov-services-section.md |

**Templates** · `src/templates/`

| Element          | Skill file                                   |
| ---------------- | -------------------------------------------- |
| `ov-page-layout` | @src/templates/page-layout/ov-page-layout.md |

---

## 7. Stories — keep in sync

After **any** change to a component's `.ts` source:

| What changed                            | Story action required                       |
| --------------------------------------- | ------------------------------------------- |
| New prop or variant                     | Add story or extend `argTypes` / `args`     |
| Removed prop or variant                 | Remove or update affected story             |
| New visible state                       | Add to `States` story                       |
| Pure CSS token swap (no visual change)  | No update needed                            |
| New child atom/molecule used internally | No update needed unless exposed API changed |

Required stories for every component: `Default` (args-driven) · one per major variant axis · `States` · one `Real-world: …`

---

## 8. API changes — mandatory side effects

When a component's **tag, attributes, or allowed attribute values** change:

1. Update `.htmlvalidate.json` at the repo root.
2. Update the component's `.md` skill file.
3. Update the component's `.stories.ts` (see §7).
4. Update `src/authoring.md` §6 if the element is new.
5. Update both `CLAUDE.md` files if the element is new.

---

## 9. Review checklist

Before marking any component work done, verify:

- [ ] No raw hex, px, or literal CSS values — all resolved to tokens or local vars
- [ ] No `ov-*` element used outside its documented props/slots/variants
- [ ] No hand-rolled HTML duplicating an existing atom or molecule
- [ ] `.htmlvalidate.json` updated if API changed
- [ ] `.stories.ts` updated if visible surface changed
- [ ] All three files present for any new component (`ts` + `md` + `stories.ts`)
- [ ] New global token (if added) documented in `packages/style/tokens.md`

---

## When in doubt

If a prop, slot, variant, or token isn't documented — **ask, don't invent**.
