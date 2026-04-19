import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';

/** Pixel heights for each named size. Aspect ratio 1614:298 ≈ 5.4:1. */
const SIZE_HEIGHT: Record<string, number> = {
  xs:  20,
  sm:  28,
  md:  44,
  lg:  72,
  xl: 108,
};

/**
 * <ov-logo>
 *
 * The OpenValue — Tech Tribes white wordmark. Width scales automatically
 * to preserve the aspect ratio. Use `variant` when the logo sits on a
 * light background.
 *
 * @element ov-logo
 */
@customElement('ov-logo')
export class OvLogo extends LitElement {
  /** Display size. Controls the rendered height. */
  @property({ type: String, reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Colour variant.
   * - `white`  — white wordmark (default; use on dark backgrounds)
   * - `color`  — full-colour version (supply a different image if needed)
   */
  @property({ type: String, reflect: true }) variant: 'white' = 'white';

  static override styles = [
    baseStyles,
    css`
      :host { display: inline-flex; align-items: center; }
      img   { display: block; width: auto; }
    `,
  ];

  protected override render(): TemplateResult {
    const height = SIZE_HEIGHT[this.size] ?? SIZE_HEIGHT['md'];
    return html`
      <img
        src="/openvalue-tt-white.png"
        alt="OpenValue — Tech Tribes"
        height=${height}
        width=${Math.round(height * (1614 / 298))}
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-logo': OvLogo;
  }
}
