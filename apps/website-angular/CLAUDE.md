# website-angular

Angular application consuming the OpenValue design system.

## Components

This app uses Angular wrapper components from `@ov/ui-components-angular` (e.g. `OvButtonComponent`, `OvNavBarComponent`). These are thin wrappers around the Lit web components in `packages/ui-components`.

**The Angular wrappers have identical props, slots, and events to the underlying Lit components.** To understand any `ov-*` component — its inputs, outputs, slots, and valid attribute values — read the skill file in `packages/ui-components`:

@packages/ui-components/CLAUDE.md

The only Angular-specific differences are naming conventions:

- Props become `@Input()` bindings: `[brand]="value"`, `[items]="navItems"`
- Events become `@Output()` bindings with an `Event` suffix: `(changeEvent)="onTabChange($event)"`, `(dismissEvent)="onDismiss($event)"`
- Slots are passed as child elements in the template as normal

## Styling rules

**Never add CSS to `src/styles.css`.**

`src/styles.css` is the global stylesheet. It must only contain `@import` statements (currently just `@import '@ov/style'`). It is not a place for page or component styles.

All component and page styles belong in the component's own `.css` file (e.g. `home.component.css`). Angular's view encapsulation scopes these automatically.

If a style truly needs to be global (e.g. a CSS custom property override that affects the whole app), add it to the design-system tokens in `packages/style` instead.
