import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';

/**
 * @element ov-menu-item
 * @slot icon     - Leading 16px icon.
 * @slot shortcut - Keyboard shortcut chips.
 * @slot trailing - Any trailing element (badge, chevron, etc.).
 * @fires {CustomEvent<{ label: string }>} select
 */
@customElement('ov-menu-item')
export class OvMenuItem extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean, reflect: true }) separator = false;

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

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
      .item:focus-visible {
        background: var(--color-bg-surface-muted);
      }
      .item:focus-visible {
        box-shadow: var(--shadow-focus);
      }

      :host([selected]) .item {
        background: var(--color-brand-subtle);
      }
      :host([selected]) .main {
        color: var(--color-brand);
      }

      :host([disabled]) .item {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
      }

      .icon-slot {
        width: 18px;
        height: 18px;
        flex: 0 0 auto;
        color: var(--color-text-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host([selected]) .icon-slot {
        color: var(--color-brand);
      }

      .content {
        flex: 1 1 auto;
        min-width: 0;
      }

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
    if (this.disabled || this.separator) {
      e.stopImmediatePropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: { label: this.label },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render(): TemplateResult {
    if (this.separator) return html`<div class="item" role="separator"></div>`;
    return html`
      <div
        class="item"
        role="menuitem"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-current=${this.selected ? 'true' : 'false'}
        tabindex=${this.disabled ? '-1' : '0'}
        part="item"
        @click=${this._onClick}
      >
        <span class="icon-slot"><slot name="icon"></slot></span>
        <span class="content">
          <div class="main">${this.label}</div>
          ${this.description
            ? html`<div class="desc">${this.description}</div>`
            : nothing}
        </span>
        <span class="shortcut"><slot name="shortcut"></slot></span>
        <span class="trailing"><slot name="trailing"></slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-menu-item': OvMenuItem;
  }
}
