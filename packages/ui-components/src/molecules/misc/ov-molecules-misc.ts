import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { StatDelta, ToastVariant, ToastDismissDetail } from '../../molecule-tokens.js';
import type { BuiltInIconName } from '../../tokens.js';


/* ============================================================================
   ov-menu-item
   ============================================================================ */

/**
 * <ov-menu-item>
 *
 * Single interactive row inside a menu or command palette. Composes a
 * leading icon slot, main label, trailing shortcut keys, and a trailing
 * element (badge, arrow, sub-label). Can also render a visual divider.
 *
 * @element ov-menu-item
 * @slot icon     - Leading 16px icon.
 * @slot shortcut - Keyboard shortcut chips.
 * @slot trailing - Any trailing element (badge, chevron, etc.).
 */
@customElement('ov-menu-item')
export class OvMenuItem extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  /** When true renders a full-width <hr> separator instead of a normal item. */
  @property({ type: Boolean, reflect: true }) separator = false;

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }

      :host([separator]) .item {
        height: 0;
        padding: 0;
        margin: var(--ov-space-1) 0;
        border-top: 1px solid var(--color-border-subtle);
        pointer-events: none;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--ov-space-3);
        padding: var(--ov-space-2) var(--ov-space-3);
        border-radius: var(--ov-radius-md);
        cursor: pointer;
        user-select: none;
        transition: background-color var(--ov-duration-fast) var(--ov-ease-out);
        outline: none;
      }
      .item:hover,
      .item:focus-visible { background: var(--color-bg-surface-muted); }
      .item:focus-visible  { box-shadow: var(--shadow-focus); }

      :host([selected]) .item { background: var(--color-brand-subtle); }
      :host([selected]) .main { color: var(--color-brand); }

      :host([disabled]) .item {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
      }

      .icon-slot {
        width: 18px; height: 18px;
        flex: 0 0 auto;
        color: var(--color-text-tertiary);
        display: flex; align-items: center; justify-content: center;
      }
      :host([selected]) .icon-slot { color: var(--color-brand); }

      .content { flex: 1 1 auto; min-width: 0; }

      .main {
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-medium);
        color: var(--color-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .desc {
        font-size: var(--ov-fs-xs);
        color: var(--color-text-tertiary);
        margin-top: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .shortcut {
        display: flex;
        gap: var(--ov-space-1);
        align-items: center;
        flex: 0 0 auto;
      }
      ::slotted([slot='shortcut']) {
        font-size: 11px;
        font-family: var(--ov-font-mono);
        color: var(--color-text-muted);
        background: var(--color-bg-surface-muted);
        border: 1px solid var(--color-border-subtle);
        border-radius: var(--ov-radius-xs);
        padding: 1px 5px;
        line-height: 1.5;
      }

      .trailing {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        color: var(--color-text-tertiary);
      }
    `,
  ];

  private _onClick(e: MouseEvent): void {
    if (this.disabled || this.separator) { e.stopImmediatePropagation(); return; }
    this.dispatchEvent(new CustomEvent('select', {
      detail: { label: this.label },
      bubbles: true, composed: true,
    }));
  }

  protected override render(): TemplateResult {
    if (this.separator) return html`<div class="item" role="separator"></div>`;
    return html`
      <div
        class="item"
        role="menuitem"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-selected=${this.selected ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        part="item"
        @click=${this._onClick}
      >
        <span class="icon-slot"><slot name="icon"></slot></span>
        <span class="content">
          <div class="main">${this.label}</div>
          ${this.description ? html`<div class="desc">${this.description}</div>` : nothing}
        </span>
        <span class="shortcut"><slot name="shortcut"></slot></span>
        <span class="trailing"><slot name="trailing"></slot></span>
      </div>
    `;
  }
}


/* ============================================================================
   ov-stat
   ============================================================================ */

/**
 * <ov-stat>
 *
 * KPI / metric display: a large value with a label, optional delta (↑/↓),
 * and optional sub-label. Typical use: dashboard cards, summary panels.
 *
 * @element ov-stat
 */
@customElement('ov-stat')
export class OvStat extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) sublabel = '';

  /** Numeric change expressed as a formatted string, e.g. "+12%" or "−3". */
  @property({ type: String }) delta = '';

  /** Direction of the delta — drives arrow icon + colour. */
  @property({ type: String, reflect: true }) trend: StatDelta = 'neutral';

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }

      .stat {
        display: flex;
        flex-direction: column;
        gap: var(--ov-space-1);
      }

      .label {
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-medium);
        letter-spacing: var(--ov-ls-wider);
        text-transform: uppercase;
        color: var(--color-text-secondary);
      }

      .value {
        font-size: var(--ov-fs-2xl);
        font-weight: var(--ov-fw-semibold);
        line-height: var(--ov-lh-tight);
        letter-spacing: var(--ov-ls-tight);
        color: var(--color-text-primary);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: var(--ov-space-2);
        flex-wrap: wrap;
      }

      .delta {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-semibold);
      }
      :host([trend='up'])      .delta { color: var(--color-success); }
      :host([trend='down'])    .delta { color: var(--color-danger); }
      :host([trend='neutral']) .delta { color: var(--color-text-muted); }

      .delta svg { width: 12px; height: 12px; }

      .sublabel {
        font-size: var(--ov-fs-xs);
        color: var(--color-text-tertiary);
      }
    `,
  ];

  private _arrowPath(): TemplateResult | typeof nothing {
    if (this.trend === 'up')
      return html`<path d="M8 12V4m0 0L4 8m4-4l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    if (this.trend === 'down')
      return html`<path d="M8 4v8m0 0L4 8m4 4l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="stat" part="stat">
        <div class="label">${this.label}</div>
        <div class="value">${this.value}</div>
        <div class="meta">
          ${this.delta ? html`
            <span class="delta">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                ${this._arrowPath()}
              </svg>
              ${this.delta}
            </span>
          ` : nothing}
          ${this.sublabel ? html`<span class="sublabel">${this.sublabel}</span>` : nothing}
        </div>
      </div>
    `;
  }
}


/* ============================================================================
   ov-toast
   ============================================================================ */

/**
 * <ov-toast>
 *
 * Self-dismissing notification. Controls its own visibility and exposes
 * `show()` / `hide()` as imperative helpers for programmatic use.
 * Auto-dismiss fires after `duration` ms (0 = no auto-dismiss).
 *
 * @element ov-toast
 * @fires {CustomEvent<ToastDismissDetail>} dismiss
 */
@customElement('ov-toast')
export class OvToast extends LitElement {
  @property({ type: String }) toastId = '';
  @property({ type: String, reflect: true }) variant: ToastVariant = 'info';
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  /** Auto-dismiss delay in ms. 0 = no auto-dismiss. */
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

        /* Enter animation */
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

      .hidden { display: none; }
    `,
  ];

  // Same icon set as ov-alert — keeps the visual language consistent.
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
      bubbles: true,
      composed: true,
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


/* ============================================================================
   ov-empty-state
   ============================================================================ */

/**
 * <ov-empty-state>
 *
 * Zero-data placeholder. Composes an illustration/icon, heading, body
 * copy, and a primary action slot into a centred layout. Used when a
 * list, table, or search result has nothing to show.
 *
 * @element ov-empty-state
 * @slot icon    - Illustration or ov-icon override.
 * @slot actions - Buttons / links below the description.
 */
@customElement('ov-empty-state')
export class OvEmptyState extends LitElement {
  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';

  /** One of the built-in icon names, shown when the icon slot is empty. */
  @property({ type: String }) icon: BuiltInIconName | '' = '';

  /** Size of the container. */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  static override styles = [
    baseStyles,
    css`
      :host { display: flex; justify-content: center; }

      .es {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--ov-space-4);
        padding: var(--ov-space-12) var(--ov-space-8);
        max-width: 400px;
      }
      :host([size='sm']) .es { padding: var(--ov-space-8) var(--ov-space-6); max-width: 300px; }
      :host([size='lg']) .es { padding: var(--ov-space-20) var(--ov-space-12); max-width: 520px; }

      .icon-wrap {
        width: 56px; height: 56px;
        border-radius: var(--ov-radius-xl);
        background: var(--color-bg-surface-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-muted);
      }
      :host([size='sm']) .icon-wrap { width: 40px; height: 40px; }
      :host([size='lg']) .icon-wrap { width: 72px; height: 72px; }

      .icon-wrap svg { width: 24px; height: 24px; }
      :host([size='sm']) .icon-wrap svg { width: 18px; height: 18px; }
      :host([size='lg']) .icon-wrap svg { width: 32px; height: 32px; }

      .heading {
        font-size: var(--ov-fs-md);
        font-weight: var(--ov-fw-semibold);
        color: var(--color-text-primary);
        line-height: var(--ov-lh-snug);
      }
      :host([size='sm']) .heading { font-size: var(--ov-fs-base); }
      :host([size='lg']) .heading { font-size: var(--ov-fs-lg); }

      .description {
        font-size: var(--ov-fs-sm);
        color: var(--color-text-secondary);
        line-height: var(--ov-lh-relaxed);
      }

      .actions {
        display: flex;
        gap: var(--ov-space-3);
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
      }
      .actions:empty { display: none; }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <div class="es" part="empty-state">
        <div class="icon-wrap" part="icon">
          <slot name="icon">
            ${this.icon ? html`
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <!-- Scaled-up version of the icon paths from ov-icon -->
                <ov-icon name=${this.icon} size="xl"></ov-icon>
              </svg>
            ` : html`
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3"
                      stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
                <path d="M9 12h6M12 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            `}
          </slot>
        </div>
        ${this.heading ? html`<div class="heading">${this.heading}</div>` : nothing}
        ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-menu-item':   OvMenuItem;
    'ov-stat':        OvStat;
    'ov-toast':       OvToast;
    'ov-empty-state': OvEmptyState;
  }
}
