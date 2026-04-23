import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles, focusRing } from '../../shared-styles.js';

/**
 * @element ov-nav-link
 *
 * An uppercase nav link designed for dark navigation bars. Shows a brand-color
 * underline indicator when active. Used by ov-nav-bar but can be composed
 * independently into any dark header context.
 */
@customElement('ov-nav-link')
export class OvNavLink extends LitElement {
  @property({ type: String }) href = '#';
  @property({ type: Boolean, reflect: true }) active = false;

  protected override render(): TemplateResult {
    return html`
      <a
        href=${this.href}
        aria-current=${this.active ? 'page' : nothing}
      ><slot></slot></a>
    `;
  }

  static override styles = [
    baseStyles,
    focusRing,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
      }

      :host([hidden]) { display: none !important; }

      a {
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-semibold);
        letter-spacing: var(--ov-ls-wider);
        text-transform: uppercase;
        color: var(--ov-nav-link-color, white);
        text-decoration: none;
        white-space: nowrap;
        padding-bottom: var(--ov-border-thick);
        border-bottom: var(--ov-border-thick) solid transparent;
        border-radius: var(--ov-radius-xs);
        transition: border-color var(--ov-duration-fast) var(--ov-ease-out);
      }

      a:hover { border-bottom-color: var(--color-brand); }
      :host([active]) a { border-bottom-color: var(--color-brand); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-nav-link': OvNavLink;
  }
}
