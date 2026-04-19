import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import { selectionBase, dispatchSelectionChange } from '../selection-shared.js';

/**
 * @element ov-radio
 * @fires {CustomEvent<{ checked: true, value: string }>} change
 */
@customElement('ov-radio')
export class OvRadio extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) name = '';
  @property({ type: String }) value = '';

  static override styles = [
    baseStyles,
    selectionBase,
    css`
      .control {
        width: 16px; height: 16px;
        margin-top: 2px;
        border-radius: 50%;
        background: var(--color-control-bg);
        border: 1.5px solid var(--color-control-border);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        transition: border-color var(--ov-duration-fast) var(--ov-ease-out);
      }
      :host(:hover:not([disabled])) .control { border-color: var(--color-control-border-hover); }
      :host([checked]) .control { border-color: var(--color-brand); }
      .dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--color-brand);
        transform: scale(0);
        transition: transform var(--ov-duration-fast) var(--ov-ease-spring);
      }
      :host([checked]) .dot { transform: scale(1); }
    `,
  ];

  private _onChange(): void {
    if (this.name) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const siblings = root.querySelectorAll<OvRadio>(`ov-radio[name="${this.name}"]`);
      siblings.forEach((r) => { if (r !== this) r.checked = false; });
    }
    this.checked = true;
    dispatchSelectionChange(this, { checked: true, value: this.value });
  }

  protected override render(): TemplateResult {
    return html`
      <label>
        <input
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          .value=${this.value}
          @change=${this._onChange}
        />
        <span class="control" aria-hidden="true">
          <span class="dot"></span>
        </span>
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-radio': OvRadio;
  }
}
