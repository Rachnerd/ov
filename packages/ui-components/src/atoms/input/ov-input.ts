import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type {
  InputType,
  ControlSize,
  InputChangeDetail,
} from '../../tokens.js';

/**
 * <ov-input>
 *
 * @element ov-input
 *
 * @slot prefix - Leading icon or element (search glyph, currency sign).
 * @slot suffix - Trailing icon or element (clear button, unit).
 *
 * @fires {CustomEvent<InputChangeDetail>} input  - On every keystroke.
 * @fires {CustomEvent<InputChangeDetail>} change - On commit (blur / Enter).
 */
@customElement('ov-input')
export class OvInput extends LitElement {
  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) name = '';
  @property({ type: String }) autocomplete = 'off';

  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) invalid = false;

  @property({ type: String, reflect: true }) size: ControlSize = 'md';

  @query('input') private _input!: HTMLInputElement;

  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        width: 100%;
      }

      .wrap {
        display: inline-flex;
        align-items: center;
        gap: var(--ov-space-2);
        width: 100%;
        background: var(--color-control-bg);
        border: var(--ov-border-thin, 1px) solid var(--color-control-border);
        border-radius: var(--ov-input-radius, var(--ov-radius-md));
        padding: 0 var(--ov-space-4);
        transition:
          border-color var(--ov-duration-fast) var(--ov-ease-out),
          background-color var(--ov-duration-fast) var(--ov-ease-out),
          box-shadow var(--ov-duration-fast) var(--ov-ease-out);
      }
      .wrap:hover {
        border-color: var(--color-control-border-hover);
      }
      .wrap:focus-within {
        border-color: var(--color-border-focus);
        box-shadow: var(--shadow-focus);
      }
      :host([invalid]) .wrap {
        border-color: var(--color-danger);
      }
      :host([invalid]) .wrap:focus-within {
        box-shadow: 0 0 0 3px var(--color-danger-bg);
      }
      :host([disabled]) .wrap {
        background: var(--color-control-bg-disabled);
        cursor: not-allowed;
      }

      input {
        flex: 1 1 auto;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        padding: var(--ov-space-3) 0;
        font: inherit;
        font-size: var(--ov-fs-sm);
        color: var(--color-text-primary);
      }
      input::placeholder {
        color: var(--color-text-muted);
      }
      input:disabled {
        cursor: not-allowed;
        color: var(--color-text-muted);
      }

      :host([size='sm']) input {
        padding: var(--ov-space-2) 0;
        font-size: var(--ov-fs-xs);
      }
      :host([size='lg']) input {
        padding: var(--ov-space-4) 0;
        font-size: var(--ov-fs-base);
      }

      ::slotted([slot='prefix']),
      ::slotted([slot='suffix']) {
        display: inline-flex;
        align-items: center;
        color: var(--color-text-tertiary);
        flex: 0 0 auto;
      }
    `,
  ];

  private _onInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    const detail: InputChangeDetail = { value: this.value };
    this.dispatchEvent(
      new CustomEvent<InputChangeDetail>('input', {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    const detail: InputChangeDetail = { value: target.value };
    this.dispatchEvent(
      new CustomEvent<InputChangeDetail>('change', {
        detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** Forward focus to the internal input so .focus() on the host works. */
  override focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="wrap" part="wrap">
        <slot name="prefix"></slot>
        <input
          .type=${this.type}
          .value=${this.value}
          name=${this.name}
          placeholder=${this.placeholder}
          autocomplete=${this.autocomplete}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          @input=${this._onInput}
          @change=${this._onChange}
        />
        <slot name="suffix"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-input': OvInput;
  }
}
