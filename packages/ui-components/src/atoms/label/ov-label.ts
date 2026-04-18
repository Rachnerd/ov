import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { ControlSize } from '../../tokens.js';

/**
 * <ov-label>
 *
 * @element ov-label
 *
 * @slot      - Label text.
 * @slot hint - Optional helper text shown beside the label.
 */
@customElement('ov-label')
export class OvLabel extends LitElement {
  /** id of the associated form control. Mirrors <label for="…">. */
  @property({ type: String, attribute: 'for' }) htmlFor = '';

  @property({ type: Boolean, reflect: true }) required = false;

  /** Narrower than ControlSize — labels only need two sizes. */
  @property({ type: String, reflect: true }) size: Extract<ControlSize, 'sm' | 'md'> = 'md';

  static override styles = [
    baseStyles,
    css`
      :host { display: inline-flex; }
      label {
        display: inline-flex;
        align-items: baseline;
        gap: var(--ov-space-2);
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-medium, 500);
        letter-spacing: var(--ov-ls-wide, 0.04em);
        color: var(--color-text-primary);
        cursor: pointer;
      }
      :host([size='sm']) label { font-size: var(--ov-fs-xs); }
      .required {
        color: var(--color-danger);
        font-weight: var(--ov-fw-regular, 400);
        margin-left: 1px;
      }
      ::slotted([slot='hint']) {
        font-weight: var(--ov-fw-regular, 400);
        font-size: var(--ov-fs-xs);
        color: var(--color-text-tertiary);
        letter-spacing: 0;
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <label for=${this.htmlFor}>
        <slot></slot>
        ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : null}
        <slot name="hint"></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-label': OvLabel;
  }
}
