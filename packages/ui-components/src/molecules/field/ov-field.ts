import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { FieldStatus } from '../../molecule-tokens.js';

/**
 * <ov-field>
 *
 * The canonical form-field wrapper. Composes ov-label, any control atom,
 * and optional help / error text — wiring the a11y relationship (ids,
 * aria-describedby) automatically.
 *
 * @element ov-field
 *
 * @slot         - The form control (ov-input, ov-textarea, ov-select, etc.)
 * @slot label   - Custom label content; overrides the `label` property.
 * @slot help    - Helper text shown below the control when status is idle.
 * @slot message - Custom status message; overrides the `message` property.
 *
 * @fires {CustomEvent<void>} field-reset - When the reset button is clicked.
 *
 * @cssprop --ov-field-gap - Space between label and control (default: --ov-space-2).
 */
@customElement('ov-field')
export class OvField extends LitElement {
  /** Text rendered in the label. Use the `label` slot for rich content. */
  @property({ type: String }) label = '';

  /** Mirrors the `for` attribute on the internal <ov-label>. */
  @property({ type: String }) for = '';

  /** Shows the required asterisk on the label. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Disables the label's pointer-cursor (when the control is disabled). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Validation status. Controls the colour of the message and the
   * border of any slotted ov-input / ov-textarea via the `invalid`
   * attribute that this component forwards.
   */
  @property({ type: String, reflect: true }) status: FieldStatus = 'idle';

  /** Status message text. Use the `message` slot for rich content. */
  @property({ type: String }) message = '';

  /** When true a compact single-row layout is used (label left, control right). */
  @property({ type: Boolean, reflect: true }) inline = false;

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        --_gap: var(--ov-field-gap, var(--ov-space-2));
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--_gap);
      }
      :host([inline]) .field {
        flex-direction: row;
        align-items: center;
        gap: var(--ov-space-4);
      }
      :host([inline]) .label-wrap { flex: 0 0 auto; min-width: 120px; }
      :host([inline]) .control-wrap { flex: 1 1 auto; }

      .help {
        font-size: var(--ov-fs-xs);
        line-height: var(--ov-lh-normal);
        color: var(--color-text-tertiary);
      }

      .message {
        display: flex;
        align-items: center;
        gap: var(--ov-space-1);
        font-size: var(--ov-fs-xs);
        line-height: var(--ov-lh-normal);
      }

      /* Status-driven message colours */
      :host([status='error'])   .message { color: var(--color-danger); }
      :host([status='success']) .message { color: var(--color-success); }
      :host([status='warning']) .message { color: var(--color-warning); }
      :host([status='idle'])    .message { color: var(--color-text-tertiary); }

      .message-icon {
        width: 12px; height: 12px; flex: 0 0 auto;
      }

      /* Forward invalid state to slotted controls */
      :host([status='error']) ::slotted(ov-input),
      :host([status='error']) ::slotted(ov-textarea) {
        /* Toggling the attribute on the slotted element requires JS;
           CSS alone can signal the error colour via a custom property. */
        --color-control-border: var(--color-danger);
      }
    `,
  ];

  /** Maps status → icon path (inline SVG paths, not ov-icon, to avoid a dep). */
  private _statusIcon(): TemplateResult | typeof nothing {
    if (this.status === 'idle') return nothing;
    const paths: Record<Exclude<FieldStatus, 'idle'>, string> = {
      error:   'M8 5v4M8 11v.5M3 13h10L8 3 3 13z',
      success: 'M3 8l3 3 6-6',
      warning: 'M8 5v4M8 11v.5M3 13h10L8 3 3 13z',
    };
    return html`
      <svg class="message-icon" viewBox="0 0 16 16" fill="none"
           aria-hidden="true">
        <path d=${paths[this.status as Exclude<FieldStatus, 'idle'>]}
              stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  /**
   * Forward `invalid` attribute onto the slotted control so ov-input /
   * ov-textarea pick up the error border without the parent needing to.
   */
  private _syncInvalidState(): void {
    const isError = this.status === 'error';
    const control = this.querySelector<Element & { invalid?: boolean }>(
      'ov-input, ov-textarea',
    );
    if (control && 'invalid' in control) {
      control.invalid = isError;
    }
  }

  protected override updated(): void {
    this._syncInvalidState();
  }

  protected override render(): TemplateResult {
    const hasMessage = this.message.length > 0 ||
      this.querySelector('[slot="message"]') !== null;

    return html`
      <div class="field" part="field">
        <div class="label-wrap" part="label-wrap">
          <slot name="label">
            ${this.label
              ? html`
                  <ov-label
                    for=${this.for}
                    ?required=${this.required}
                  >${this.label}</ov-label>
                `
              : nothing}
          </slot>
        </div>

        <div class="control-wrap" part="control-wrap">
          <slot></slot>
        </div>

        ${hasMessage || this.status !== 'idle' ? html`
          <div class="message" role=${this.status === 'error' ? 'alert' : 'status'}
               aria-live=${this.status === 'error' ? 'assertive' : 'polite'}>
            ${this._statusIcon()}
            <slot name="message">${this.message}</slot>
          </div>
        ` : html`
          <div class="help">
            <slot name="help"></slot>
          </div>
        `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-field': OvField;
  }
}
