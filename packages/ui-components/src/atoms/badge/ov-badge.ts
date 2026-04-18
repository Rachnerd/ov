import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { BadgeVariant, BadgeAppearance, BadgeSize } from '../../tokens.js';

/**
 * <ov-badge>
 *
 * @slot     - Badge content.
 * @slot dot - Optional leading status dot (users opt in explicitly).
 */
@customElement('ov-badge')
export class OvBadge extends LitElement {
  @property({ type: String, reflect: true }) variant: BadgeVariant = 'default';
  @property({ type: String, reflect: true }) appearance: BadgeAppearance = 'soft';
  @property({ type: String, reflect: true }) size: BadgeSize = 'md';
  @property({ type: Boolean, reflect: true }) pill = true;

  static override styles = [
    baseStyles,
    css`
      :host { display: inline-flex; vertical-align: middle; }

      .b {
        --_bg: var(--color-bg-surface-muted);
        --_fg: var(--color-text-primary);
        --_border: transparent;

        display: inline-flex;
        align-items: center;
        gap: var(--ov-space-1);
        padding: 0.2em 0.75em;
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-semibold);
        letter-spacing: var(--ov-ls-wide);
        line-height: 1.4;
        border-radius: var(--ov-radius-sm);
        background: var(--_bg);
        color: var(--_fg);
        border: 1px solid var(--_border);
        white-space: nowrap;
      }
      :host([pill]) .b { border-radius: var(--ov-radius-pill); }
      :host([size='sm']) .b { font-size: 10px; padding: 0.15em 0.55em; }

      /* Soft (default) */
      :host([variant='brand'])   .b { --_bg: var(--color-brand-subtle);   --_fg: var(--color-text-link); }
      :host([variant='accent'])  .b { --_bg: var(--color-accent-subtle);  --_fg: var(--color-accent); }
      :host([variant='success']) .b { --_bg: var(--color-success-bg);     --_fg: var(--color-success-text); }
      :host([variant='warning']) .b { --_bg: var(--color-warning-bg);     --_fg: var(--color-warning-text); }
      :host([variant='danger'])  .b { --_bg: var(--color-danger-bg);      --_fg: var(--color-danger-text); }
      :host([variant='info'])    .b { --_bg: var(--color-info-bg);        --_fg: var(--color-info-text); }

      /* Solid */
      :host([appearance='solid'][variant='brand'])   .b { --_bg: var(--color-brand);   --_fg: var(--color-text-on-brand); }
      :host([appearance='solid'][variant='accent'])  .b { --_bg: var(--color-accent);  --_fg: var(--color-accent-contrast); }
      :host([appearance='solid'][variant='success']) .b { --_bg: var(--color-success); --_fg: var(--ov-white); }
      :host([appearance='solid'][variant='warning']) .b { --_bg: var(--color-warning); --_fg: var(--ov-neutral-900); }
      :host([appearance='solid'][variant='danger'])  .b { --_bg: var(--color-danger);  --_fg: var(--ov-white); }
      :host([appearance='solid'][variant='info'])    .b { --_bg: var(--color-info);    --_fg: var(--ov-white); }
      :host([appearance='solid'][variant='default']) .b { --_bg: var(--color-text-primary); --_fg: var(--color-bg-surface); }

      /* Outline */
      :host([appearance='outline']) .b { --_bg: transparent; --_border: var(--color-border-default); }
      :host([appearance='outline'][variant='brand'])   .b { --_fg: var(--color-brand);   --_border: var(--color-brand); }
      :host([appearance='outline'][variant='accent'])  .b { --_fg: var(--color-accent);  --_border: var(--color-accent); }
      :host([appearance='outline'][variant='success']) .b { --_fg: var(--color-success); --_border: var(--color-success); }
      :host([appearance='outline'][variant='warning']) .b { --_fg: var(--color-warning); --_border: var(--color-warning); }
      :host([appearance='outline'][variant='danger'])  .b { --_fg: var(--color-danger);  --_border: var(--color-danger); }
      :host([appearance='outline'][variant='info'])    .b { --_fg: var(--color-info);    --_border: var(--color-info); }

      .dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: currentColor;
        display: inline-block;
        flex: 0 0 auto;
      }
    `,
  ];

  protected override updated(): void {
    // Hide the default dot only when the user hasn't opted in via slot.
    const hasUserDot = !!this.querySelector('[slot="dot"]');
    const defaultDot = this.renderRoot.querySelector<HTMLElement>('.dot');
    if (defaultDot && !hasUserDot) defaultDot.style.display = 'none';
  }

  protected override render(): TemplateResult {
    return html`
      <span class="b">
        <slot name="dot"><span class="dot" part="dot"></span></slot>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-badge': OvBadge;
  }
}
