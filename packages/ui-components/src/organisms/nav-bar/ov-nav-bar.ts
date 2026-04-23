import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/nav-link/ov-nav-link.js';
import '../../molecules/menu-item/ov-menu-item.js';

export interface NavItem {
  label: string;
  href: string;
}

/**
 * <ov-nav-bar>
 *
 * Sticky top navigation bar with priority+ overflow: items that fit are shown
 * inline; the rest collapse into a hamburger dropdown.
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

  @state() private _overflowStart = 999;
  @state() private _menuOpen = false;

  @query('.links') private _linksEl!: HTMLElement;

  private _ro!: ResizeObserver;
  private _linkWidths: number[] = [];
  private _linkGap = 24;

  // Hamburger button width (icon 20px + padding 2×10px) + one gap unit
  private get _moreBtnReserve() {
    return 40 + this._linkGap;
  }

  private _onDocClick = (e: Event) => {
    if (!e.composedPath().includes(this)) {
      this._menuOpen = false;
    }
  };

  override firstUpdated() {
    this._linkGap = parseFloat(getComputedStyle(this._linksEl).columnGap) || 24;
    this._cacheWidths();

    this._ro = new ResizeObserver(() => {
      if (this._menuOpen) this._menuOpen = false;
      this._compute();
    });
    this._ro.observe(this._linksEl);
    this._compute();
  }

  override updated(changed: Map<PropertyKey, unknown>) {
    // When items change after first render, reset to all-visible, re-measure.
    if (changed.has('items') && this._linksEl && this._overflowStart !== 999) {
      this._overflowStart = 999;
      requestAnimationFrame(() => {
        this._cacheWidths();
        this._compute();
      });
    }

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

  private _cacheWidths() {
    const links = [...this._linksEl.querySelectorAll<HTMLElement>('ov-nav-link')];
    this._linkWidths = links.map(l => l.offsetWidth);
  }

  private _compute() {
    const containerWidth = this._linksEl.clientWidth;
    const gap = this._linkGap;
    const reserve = this._moreBtnReserve;

    let used = 0;
    let overflowStart = this._linkWidths.length;

    for (let i = 0; i < this._linkWidths.length; i++) {
      used += (i > 0 ? gap : 0) + this._linkWidths[i];
      const hasMore = i < this._linkWidths.length - 1;
      if (used + (hasMore ? reserve : 0) > containerWidth) {
        overflowStart = i;
        break;
      }
    }

    if (overflowStart !== this._overflowStart) {
      this._overflowStart = overflowStart;
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
    const homeHref = this.logoHref || '/';
    const anyOverflow = this._overflowStart < this.items.length;
    // When any item overflows, home is served by the logo — exclude it from the dropdown.
    const dropdownItems = this.items
      .slice(this._overflowStart)
      .filter(item => !anyOverflow || item.href !== homeHref);
    const showHamburger = dropdownItems.length > 0;

    return html`
      <nav aria-label="Main navigation">

        <a class="logo-link" href=${this.logoHref}
           aria-label="${this.brand}${this.tagline ? ' — ' + this.tagline : ''}, home">
          <slot name="logo">
            ${this.brand   ? html`<span class="logo-name">${this.brand}</span>`     : nothing}
            ${this.tagline ? html`<span class="logo-tagline">${this.tagline}</span>` : nothing}
          </slot>
        </a>

        <div class="links">
          ${this.items.map((item, i) => {
            const overflowed = i >= this._overflowStart;
            // Also hide the home item from the inline bar once any overflow exists.
            const hidden = overflowed || (anyOverflow && item.href === homeHref);
            return html`
              <ov-nav-link
                href=${item.href}
                ?active=${item.href === this.active}
                ?hidden=${hidden}
              >${item.label}</ov-nav-link>
            `;
          })}

          <div class="more-wrap${showHamburger ? '' : ' hidden'}">
            <ov-button
              class="more-btn"
              variant="ghost"
              size="sm"
              aria-label="More navigation items"
              aria-expanded=${String(this._menuOpen)}
              aria-haspopup="menu"
              @click=${this._toggleMenu}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5.5h14M3 10h14M3 14.5h14"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </ov-button>
          </div>
        </div>

        ${this._menuOpen && showHamburger ? html`
          <div class="overflow-menu" role="menu">
            ${dropdownItems.map(item => html`
              <ov-menu-item
                label=${item.label}
                ?selected=${item.href === this.active}
                @select=${() => this._navigate(item.href)}
              ></ov-menu-item>
            `)}
          </div>
        ` : nothing}

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
        --ov-nav-bar-height:         var(--ov-space-16);
        --ov-nav-bar-bg:             var(--ov-charcoal);
        --ov-nav-bar-dropdown-width: 180px;
        --ov-nav-bar-tagline-opacity: 0.65;

        /* Dark-surface colour scale — override to retheme the bar */
        --ov-nav-bar-fg:             var(--ov-white);
        --ov-nav-bar-fg-dim:         rgba(255, 255, 255, 0.92);
        --ov-nav-bar-fg-muted:       rgba(255, 255, 255, 0.45);
        --ov-nav-bar-surface:        rgba(255, 255, 255, 0.12);
        --ov-nav-bar-surface-alt:    rgba(255, 255, 255, 0.2);
        --ov-nav-bar-border:         rgba(255, 255, 255, 0.1);
        --ov-nav-bar-brand-subtle:   rgba(255, 255, 255, 0.15);
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

      /* ── Nav links container ── */
      .links {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--ov-space-6);
        margin: 0 var(--ov-space-8);
        overflow: hidden;
      }

      /* ── More button wrapper ── */
      .more-wrap {
        flex: 0 0 auto;
        position: relative;
      }
      .more-wrap.hidden { display: none; }

      /* ── ov-button (ghost) themed for dark nav background ── */
      .more-btn {
        --color-text-primary:     var(--ov-nav-bar-fg);
        --color-bg-surface-muted: var(--ov-nav-bar-surface);
        --color-bg-surface-alt:   var(--ov-nav-bar-surface-alt);
      }

      /* ── Overflow dropdown — anchored to <nav>, not .more-wrap ── */
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
        --color-text-primary:     var(--ov-nav-bar-fg-dim);
        --color-text-tertiary:    var(--ov-nav-bar-fg-muted);
        --color-bg-surface-muted: var(--ov-nav-bar-border);
        --color-brand-subtle:     var(--ov-nav-bar-brand-subtle);
        --color-border-subtle:    var(--ov-nav-bar-border);
      }

      /* ── Actions slot ── */
      .actions { flex: 0 0 auto; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-nav-bar': OvNavBar;
  }
}
