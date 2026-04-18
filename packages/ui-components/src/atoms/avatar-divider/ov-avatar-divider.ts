import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type {
  AvatarSize, AvatarShape, AvatarTone,
  DividerOrientation, DividerVariant,
} from '../../tokens.js';

/**
 * <ov-avatar>
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
      :host([shape='circle']) { border-radius: 50%; }
      :host([shape='square']) { border-radius: var(--ov-radius-md); }

      :host([size='xs']) { width: 20px; height: 20px; font-size: 9px; }
      :host([size='sm']) { width: 28px; height: 28px; font-size: 11px; }
      :host([size='md']) { width: 40px; height: 40px; font-size: 14px; }
      :host([size='lg']) { width: 56px; height: 56px; font-size: 18px; }
      :host([size='xl']) { width: 80px; height: 80px; font-size: 26px; }

      :host([tone='brand'])   { --_bg: var(--color-brand);    --_fg: var(--color-text-on-brand); }
      :host([tone='accent'])  { --_bg: var(--color-accent);   --_fg: var(--color-accent-contrast); }
      :host([tone='neutral']) { --_bg: var(--color-bg-surface-muted); --_fg: var(--color-text-primary); }

      img { width: 100%; height: 100%; object-fit: cover; display: block; }
    `,
  ];

  private _deriveInitials(): string {
    if (this.initials) return this.initials.slice(0, 2).toUpperCase();
    if (!this.name) return '';
    const parts = this.name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last  = parts.length > 1 ? parts[parts.length - 1]![0] ?? '' : '';
    return (first + last).toUpperCase();
  }

  protected override render(): TemplateResult {
    if (this.src) {
      return html`<img src=${this.src} alt=${this.alt || this.name || 'Avatar'} />`;
    }
    return html`<span aria-hidden="true">${this._deriveInitials()}</span>`;
  }
}


/**
 * <ov-divider>
 *
 * Horizontal with optional centred label, or vertical.
 */
@customElement('ov-divider')
export class OvDivider extends LitElement {
  @property({ type: String, reflect: true }) orientation: DividerOrientation = 'horizontal';
  @property({ type: String, reflect: true }) variant: DividerVariant = 'default';
  @property({ type: String }) spacing = '';

  /** Reactive state tracking whether the default slot has any nodes. */
  @state() private _hasLabel = false;

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        --_color: var(--color-border-default);
      }
      :host([variant='subtle']) { --_color: var(--color-border-subtle); }
      :host([variant='strong']) { --_color: var(--color-border-strong); }

      :host([orientation='horizontal']) {
        width: 100%;
        margin: var(--_spacing, var(--ov-space-4)) 0;
      }
      .h {
        display: flex;
        align-items: center;
        gap: var(--ov-space-3);
        font-size: var(--ov-fs-xs);
        letter-spacing: var(--ov-ls-widest);
        text-transform: uppercase;
        color: var(--color-text-tertiary);
      }
      .h::before, .h::after {
        content: "";
        flex: 1;
        border-top: 1px solid var(--_color);
      }
      .h.empty { gap: 0; }
      .h.empty::before { flex: 1; }
      .h.empty::after  { display: none; }

      :host([orientation='vertical']) {
        display: inline-block;
        width: 1px;
        align-self: stretch;
        min-height: 1em;
        background: var(--_color);
        margin: 0 var(--_spacing, var(--ov-space-3));
      }
    `,
  ];

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('spacing') && this.spacing) {
      this.style.setProperty('--_spacing', this.spacing);
    }
  }

  private _onSlotChange(e: Event): void {
    // slotchange fires whenever assignment changes, so labels added later
    // (framework-driven, async content) still toggle the trailing line.
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._hasLabel = nodes.some((n) =>
      (n.nodeType === Node.TEXT_NODE && n.textContent!.trim().length > 0) ||
      n.nodeType === Node.ELEMENT_NODE,
    );
  }

  protected override render(): TemplateResult | typeof nothing {
    if (this.orientation === 'vertical') return nothing;
    return html`
      <div class="h ${this._hasLabel ? '' : 'empty'}" role="separator">
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-avatar':  OvAvatar;
    'ov-divider': OvDivider;
  }
}
