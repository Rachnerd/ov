import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/icon/ov-icon.js';
import '../../atoms/nav-link/ov-nav-link.js';
import '../../molecules/menu-item/ov-menu-item.js';

export interface NavItem {
  label: string;
  href: string;
}

/**
 * <ov-nav-bar>
 *
 * Sticky top navigation bar. Items that fit in the available space are shown
 * inline; when any item overflows the links container a hamburger button
 * appears containing all items.
 *
 * @element ov-nav-bar
 *
 * @slot logo    - Custom logo image / SVG override.
 * @slot actions - CTA buttons on the far right (e.g. ov-button).
 */
@customElement('ov-nav-bar')
export class OvNavBar extends LitElement {
  @property({ type: String }) brand = '';
  @property({ type: String }) tagline = '';
  @property({ type: String, attribute: 'logo-href' }) logoHref = '/';
  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String }) active = '';

  @state() private _menuOpen = false;
  @state() private _hasOverflow = false;

  @query('.links') private _linksEl!: HTMLElement;

  private _ro!: ResizeObserver;

  private _onDocClick = (e: Event) => {
    if (!e.composedPath().includes(this)) {
      this._menuOpen = false;
    }
  };

  override firstUpdated() {
    this._ro = new ResizeObserver(() => this._checkOverflow());
    this._ro.observe(this._linksEl);
    this._checkOverflow();
  }

  override updated() {
    if (this._menuOpen) {
      document.addEventListener('click', this._onDocClick);
    } else {
      document.removeEventListener('click', this._onDocClick);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._ro?.disconnect();
    document.removeEventListener('click', this._onDocClick);
  }

  private _checkOverflow() {
    const links = [
      ...this._linksEl.querySelectorAll<HTMLElement>('ov-nav-link'),
    ];

    // Reset all to visible so measurements reflect natural widths
    links.forEach((l) => l.removeAttribute('hidden'));

    const containerRight = this._linksEl.getBoundingClientRect().right;
    const hasOverflow = links.some(
      (l) => l.getBoundingClientRect().right > containerRight,
    );

    if (hasOverflow) {
      // Hamburger button will occupy ~52 px — hide items that no longer fit
      const fittingRight = containerRight - 52;
      links.forEach((l) =>
        l.toggleAttribute(
          'hidden',
          l.getBoundingClientRect().right > fittingRight,
        ),
      );
    }

    if (hasOverflow !== this._hasOverflow) {
      this._hasOverflow = hasOverflow;
      if (!hasOverflow) this._menuOpen = false;
    }
  }

  private _toggleMenu(e: Event) {
    e.stopPropagation();
    this._menuOpen = !this._menuOpen;
  }

  private _navigate(href: string) {
    this._menuOpen = false;
    window.location.href = href;
  }

  protected override render(): TemplateResult {
    return html`
      <nav aria-label="Main navigation">
        <a
          class="logo-link"
          href=${this.logoHref}
          aria-label="${this.brand}${this.tagline
            ? ' — ' + this.tagline
            : ''}, home"
        >
          <slot name="logo">
            ${this.brand
              ? html`<span class="logo-name">${this.brand}</span>`
              : nothing}
            ${this.tagline
              ? html`<span class="logo-tagline">${this.tagline}</span>`
              : nothing}
          </slot>
        </a>

        <div class="links">
          <span class="links-spacer"></span>
          ${this.items.map(
            (item) => html`
              <ov-nav-link
                href=${item.href}
                ?active=${item.href === this.active}
                >${item.label}</ov-nav-link
              >
            `,
          )}
        </div>

        <div class="more-wrap" ?hidden=${!this._hasOverflow}>
          <ov-button
            class="more-btn"
            variant="ghost"
            size="sm"
            aria-label="Open navigation menu"
            aria-expanded=${String(this._menuOpen)}
            aria-haspopup="menu"
            @click=${this._toggleMenu}
          >
            <ov-icon name="menu" size="xl"></ov-icon>
          </ov-button>
        </div>

        ${this._menuOpen
          ? html`
              <div class="overflow-menu" role="menu">
                ${this.items.map(
                  (item) => html`
                    <ov-menu-item
                      label=${item.label}
                      ?selected=${item.href === this.active}
                      @select=${() => this._navigate(item.href)}
                    ></ov-menu-item>
                  `,
                )}
              </div>
            `
          : nothing}

        <div class="actions"><slot name="actions"></slot></div>
      </nav>
    `;
  }

  static override styles = [
    baseStyles,
    css`
      /* ── Nav-bar local tokens ── */
      :host {
        display: block;

        /* Structure */
        --ov-nav-bar-height: var(--ov-space-16);
        --ov-nav-bar-bg: var(--ov-charcoal);
        --ov-nav-bar-dropdown-width: 180px;
        --ov-nav-bar-tagline-opacity: 0.65;

        /* Dark-surface colour scale — override to retheme the bar */
        --ov-nav-bar-fg: var(--ov-white);
        --ov-nav-bar-fg-dim: rgba(255, 255, 255, 0.92);
        --ov-nav-bar-fg-muted: rgba(255, 255, 255, 0.45);
        --ov-nav-bar-surface: rgba(255, 255, 255, 0.12);
        --ov-nav-bar-surface-alt: rgba(255, 255, 255, 0.2);
        --ov-nav-bar-border: rgba(255, 255, 255, 0.1);
        --ov-nav-bar-brand-subtle: rgba(255, 255, 255, 0.15);
      }

      nav {
        display: flex;
        align-items: center;
        min-height: var(--ov-nav-bar-height);
        padding: 0 var(--ov-space-8);
        background: var(--ov-nav-bar-bg);
        position: relative;
      }

      /* ── Logo ── */
      .logo-link {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        line-height: var(--ov-lh-none);
        gap: var(--ov-space-1);
        color: var(--ov-nav-bar-fg);
        text-decoration: none;
      }
      .logo-name {
        font-size: var(--ov-fs-base);
        font-weight: var(--ov-fw-bold);
        letter-spacing: var(--ov-ls-widest);
        text-transform: uppercase;
      }
      .logo-tagline {
        font-size: var(--ov-fs-xs);
        letter-spacing: var(--ov-ls-display);
        text-transform: uppercase;
        opacity: var(--ov-nav-bar-tagline-opacity);
      }

      /* ── Nav links — clips items that don't fit; overflow triggers hamburger ── */
      .links {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        gap: var(--ov-space-6);
        margin: 0 var(--ov-space-8);
        overflow: hidden;
      }
      /* Spacer pushes items right; shrinks to 0 before items overflow */
      .links-spacer {
        flex: 1 1 auto;
      }

      /* Prevent links from shrinking so they actually overflow the container */
      .links ov-nav-link {
        flex-shrink: 0;
      }

      /* ── Hamburger — [hidden] when no overflow ── */
      [hidden] {
        display: none !important;
      }
      .more-wrap {
        flex: 0 0 auto;
        margin-right: var(--ov-space-2);
      }

      /* ── ov-button (ghost) themed for dark nav background ── */
      .more-btn {
        --color-text-primary: var(--ov-nav-bar-fg);
        --color-bg-surface-muted: var(--ov-nav-bar-surface);
        --color-bg-surface-alt: var(--ov-nav-bar-surface-alt);
      }

      /* ── Dropdown — anchored to <nav> ── */
      .overflow-menu {
        position: absolute;
        top: 100%;
        right: var(--ov-space-8);
        background: var(--ov-nav-bar-bg);
        border: var(--ov-border-thin) solid var(--ov-nav-bar-border);
        border-radius: var(--ov-radius-md);
        padding: var(--ov-space-1);
        min-width: var(--ov-nav-bar-dropdown-width);
        z-index: var(--ov-z-raised);
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-lg);
      }

      /* ── ov-menu-item themed for dark dropdown background ── */
      .overflow-menu ov-menu-item {
        --color-text-primary: var(--ov-nav-bar-fg-dim);
        --color-text-tertiary: var(--ov-nav-bar-fg-muted);
        --color-bg-surface-muted: var(--ov-nav-bar-border);
        --color-brand-subtle: var(--ov-nav-bar-brand-subtle);
        --color-border-subtle: var(--ov-nav-bar-border);
      }

      /* ── Actions slot ── */
      .actions {
        flex: 0 0 auto;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-nav-bar': OvNavBar;
  }
}
