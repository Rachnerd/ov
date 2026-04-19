import { LitElement, html, css, type TemplateResult, type CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { SelectionChangeDetail } from '../../tokens.js';

/**
 * Shared visual language for the three selection controls.
 * Kept as a CSSResult so consumers can stack it with their own styles.
 */
const selectionBase: CSSResult = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--ov-space-2);
    cursor: pointer;
    user-select: none;
    font-size: var(--ov-fs-sm);
    color: var(--color-text-primary);
  }
  :host([disabled]) { cursor: not-allowed; opacity: 0.5; }

  input {
    position: absolute;
    opacity: 0;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  label {
    display: inline-flex;
    align-items: center;
    gap: var(--ov-space-3);
    cursor: inherit;
  }
  input:focus-visible + .control,
  input:focus-visible + .track {
    box-shadow: var(--shadow-focus);
  }
`;

function dispatchSelectionChange(
  el: LitElement,
  detail: SelectionChangeDetail,
): void {
  el.dispatchEvent(new CustomEvent<SelectionChangeDetail>('change', {
    detail, bubbles: true, composed: true,
  }));
}


/**
 * @element ov-checkbox
 * @fires {CustomEvent<SelectionChangeDetail>} change
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
        border-radius: var(--ov-radius-xs);
        background: var(--color-control-bg);
        border: 1.5px solid var(--color-control-border);
        display: inline-flex;
        align-items: center;
        justify-content: center;
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


/**
 * @element ov-radio
 *
 * Groups by shared `name`. Clicking one unchecks its siblings in the same
 * root (document or shadow root).
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
        border-radius: 50%;
        background: var(--color-control-bg);
        border: 1.5px solid var(--color-control-border);
        display: inline-flex;
        align-items: center;
        justify-content: center;
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


/**
 * @element ov-switch
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
        width: 34px; height: 20px;
        border-radius: var(--ov-radius-pill);
        background: var(--color-control-border);
        transition: background-color var(--ov-duration-base) var(--ov-ease-out);
        flex: 0 0 auto;
      }
      .thumb {
        position: absolute;
        top: 2px; left: 2px;
        width: 16px; height: 16px;
        border-radius: 50%;
        background: var(--ov-white);
        box-shadow: var(--shadow-sm);
        transition: transform var(--ov-duration-base) var(--ov-ease-spring);
      }
      :host([checked]) .track { background: var(--color-brand); }
      :host([checked]) .thumb { transform: translateX(14px); }
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
    'ov-checkbox': OvCheckbox;
    'ov-radio':    OvRadio;
    'ov-switch':   OvSwitch;
  }
}
