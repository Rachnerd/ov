import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { CardVariant } from '../../molecule-tokens.js';

/**
 * <ov-card>
 *
 * Structured surface molecule composed of three named regions: header,
 * body, and footer. Maps directly to the four approved colour combos
 * from the brand guidelines.
 *
 * @element ov-card
 *
 * @slot header  - Card header (titles, eyebrow, avatar row).
 * @slot         - Card body content.
 * @slot footer  - Card footer (actions, metadata, pagination).
 * @slot media   - Full-bleed image/video placed above the header.
 *
 * @cssprop --ov-card-padding - Inner padding (default --ov-space-6).
 * @cssprop --ov-card-gap     - Gap between header / body / footer.
 */
@customElement('ov-card')
export class OvCard extends LitElement {
  /**
   * 'default'       → charcoal on white (light) / charcoal on charcoal (dark)
   * 'brand'         → white on blue
   * 'inverse'       → white on charcoal
   * 'inverse-brand' → blue on charcoal
   */
  @property({ type: String, reflect: true }) variant: CardVariant = 'default';

  /** Adds a hover elevation + translateY transform. */
  @property({ type: Boolean, reflect: true }) interactive = false;

  /** Removes the border. */
  @property({ type: Boolean, reflect: true }) borderless = false;

  /** Removes all padding — useful when the card is purely a surface. */
  @property({ type: Boolean, reflect: true }) flush = false;

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }

      .card {
        --_bg:     var(--color-bg-surface);
        --_fg:     var(--color-text-primary);
        --_border: var(--color-border-subtle);
        --_p:      var(--ov-card-padding, var(--ov-space-6));
        --_gap:    var(--ov-card-gap, var(--ov-space-4));

        background: var(--_bg);
        color: var(--_fg);
        border: 1px solid var(--_border);
        border-radius: var(--ov-radius-lg);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition:
          box-shadow var(--ov-duration-base) var(--ov-ease-out),
          transform  var(--ov-duration-base) var(--ov-ease-out);
      }

      /* Variants */
      :host([variant='brand']) .card {
        --_bg:     var(--color-brand);
        --_fg:     var(--color-text-on-brand);
        --_border: transparent;
      }
      :host([variant='inverse']) .card {
        --_bg:     var(--ov-charcoal);
        --_fg:     var(--ov-white);
        --_border: transparent;
      }
      :host([variant='inverse-brand']) .card {
        --_bg:     var(--ov-charcoal);
        --_fg:     var(--ov-blue-400);
        --_border: transparent;
      }

      /* Interactive */
      :host([interactive]) .card { cursor: pointer; }
      :host([interactive]) .card:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }
      :host([interactive]) .card:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
      }

      /* Modifiers */
      :host([borderless]) .card { border-color: transparent; box-shadow: none; }

      /* ---- Regions ---- */
      .media ::slotted(*) {
        display: block;
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
      }

      .header {
        padding: var(--_p) var(--_p) 0;
      }
      .header:empty { display: none; }

      .body {
        padding: var(--_p);
        flex: 1 1 auto;
      }
      :host([flush]) .header,
      :host([flush]) .body,
      :host([flush]) .footer { padding: 0; }

      /* When header has content, reduce top padding on body */
      .header:not(:empty) + .body { padding-top: var(--_gap); }

      .footer {
        padding: 0 var(--_p) var(--_p);
        display: flex;
        align-items: center;
        gap: var(--ov-space-3);
      }
      .footer:empty { display: none; }

      /* Divider between body and footer */
      .footer:not(:empty) {
        border-top: 1px solid var(--_border);
        padding-top: var(--_p);
        margin-top: auto;
      }
      :host([variant='brand']) .footer:not(:empty),
      :host([variant='inverse']) .footer:not(:empty),
      :host([variant='inverse-brand']) .footer:not(:empty) {
        border-top-color: rgba(255,255,255,0.15);
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <div class="card" part="card">
        <div class="media"><slot name="media"></slot></div>
        <div class="header" part="header"><slot name="header"></slot></div>
        <div class="body"   part="body"  ><slot></slot></div>
        <div class="footer" part="footer"><slot name="footer"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-card': OvCard;
  }
}
