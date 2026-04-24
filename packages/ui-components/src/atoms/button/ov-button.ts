import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles, focusRing } from '../../shared-styles.js';
import type { ButtonVariant, ButtonSize, ButtonType } from '../../tokens.js';

/**
 * <ov-button>
 *
 * @element ov-button
 *
 * @slot       - Button label.
 * @slot start - Leading icon or element.
 * @slot end   - Trailing icon or element.
 *
 * @fires {MouseEvent} click - Standard click; suppressed while disabled or loading.
 *
 * @cssprop --color-brand         - Background (primary variant).
 * @cssprop --color-text-on-brand - Foreground (primary variant).
 */
@customElement('ov-button')
export class OvButton extends LitElement {
  /** Visual treatment. */
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'primary';

  /** Physical scale. */
  @property({ type: String, reflect: true }) size: ButtonSize = 'md';

  /** Native button type (for forms). */
  @property({ type: String }) type: ButtonType = 'button';

  /** When true, the button is non-interactive and styled dimmed. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Shows a spinner, preserves width, and blocks clicks. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** When true, stretches to 100% of parent width. */
  @property({ type: Boolean, reflect: true }) block = false;

  static override styles = [
    baseStyles,
    focusRing,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      :host([block]) {
        display: flex;
        width: 100%;
      }

      button {
        /* Variant-local tokens — overridden per variant below. */
        --btn-bg: var(--color-brand);
        --btn-bg-hover: var(--color-brand-hover);
        --btn-bg-active: var(--color-brand-active);
        --btn-fg: var(--color-text-on-brand);
        --btn-border: transparent;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--ov-space-2, 0.5rem);
        width: 100%;
        padding: var(--ov-space-3) var(--ov-space-5);
        font-family: inherit;
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-semibold, 600);
        letter-spacing: var(--ov-ls-wide, 0.04em);
        line-height: var(--ov-lh-none);
        color: var(--btn-fg);
        background: var(--btn-bg);
        border: var(--ov-border-base, 1.5px) solid var(--btn-border);
        border-radius: var(--ov-button-radius, var(--ov-radius-md, 8px));
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        position: relative;
        transition:
          background-color var(--ov-duration-fast) var(--ov-ease-out),
          border-color var(--ov-duration-fast) var(--ov-ease-out),
          color var(--ov-duration-fast) var(--ov-ease-out),
          transform var(--ov-duration-fast) var(--ov-ease-out),
          box-shadow var(--ov-duration-fast) var(--ov-ease-out);
      }
      button:hover:not(:disabled) {
        background: var(--btn-bg-hover);
      }
      button:active:not(:disabled) {
        background: var(--btn-bg-active);
        transform: translateY(1px);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      /* Variants */
      :host([variant='secondary']) button {
        --btn-bg: transparent;
        --btn-bg-hover: var(--color-brand-subtle);
        --btn-bg-active: var(--color-brand-muted);
        --btn-fg: var(--color-brand);
        --btn-border: var(--color-brand);
      }
      :host([variant='ghost']) button {
        --btn-bg: transparent;
        --btn-bg-hover: var(--color-bg-surface-muted);
        --btn-bg-active: var(--color-bg-surface-alt);
        --btn-fg: var(--color-text-primary);
      }
      :host([variant='inverse']) button {
        --btn-bg: var(--ov-white);
        --btn-bg-hover: var(--ov-neutral-100);
        --btn-bg-active: var(--ov-neutral-200);
        --btn-fg: var(--ov-neutral-800);
      }
      :host([variant='accent']) button {
        --btn-bg: var(--color-accent);
        --btn-bg-hover: var(--color-accent-hover);
        --btn-bg-active: var(--color-accent-active);
        --btn-fg: var(--color-accent-contrast);
      }
      :host([variant='danger']) button {
        --btn-bg: var(--color-danger);
        --btn-bg-hover: var(--ov-danger-700);
        --btn-bg-active: var(--ov-danger-700);
        --btn-fg: var(--ov-white);
      }

      /* Sizes */
      :host([size='sm']) button {
        padding: var(--ov-space-2) var(--ov-space-4);
        font-size: var(--ov-fs-xs);
      }
      :host([size='lg']) button {
        padding: var(--ov-space-4) var(--ov-space-6);
        font-size: var(--ov-fs-base);
      }

      /* Loading state */
      :host([loading]) .label,
      :host([loading]) ::slotted(*) {
        visibility: hidden;
      }
      .spinner {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .spinner svg {
        animation: spin 0.9s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      ::slotted(svg),
      ::slotted([slot='start']),
      ::slotted([slot='end']) {
        width: 1em;
        height: 1em;
        flex: 0 0 auto;
      }
    `,
  ];

  private _handleClick(e: MouseEvent): void {
    if (this.disabled || this.loading) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._handleClick}
      >
        <slot name="start"></slot>
        <span class="label"><slot></slot></span>
        <slot name="end"></slot>
        ${this.loading
          ? html`
              <span class="spinner" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    stroke-opacity="0.25"
                    stroke-width="2"
                  />
                  <path
                    d="M14 8a6 6 0 0 0-6-6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            `
          : null}
      </button>
    `;
  }
}

/**
 * Augment HTMLElementTagNameMap so `document.querySelector('ov-button')`
 * and Lit template bindings are typed as OvButton, not HTMLElement.
 */
declare global {
  interface HTMLElementTagNameMap {
    'ov-button': OvButton;
  }
}
