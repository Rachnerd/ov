import { css, CSSResult } from 'lit';

/**
 * Base styles every OpenValue atom pulls in via `static styles`.
 *
 * Lit uses Shadow DOM, so global utility classes don't reach component
 * internals — but CSS custom properties DO pierce the boundary. That's
 * why the whole theming story rests on --color-* tokens defined in
 * openvalue.css: each atom just reads from them and re-themes for free
 * whenever an ancestor flips [data-theme].
 */
export const baseStyles: CSSResult = css`
  :host {
    box-sizing: border-box;
    font-family: var(--ov-font-primary,
      'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    color: var(--color-text-primary, #1D252D);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *, *::before, *::after { box-sizing: inherit; }

  @media (prefers-reduced-motion: reduce) {
    :host * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/** Shared focus-ring style — opt in by including in an atom's styles array. */
export const focusRing: CSSResult = css`
  :focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus, 0 0 0 3px rgba(61, 125, 201, 0.35));
  }
`;
