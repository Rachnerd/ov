import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';

/**
 * <ov-page-layout>
 *
 * Page-level layout shell. The `nav`, `hero`, and `footer` slots stretch
 * to the full viewport width. Everything in the default slot is capped at
 * `--ov-page-max-width` (default 1200 px) and centred with `margin-inline: auto`.
 *
 * @element ov-page-layout
 *
 * @slot nav     - Full-width sticky header / navigation bar.
 * @slot hero    - Full-width hero section directly below the nav.
 * @slot         - Page body content; constrained to max-width and centred.
 * @slot footer  - Full-width footer at the bottom of the page.
 *
 * @cssprop --ov-page-max-width - Max width of the body content area (default: 1200px).
 */
@customElement('ov-page-layout')
export class OvPageLayout extends LitElement {
  /** Max width of the constrained content area. Overrides `--ov-page-max-width`. */
  @property({ type: String, attribute: 'max-width' }) maxWidth = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        --ov-page-max-width: 1200px;
      }

      /* full-width zones */
      .full-width {
        width: 100%;
        flex: 0 0 auto;
      }

      /* constrained body */
      .content {
        flex: 1 1 auto;
        width: 100%;
        max-width: var(--ov-page-max-width);
        margin-inline: auto;
        box-sizing: border-box;
      }
    `,
  ];

  protected override render(): TemplateResult {
    const style = this.maxWidth
      ? `--ov-page-max-width: ${this.maxWidth}`
      : '';

    return html`
      <div class="full-width"><slot name="nav"></slot></div>
      <div class="full-width"><slot name="hero"></slot></div>
      <div class="content" style=${style}><slot></slot></div>
      <div class="full-width"><slot name="footer"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-page-layout': OvPageLayout;
  }
}
