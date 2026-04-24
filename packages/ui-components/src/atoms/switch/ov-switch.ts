import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import { selectionBase, dispatchSelectionChange } from '../selection-shared.js';

/**
 * @element ov-switch
 * @fires {CustomEvent<{ checked: boolean, value: string }>} change
 */
@customElement('ov-switch')
export class OvSwitch extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, reflect: true }) name = '';
  @property({ type: String }) value = 'on';

  static override styles = [
    baseStyles,
    selectionBase,
    css`
      .track {
        position: relative;
        width: 34px;
        height: 20px;
        margin-top: 1px;
        border-radius: var(--ov-radius-pill);
        background: var(--color-control-border);
        transition: background-color var(--ov-duration-base) var(--ov-ease-out);
        flex: 0 0 auto;
      }
      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--ov-white);
        box-shadow: var(--shadow-sm);
        transition: transform var(--ov-duration-base) var(--ov-ease-spring);
      }
      :host([checked]) .track {
        background: var(--color-brand);
      }
      :host([checked]) .thumb {
        transform: translateX(14px);
      }
    `,
  ];

  private _onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    dispatchSelectionChange(this, { checked: this.checked, value: this.value });
  }

  protected override render(): TemplateResult {
    return html`
      <label>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          .value=${this.value}
          @change=${this._onChange}
        />
        <span class="track" aria-hidden="true">
          <span class="thumb"></span>
        </span>
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-switch': OvSwitch;
  }
}
