import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';

export interface NavItem {
  label: string;
  href: string;
}

/**
 * <ov-nav-bar>
 *
 * Sticky top navigation bar. Accepts brand name, tagline, and a list of
 * navigation items as structured data. All link and logo typography is
 * encapsulated — no external CSS is required.
 *
 * @element ov-nav-bar
 *
 * @slot logo    - Custom logo image / SVG override. When empty the
 *                 `brand` and `tagline` props render the text wordmark.
 * @slot actions - CTA buttons on the far right (e.g. ov-button).
 */
@customElement('ov-nav-bar')
export class OvNavBar extends LitElement {
  /** Primary brand name shown in the wordmark. */
  @property({ type: String }) brand = '';

  /** Sub-brand or tagline shown beneath the brand name. */
  @property({ type: String }) tagline = '';

  /** href the logo links to. */
  @property({ type: String, attribute: 'logo-href' }) logoHref = '/';

  /** Navigation items rendered as links. Set as a JS property — not an attribute. */
  @property({ type: Array }) items: NavItem[] = [];

  /** href of the currently active item. Marks it with `aria-current="page"`. */
  @property({ type: String }) active = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      nav {
        display: flex;
        align-items: center;
        min-height: 60px;
        padding: 0 var(--ov-space-8);
        background: var(--ov-charcoal, #1e2330);
      }

      /* ── Logo ── */
      .logo-link {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        line-height: 1;
        gap: 3px;
        color: white;
        text-decoration: none;
      }
      .logo-name {
        font-size: var(--ov-fs-base);
        font-weight: var(--ov-fw-bold, 700);
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .logo-tagline {
        font-size: var(--ov-fs-xs);
        letter-spacing: 0.25em;
        text-transform: uppercase;
        opacity: 0.65;
      }

      /* ── Nav links ── */
      .links {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--ov-space-6);
        margin: 0 var(--ov-space-8);
        overflow: hidden;
      }
      .link {
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-semibold, 600);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: white;
        text-decoration: none;
        white-space: nowrap;
        padding-bottom: 2px;
        border-bottom: 2px solid transparent;
        transition: border-color var(--ov-duration-fast) var(--ov-ease-out);
      }
      .link:hover                 { border-bottom-color: var(--color-brand); }
      .link[aria-current='page']  { border-bottom-color: var(--color-brand); }

      /* ── Actions slot ── */
      .actions { flex: 0 0 auto; }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <nav aria-label="Main navigation">

        <a class="logo-link" href=${this.logoHref}
           aria-label="${this.brand}${this.tagline ? ' — ' + this.tagline : ''}, home">
          <slot name="logo">
            ${this.brand   ? html`<span class="logo-name">${this.brand}</span>`       : nothing}
            ${this.tagline ? html`<span class="logo-tagline">${this.tagline}</span>` : nothing}
          </slot>
        </a>

        <div class="links">
          ${this.items.map(item => html`
            <a
              class="link"
              href=${item.href}
              aria-current=${item.href === this.active ? 'page' : nothing}
            >${item.label}</a>
          `)}
        </div>

        <div class="actions"><slot name="actions"></slot></div>

      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-nav-bar': OvNavBar;
  }
}
