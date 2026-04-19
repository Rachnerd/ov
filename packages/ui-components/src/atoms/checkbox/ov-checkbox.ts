import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import { selectionBase, dispatchSelectionChange } from '../selection-shared.js';

/**
 * @element ov-checkbox
 * @fires {CustomEvent<{ checked: boolean, value: string }>} change
 */
@customElement('ov-checkbox')
export class OvCheckbox extends LitElement {
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String, reflect: true }) name = '';
  @property({ type: String }) value = 'on';

  static override styles = [
    baseStyles,
    selectionBase,
    css`
      .control {
        width: 16px; height: 16px;
        margin-top: 3px;
        border-radius: var(--ov-radius-xs);
        background: var(--color-control-bg);
        border: 1.5px solid var(--color-control-border);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        transition:
          background-color var(--ov-duration-fast) var(--ov-ease-out),
          border-color     var(--ov-duration-fast) var(--ov-ease-out);
      }
      :host(:hover:not([disabled])) .control { border-color: var(--color-control-border-hover); }
      :host([checked]) .control, :host([indeterminate]) .control {
        background: var(--color-brand);
        border-color: var(--color-brand);
      }
      .check {
        width: 12px; height: 12px;
        color: var(--color-text-on-brand);
        opacity: 0;
        transition: opacity var(--ov-duration-fast) var(--ov-ease-out);
      }
      :host([checked]) .check { opacity: 1; }
      .dash {
        width: 9px; height: 2px;
        background: var(--color-text-on-brand);
        border-radius: 1px;
        display: none;
      }
      :host([indeterminate]) .dash  { display: block; }
      :host([indeterminate]) .check { display: none; }
    `,
  ];

  protected override updated(): void {
    const input = this.renderRoot.querySelector<HTMLInputElement>('input');
    if (input) input.indeterminate = this.indeterminate;
  }

  private _onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;
    dispatchSelectionChange(this, { checked: this.checked, value: this.value });
  }

  protected override render(): TemplateResult {
    return html`
      <label>
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name}
          .value=${this.value}
          @change=${this._onChange}
        />
        <span class="control" aria-hidden="true">
          <svg class="check" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3 3 6-6" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="dash"></span>
        </span>
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-checkbox': OvCheckbox;
  }
}
