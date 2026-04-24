import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { ToastVariant, ToastDismissDetail } from '../../molecule-tokens.js';

/**
 * @element ov-toast
 * @fires {CustomEvent<ToastDismissDetail>} dismiss
 */
@customElement('ov-toast')
export class OvToast extends LitElement {
  @property({ type: String, attribute: 'toast-id' }) toastId = '';
  @property({ type: String, reflect: true }) variant: ToastVariant = 'info';
  @property({ type: String }) override title = '';
  @property({ type: String }) message = '';
  @property({ type: Number }) duration = 5000;

  @state() private _visible = false;
  private _timer: ReturnType<typeof setTimeout> | null = null;

  static override styles = [
    baseStyles,
    css`
      :host { display: block; pointer-events: none; }

      .toast {
        pointer-events: auto;
        display: flex;
        align-items: flex-start;
        gap: var(--ov-space-3);
        padding: var(--ov-space-4) var(--ov-space-5);
        border-radius: var(--ov-radius-lg);
        box-shadow: var(--shadow-lg);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-subtle);
        border-left: 3px solid var(--_accent, var(--color-brand));
        max-width: 380px;
        width: 100%;
        animation: slide-in var(--ov-duration-slow) var(--ov-ease-out) both;
      }

      :host([variant='success']) .toast { --_accent: var(--color-success); }
      :host([variant='warning']) .toast { --_accent: var(--color-warning); }
      :host([variant='danger'])  .toast { --_accent: var(--color-danger); }

      @keyframes slide-in {
        from { opacity: 0; transform: translateY(8px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      .toast.hiding {
        animation: fade-out var(--ov-duration-base) var(--ov-ease-in-out) both;
      }
      @keyframes fade-out {
        to { opacity: 0; transform: translateY(-4px); }
      }

      .icon { width: 18px; height: 18px; flex: 0 0 auto; color: var(--_accent, var(--color-brand)); }
      .icon svg { width: 100%; height: 100%; }

      .body { flex: 1 1 auto; min-width: 0; }
      .title {
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-semibold);
        color: var(--color-text-primary);
        line-height: 1.3;
      }
      .msg {
        font-size: var(--ov-fs-xs);
        color: var(--color-text-secondary);
        margin-top: 2px;
        line-height: var(--ov-lh-normal);
      }

      .close {
        background: none; border: 0; padding: 0;
        color: var(--color-text-muted); cursor: pointer; line-height: 0;
        border-radius: var(--ov-radius-xs);
        transition: color var(--ov-duration-fast) var(--ov-ease-out);
      }
      .close:hover { color: var(--color-text-primary); }
      .close:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
    `,
  ];

  private static readonly _ICONS: Record<ToastVariant, TemplateResult> = {
    info:    html`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 7v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="5.2" r="0.9" fill="currentColor"/>`,
    success: html`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
    warning: html`<path d="M8 2.5l6 10.5H2L8 2.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/><path d="M8 6.5v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.5" r="0.8" fill="currentColor"/>`,
    danger:  html`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  };

  show(): void {
    this._visible = true;
    if (this.duration > 0) {
      if (this._timer) clearTimeout(this._timer);
      this._timer = setTimeout(() => this.hide(), this.duration);
    }
  }

  hide(): void {
    this._dismiss();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timer) clearTimeout(this._timer);
  }

  private _dismiss(): void {
    this._visible = false;
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    this.dispatchEvent(new CustomEvent<ToastDismissDetail>('dismiss', {
      detail: { id: this.toastId },
      bubbles: true, composed: true,
    }));
  }

  protected override render(): TemplateResult {
    if (!this._visible) return html``;
    return html`
      <div class="toast" role="status" aria-live="polite" part="toast">
        <div class="icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            ${OvToast._ICONS[this.variant]}
          </svg>
        </div>
        <div class="body">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.message ? html`<div class="msg">${this.message}</div>` : nothing}
          <slot></slot>
        </div>
        <button class="close" aria-label="Close notification" @click=${this._dismiss}>
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
    'ov-toast': OvToast;
  }
}
