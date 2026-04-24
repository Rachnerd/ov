import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { AvatarSize, AvatarShape, AvatarTone } from '../../tokens.js';

/**
 * @element ov-avatar
 */
@customElement('ov-avatar')
export class OvAvatar extends LitElement {
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) initials = '';
  @property({ type: String }) name = '';

  @property({ type: String, reflect: true }) size: AvatarSize = 'md';
  @property({ type: String, reflect: true }) shape: AvatarShape = 'circle';
  @property({ type: String, reflect: true }) tone: AvatarTone = 'brand';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex: 0 0 auto;
        user-select: none;
        font-weight: var(--ov-fw-semibold);
        background: var(--_bg, var(--color-brand));
        color: var(--_fg, var(--color-text-on-brand));
        letter-spacing: 0;
      }
      :host([shape='circle']) {
        border-radius: 50%;
      }
      :host([shape='square']) {
        border-radius: var(--ov-radius-md);
      }

      :host([size='xs']) {
        width: 20px;
        height: 20px;
        font-size: 9px;
      }
      :host([size='sm']) {
        width: 28px;
        height: 28px;
        font-size: 11px;
      }
      :host([size='md']) {
        width: 40px;
        height: 40px;
        font-size: 14px;
      }
      :host([size='lg']) {
        width: 56px;
        height: 56px;
        font-size: 18px;
      }
      :host([size='xl']) {
        width: 80px;
        height: 80px;
        font-size: 26px;
      }

      :host([tone='brand']) {
        --_bg: var(--color-brand);
        --_fg: var(--color-text-on-brand);
      }
      :host([tone='accent']) {
        --_bg: var(--color-accent);
        --_fg: var(--color-accent-contrast);
      }
      :host([tone='neutral']) {
        --_bg: var(--color-bg-surface-muted);
        --_fg: var(--color-text-primary);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    `,
  ];

  private _deriveInitials(): string {
    if (this.initials) return this.initials.slice(0, 2).toUpperCase();
    if (!this.name) return '';
    const parts = this.name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1]![0] ?? '') : '';
    return (first + last).toUpperCase();
  }

  protected override render(): TemplateResult {
    if (this.src) {
      return html`<img
        src=${this.src}
        alt=${this.alt || this.name || 'Avatar'}
      />`;
    }
    return html`<span aria-hidden="true">${this._deriveInitials()}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-avatar': OvAvatar;
  }
}
