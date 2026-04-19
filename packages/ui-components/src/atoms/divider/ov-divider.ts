import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { DividerOrientation, DividerVariant } from '../../tokens.js';

/**
 * @element ov-divider
 */
@customElement('ov-divider')
export class OvDivider extends LitElement {
  @property({ type: String, reflect: true }) orientation: DividerOrientation = 'horizontal';
  @property({ type: String, reflect: true }) variant: DividerVariant = 'default';
  @property({ type: String }) spacing = '';

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
    'ov-divider': OvDivider;
  }
}
