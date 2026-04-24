import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { BuiltInIconName } from '../../tokens.js';

/**
 * @element ov-empty-state
 * @slot icon    - Illustration or ov-icon override.
 * @slot actions - Buttons / links below the description.
 */
@customElement('ov-empty-state')
export class OvEmptyState extends LitElement {
  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';
  @property({ type: String }) icon: BuiltInIconName | '' = '';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
      }

      .es {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--ov-space-4);
        padding: var(--ov-space-12) var(--ov-space-8);
        max-width: 400px;
      }
      :host([size='sm']) .es {
        padding: var(--ov-space-8) var(--ov-space-6);
        max-width: 300px;
      }
      :host([size='lg']) .es {
        padding: var(--ov-space-20) var(--ov-space-12);
        max-width: 520px;
      }

      .icon-wrap {
        width: 56px;
        height: 56px;
        border-radius: var(--ov-radius-xl);
        background: var(--color-bg-surface-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-muted);
      }
      :host([size='sm']) .icon-wrap {
        width: 40px;
        height: 40px;
      }
      :host([size='lg']) .icon-wrap {
        width: 72px;
        height: 72px;
      }

      .icon-wrap svg {
        width: 24px;
        height: 24px;
      }
      :host([size='sm']) .icon-wrap svg {
        width: 18px;
        height: 18px;
      }
      :host([size='lg']) .icon-wrap svg {
        width: 32px;
        height: 32px;
      }

      .heading {
        font-size: var(--ov-fs-md);
        font-weight: var(--ov-fw-semibold);
        color: var(--color-text-primary);
        line-height: var(--ov-lh-snug);
      }
      :host([size='sm']) .heading {
        font-size: var(--ov-fs-base);
      }
      :host([size='lg']) .heading {
        font-size: var(--ov-fs-lg);
      }

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
      .actions:empty {
        display: none;
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <div class="es" part="empty-state">
        <div class="icon-wrap" part="icon">
          <slot name="icon">
            ${this.icon
              ? html` <ov-icon name=${this.icon} size="xl"></ov-icon> `
              : html`
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="3"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-dasharray="3 2"
                    />
                    <path
                      d="M9 12h6M12 9v6"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                `}
          </slot>
        </div>
        ${this.heading
          ? html`<div class="heading">${this.heading}</div>`
          : nothing}
        ${this.description
          ? html`<div class="description">${this.description}</div>`
          : nothing}
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-empty-state': OvEmptyState;
  }
}
