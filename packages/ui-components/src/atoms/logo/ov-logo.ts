import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';

/**
 * <ov-logo>
 *
 * The OpenValue — Tech Tribes white wordmark. Height is driven by the
 * `--ov-logo-height` CSS custom property so any parent can override it
 * with a media query or container token without changing the `size` prop.
 *
 * @element ov-logo
 */
@customElement('ov-logo')
export class OvLogo extends LitElement {
  /** Named size preset. Sets `--ov-logo-height`; overrideable by the parent via CSS. */
  @property({ type: String, reflect: true }) size:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl' = 'md';

  /**
   * Colour variant.
   * - `white` — white wordmark (default; use on dark backgrounds)
   */
  @property({ type: String, reflect: true }) variant: 'white' = 'white';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        --ov-logo-height: 44px;
      }

      /* Named size presets — all overrideable by setting --ov-logo-height on the host */
      :host([size='xs']) {
        --ov-logo-height: 20px;
      }
      :host([size='sm']) {
        --ov-logo-height: 28px;
      }
      :host([size='md']) {
        --ov-logo-height: 44px;
      }
      :host([size='lg']) {
        --ov-logo-height: 72px;
      }
      :host([size='xl']) {
        --ov-logo-height: 108px;
      }

      img {
        display: block;
        height: var(--ov-logo-height);
        width: auto;
      }
    `,
  ];

  private static readonly _SIZE_HEIGHT: Record<string, number> = {
    xs: 20,
    sm: 28,
    md: 44,
    lg: 72,
    xl: 108,
  };

  protected override render(): TemplateResult {
    const height = OvLogo._SIZE_HEIGHT[this.size] ?? 44;
    const width = Math.round(height * (1614 / 298));
    return html`
      <img
        src="/openvalue-tt-white.png"
        alt="OpenValue — Tech Tribes"
        height=${height}
        width=${width}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-logo': OvLogo;
  }
}
