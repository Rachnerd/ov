import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { TextareaResize, InputChangeDetail } from '../../tokens.js';

/**
 * <ov-textarea>
 *
 * @element ov-textarea
 * @fires {CustomEvent<InputChangeDetail>} input
 */
@customElement('ov-textarea')
export class OvTextarea extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) name = '';
  @property({ type: Number }) rows = 4;

  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) invalid = false;

  @property({ type: String, reflect: true }) resize: TextareaResize =
    'vertical';

  @query('textarea') private _textarea!: HTMLTextAreaElement;

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      textarea {
        width: 100%;
        font: inherit;
        font-size: var(--ov-fs-sm);
        color: var(--color-text-primary);
        background: var(--color-control-bg);
        border: var(--ov-border-thin, 1px) solid var(--color-control-border);
        border-radius: var(--ov-radius-md);
        padding: var(--ov-space-3) var(--ov-space-4);
        line-height: var(--ov-lh-normal);
        outline: 0;
        transition:
          border-color var(--ov-duration-fast) var(--ov-ease-out),
          background-color var(--ov-duration-fast) var(--ov-ease-out),
          box-shadow var(--ov-duration-fast) var(--ov-ease-out);
      }
      textarea::placeholder {
        color: var(--color-text-muted);
      }
      textarea:hover:not(:disabled) {
        border-color: var(--color-control-border-hover);
      }
      textarea:focus-visible {
        border-color: var(--color-border-focus);
        box-shadow: var(--shadow-focus);
      }
      textarea:disabled {
        background: var(--color-control-bg-disabled);
        color: var(--color-text-muted);
        cursor: not-allowed;
      }

      :host([invalid]) textarea {
        border-color: var(--color-danger);
      }
      :host([invalid]) textarea:focus-visible {
        box-shadow: 0 0 0 3px var(--color-danger-bg);
      }

      :host([resize='none']) textarea {
        resize: none;
      }
      :host([resize='horizontal']) textarea {
        resize: horizontal;
      }
      :host([resize='both']) textarea {
        resize: both;
      }
      textarea {
        resize: vertical;
      }
    `,
  ];

  private _onInput(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
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

  override focus(options?: FocusOptions): void {
    this._textarea?.focus(options);
  }

  protected override render(): TemplateResult {
    return html`
      <textarea
        .value=${this.value}
        name=${this.name}
        rows=${this.rows}
        placeholder=${this.placeholder}
        ?required=${this.required}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        @input=${this._onInput}
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-textarea': OvTextarea;
  }
}
