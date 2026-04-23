/**
 * tokens.ts
 *
 * Central type definitions that mirror the semantic design-system tokens
 * declared in openvalue.css. Every atom imports its string-literal unions
 * from here, so there is exactly one place to add a new variant or size
 * and have TypeScript enforce it everywhere.
 *
 * The general convention:
 *   - *Variant  → semantic colour / intent (brand, accent, danger…)
 *   - *Size     → physical scale (sm, md, lg…)
 *   - *Tone     → text-colour intent used on typography atoms
 *   - *Appearance → rendering style where multiple looks share a variant
 *                   (soft vs solid vs outline for badges, etc.)
 */

/* ---------- Theme ---------------------------------------------------------- */

/** Values accepted by the `data-theme` attribute. */
export type ThemeName = 'light' | 'dark';

/* ---------- Buttons -------------------------------------------------------- */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'inverse'
  | 'accent'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/* ---------- Inputs --------------------------------------------------------- */

/** The subset of <input type="..."> values the design system supports. */
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

export type ControlSize = 'sm' | 'md' | 'lg';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/* ---------- Typography ----------------------------------------------------- */

/** Heading levels allowed in the outline. Numeric literal union. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual size independent of semantic level. */
export type HeadingSize =
  | ''                    // '' = derive from level
  | 'display-1'
  | 'display-2'
  | 'h1' | 'h2' | 'h3' | 'h4';

export type Tone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'muted'
  | 'brand'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'inverse';

/** A narrower tone set — only the ones that make sense on a heading. */
export type HeadingTone =
  | 'primary' | 'secondary' | 'brand' | 'accent' | 'inverse';

export type TextVariant =
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'lead'
  | 'eyebrow'
  | 'code';

export type FontWeight =
  | ''                    // '' = use the variant's default weight
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

/** Semantic elements supported by <ov-text as="…">. */
export type TextTag = 'span' | 'p' | 'div' | 'small' | 'strong' | 'em';

/* ---------- Badges --------------------------------------------------------- */

export type BadgeVariant =
  | 'default'
  | 'brand'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BadgeAppearance = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';

/* ---------- Icons ---------------------------------------------------------- */

/**
 * Keys for the built-in icon sprite. Kept as a readonly tuple so we can
 * derive the literal union and also ship the runtime list if needed.
 */
export const BUILT_IN_ICON_NAMES = [
  'check', 'x', 'arrow-right', 'arrow-left', 'search', 'mail',
  'info', 'warning', 'sun', 'moon', 'plus', 'user', 'menu',
] as const;

export type BuiltInIconName = typeof BUILT_IN_ICON_NAMES[number];

/** A user may pass '' to indicate "no built-in, use slotted SVG". */
export type IconName = BuiltInIconName | '';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type SpinnerTone = 'brand' | 'neutral' | 'inverse';

/* ---------- Avatar / Divider ---------------------------------------------- */

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarTone = 'brand' | 'accent' | 'neutral';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'subtle' | 'default' | 'strong';

/* ---------- Link ----------------------------------------------------------- */

export type LinkVariant = 'default' | 'subtle' | 'brand' | 'inverse';
export type LinkUnderline = 'always' | 'hover' | 'none';

/* ---------- Custom-event detail types ------------------------------------- */

/** Emitted by <ov-input> and <ov-textarea> on input/change. */
export interface InputChangeDetail {
  value: string;
}

/** Emitted by <ov-checkbox>, <ov-radio>, <ov-switch>. */
export interface SelectionChangeDetail {
  checked: boolean;
  value: string;
}
