import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { AlertVariant } from '../../molecule-tokens.js';

/** Maps each variant to an inline SVG path — avoids an ov-icon dep loop. */
const ALERT_ICONS: Record<AlertVariant, TemplateResult> = {
  info: html`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 7v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="5.2" r="0.9" fill="currentColor"/>`,
  success: html`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  warning: html`<path d="M8 2.5l6 10.5H2L8 2.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/><path d="M8 6.5v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.5" r="0.8" fill="currentColor"/>`,
  danger: html`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
};

/**
 * <ov-alert>
 *
 * Contextual feedback message. Composes an icon, title, body copy, and an
 * optional dismiss button into one cohesive unit.
 *
 * @element ov-alert
 *
 * @slot         - Alert body copy.
 * @slot title   - Custom title markup; overrides the `title` property.
 * @slot actions - Optional call-to-action links or buttons below the body.
 *
 * @fires {CustomEvent<void>} dismiss - When the user clicks the ✕ button.
 *
 * @cssprop --ov-alert-radius - Border radius override.
 */
@customElement('ov-alert')
export class OvAlert extends LitElement {
  @property({ type: String, reflect: true }) variant: AlertVariant = 'info';

  /** Main title text. */
  @property({ type: String }) override title = '';

  /** When true a ✕ button appears and `dismiss` event fires on click. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  /** Controls visibility; toggled by dismiss interaction. */
  @state() private _visible = true;

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }
      :host(:not([dismissible])) .dismiss { display: none; }

      .alert {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto auto auto;
        column-gap: var(--ov-space-3);
        row-gap: var(--ov-space-1);
        padding: var(--ov-space-4) var(--ov-space-5);
        border-radius: var(--ov-alert-radius, var(--ov-radius-md));
        border-left: 3px solid var(--_accent);
        background: var(--_bg);
        color: var(--_fg);

        /* default = info */
        --_bg:     var(--color-info-bg);
        --_fg:     var(--color-info-text);
        --_accent: var(--color-info);
      }

      :host([variant='success']) .alert {
        --_bg:     var(--color-success-bg);
        --_fg:     var(--color-success-text);
        --_accent: var(--color-success);
      }
      :host([variant='warning']) .alert {
        --_bg:     var(--color-warning-bg);
        --_fg:     var(--color-warning-text);
        --_accent: var(--color-warning);
      }
      :host([variant='danger']) .alert {
        --_bg:     var(--color-danger-bg);
        --_fg:     var(--color-danger-text);
        --_accent: var(--color-danger);
      }

      .icon {
        grid-column: 1;
        grid-row: 1 / 4;
        width: 18px; height: 18px;
        align-self: start;
        margin-top: 1px;
        flex: 0 0 auto;
      }
      .icon svg { width: 100%; height: 100%; display: block; }

      .title-slot {
        grid-column: 2;
        grid-row: 1;
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-semibold);
        line-height: 1.3;
      }
      /* Hide the title row entirely if there's no title content */
      .title-slot:empty { display: none; }

      .body-slot {
        grid-column: 2;
        grid-row: 2;
        font-size: var(--ov-fs-sm);
        line-height: var(--ov-lh-normal);
      }

      .actions-slot {
        grid-column: 2;
        grid-row: 3;
        display: flex;
        gap: var(--ov-space-3);
        align-items: center;
        margin-top: var(--ov-space-2);
      }
      .actions-slot:empty { display: none; }

      .dismiss {
        grid-column: 3;
        grid-row: 1;
        background: none;
        border: 0;
        padding: 0;
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        line-height: 0;
        transition: opacity var(--ov-duration-fast) var(--ov-ease-out);
        border-radius: var(--ov-radius-xs);
        align-self: start;
      }
      .dismiss:hover { opacity: 1; }
      .dismiss:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
      }

      :host(:not([visible])) { display: none; }
    `,
  ];

  private _dismiss(): void {
    this._visible = false;
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._visible) return nothing;
    return html`
      <div class="alert" role="alert" part="alert">
        <div class="icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">${ALERT_ICONS[this.variant]}</svg>
        </div>

        <div class="title-slot">
          <slot name="title">${this.title}</slot>
        </div>

        <div class="body-slot">
          <slot></slot>
        </div>

        <div class="actions-slot">
          <slot name="actions"></slot>
        </div>

        <button
          class="dismiss"
          aria-label="Dismiss"
          @click=${this._dismiss}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-alert': OvAlert;
  }
}
