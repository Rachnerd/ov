import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles, focusRing } from '../../shared-styles.js';
import type { LinkVariant, LinkUnderline, ControlSize } from '../../tokens.js';

/**
 * @element ov-link
 *
 * Renders a real <a> so SEO and keyboard semantics work, while unifying
 * colour/underline behaviour with the rest of the system.
 */
@customElement('ov-link')
export class OvLink extends LitElement {
  @property({ type: String }) href = '#';
  @property({ type: String }) target = '';
  @property({ type: String }) rel = '';
  @property({ type: String }) download = '';

  @property({ type: String, reflect: true }) variant: LinkVariant = 'default';
  @property({ type: String, reflect: true }) underline: LinkUnderline = 'hover';
  @property({ type: String, reflect: true }) size: ControlSize = 'md';

  static override styles = [
    baseStyles,
    focusRing,
    css`
      :host {
        display: inline;
      }

      a {
        color: var(--_color, var(--color-text-link));
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        transition: color var(--ov-duration-fast) var(--ov-ease-out);
        border-radius: 2px;
      }
      a:hover {
        color: var(--_hover, var(--color-text-link-hover));
      }

      :host([underline='always']) a {
        text-decoration: underline;
      }
      :host([underline='hover']) a {
        text-decoration: none;
      }
      :host([underline='hover']) a:hover {
        text-decoration: underline;
      }
      :host([underline='none']) a {
        text-decoration: none;
      }

      :host([variant='default']) {
        --_color: var(--color-text-link);
        --_hover: var(--color-text-link-hover);
      }
      :host([variant='subtle']) {
        --_color: var(--color-text-secondary);
        --_hover: var(--color-text-primary);
      }
      :host([variant='brand']) {
        --_color: var(--color-brand);
        --_hover: var(--color-brand-hover);
      }
      :host([variant='inverse']) {
        --_color: var(--ov-white);
        --_hover: var(--ov-blue-200);
      }

      :host([size='sm']) a {
        font-size: var(--ov-fs-xs);
      }
      :host([size='md']) a {
        font-size: var(--ov-fs-sm);
      }
      :host([size='lg']) a {
        font-size: var(--ov-fs-base);
      }
    `,
  ];

  protected override render(): TemplateResult {
    // Only emit attributes when they have values — avoids empty target="" etc.
    return html`
      <a
        href=${this.href}
        target=${this.target || ''}
        rel=${this.rel || ''}
        download=${this.download || ''}
        ><slot></slot
      ></a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-link': OvLink;
  }
}
