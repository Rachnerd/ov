/**
 * molecule-tokens.ts
 *
 * Type definitions for the molecule layer. Atoms import from tokens.ts;
 * molecules import from here (and re-use atom types where they compose them).
 */

/* ---------- Field ---------------------------------------------------------- */

/** The full set of validation states a field can be in. */
export type FieldStatus = 'idle' | 'success' | 'error' | 'warning';

/* ---------- Alert ---------------------------------------------------------- */

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

/* ---------- Card ----------------------------------------------------------- */

export type CardVariant = 'default' | 'brand' | 'inverse' | 'inverse-brand';

/* ---------- Tabs ----------------------------------------------------------- */

export interface TabItem {
  /** Unique key used as the value for the `change` event. */
  key: string;
  /** Visible label. */
  label: string;
  /** Optional badge number (e.g. unread count). */
  count?: number;
  /** Disabled state for a single tab. */
  disabled?: boolean;
}

export interface TabChangeDetail {
  key: string;
}

/* ---------- Breadcrumbs ---------------------------------------------------- */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/* ---------- Stat ----------------------------------------------------------- */

export type StatDelta = 'up' | 'down' | 'neutral';

/* ---------- Toast ---------------------------------------------------------- */

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastDismissDetail {
  id: string;
}

/* ---------- Menu item ------------------------------------------------------ */

/** One keyboard shortcut segment, e.g. "⌘" or "K". */
export type ShortcutKey = string;

/* ---------- Empty state ---------------------------------------------------- */

export type EmptyStateIconName = string;

/* ---------- Input group ---------------------------------------------------- */

export type InputGroupAttach = 'start' | 'end' | 'both';
