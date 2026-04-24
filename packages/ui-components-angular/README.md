# @ov/ui-components-angular

Angular wrapper library for the OpenValue design system. Provides a thin Angular component for each `ov-*` Lit web component, following the same secondary entry point pattern as Angular Material — import only what you use, no barrel file.

## Importing

Each component is a separate secondary entry point:

```ts
import { OvButtonComponent } from '@ov/ui-components-angular/atoms/button';
import { OvBadgeComponent } from '@ov/ui-components-angular/atoms/badge';
import { OvIconComponent } from '@ov/ui-components-angular/atoms/icon';
import { OvInputComponent } from '@ov/ui-components-angular/atoms/input';
import { OvTextareaComponent } from '@ov/ui-components-angular/atoms/textarea';
import { OvCheckboxComponent } from '@ov/ui-components-angular/atoms/checkbox';
import { OvRadioComponent } from '@ov/ui-components-angular/atoms/radio';
import { OvSwitchComponent } from '@ov/ui-components-angular/atoms/switch';
import { OvHeadingComponent } from '@ov/ui-components-angular/atoms/heading';
import { OvTextComponent } from '@ov/ui-components-angular/atoms/text';
import { OvAvatarComponent } from '@ov/ui-components-angular/atoms/avatar';
import { OvLinkComponent } from '@ov/ui-components-angular/atoms/link';
import { OvFieldComponent } from '@ov/ui-components-angular/molecules/field';
import { OvAlertComponent } from '@ov/ui-components-angular/molecules/alert';
import { OvCardComponent } from '@ov/ui-components-angular/molecules/card';
import { OvTabsComponent } from '@ov/ui-components-angular/molecules/tabs';
import { OvNavBarComponent } from '@ov/ui-components-angular/organisms/nav-bar';
import { OvHeroComponent } from '@ov/ui-components-angular/organisms/hero';
import { OvCarouselComponent } from '@ov/ui-components-angular/organisms/carousel';
import { OvPageLayoutComponent } from '@ov/ui-components-angular/templates/page-layout';
```

## Angular API conventions

The wrapper props mirror the Lit component props exactly, with two naming differences:

| Lit                                             | Angular                                         |
| ----------------------------------------------- | ----------------------------------------------- |
| `[brand]="value"` — string/number/boolean props | `@Input()` binding, same name                   |
| `(change)` — DOM custom event                   | `@Output() changeEvent` — name + `Event` suffix |

```html
<!-- Lit -->
<ov-tabs
  .tabs="${tabs}"
  active="overview"
  (change)="onTabChange($event)"
></ov-tabs>

<!-- Angular -->
<ov-tabs
  [tabs]="tabs"
  active="overview"
  (changeEvent)="onTabChange($event)"
></ov-tabs>
```

Slots are passed as child elements in the Angular template exactly as in plain HTML — no change needed.

## Scripts

```bash
# Regenerate all wrapper components from packages/ui-components/custom-elements.json
npm run generate

# Build the Angular library (runs generate first, then ng-packagr)
npm run build

# Run unit tests
npm test
```

## How it works

`scripts/generate-wrappers.mjs` reads `packages/ui-components/custom-elements.json` (the Custom Elements Manifest produced by `npm run analyze` in `ui-components`) and emits one Angular component per `ov-*` element.

Each generated component lives in its own subdirectory, which becomes a separate ng-packagr secondary entry point:

```
atoms/button/
  ov-button.ts        Angular @Component class
  public-api.ts       export * from './ov-button'
  ng-package.json     ng-packagr secondary entry config
```

Utility helpers (`applyProps`, `listen`) live in `src/utils.ts` — the primary entry. Generated wrappers import them as `from '@ov/ui-components-angular'` so ng-packagr's `rootDir` constraint is satisfied.

## Build output

After `npm run build`, `dist/` contains:

- `dist/fesm2022/ov-ui-components-angular.mjs` — primary entry (utils)
- `dist/fesm2022/ov-ui-components-angular-atoms-button.mjs` — per-component bundles
- `dist/atoms/button/index.d.ts` — type declarations for each entry

The `package.json` `exports` map wires TypeScript to the right declarations for each `@ov/ui-components-angular/atoms/*` import in workspace consumers.

## Regenerating after component changes

When `packages/ui-components` gains a new component or changes a component's API:

1. In `packages/ui-components`: run `npm run analyze` to update `custom-elements.json`
2. In `packages/ui-components-angular`: run `npm run generate` to regenerate wrappers
3. Run `npm run build` to compile the updated library
