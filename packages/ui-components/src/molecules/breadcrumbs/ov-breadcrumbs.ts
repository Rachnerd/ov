import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { BreadcrumbItem } from '../../molecule-tokens.js';

/**
 * <ov-breadcrumbs>
 *
 * Accepts an array of { label, href? } items and renders a semantic
 * <nav aria-label="Breadcrumb"><ol> trail with chevron separators.
 * The last item is always current-page (aria-current="page", no link).
 *
 * @element ov-breadcrumbs
 *
 * @slot separator - Custom separator element; overrides the default chevron.
 */
@customElement('ov-breadcrumbs')
export class OvBreadcrumbs extends LitElement {
  /** Ordered list of items. Last item = current page. */
  @property({ type: Array }) items: BreadcrumbItem[] = [];

  /** Show the collapsed "…" version once more than `max` items exist. */
  @property({ type: Number }) max = 0;   // 0 = no limit

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }

      nav { }

      ol {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      li {
        display: inline-flex;
        align-items: center;
        gap: var(--ov-space-1);
        font-size: var(--ov-fs-sm);
      }

      a {
        color: var(--color-text-secondary);
        text-decoration: none;
        transition: color var(--ov-duration-fast) var(--ov-ease-out);
        border-radius: 2px;
        padding: 0 2px;
      }
      a:hover { color: var(--color-text-primary); text-decoration: underline; }
      a:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
      }

      .current {
        color: var(--color-text-primary);
        font-weight: var(--ov-fw-medium);
      }

      .sep {
        display: inline-flex;
        align-items: center;
        color: var(--color-text-muted);
        margin: 0 var(--ov-space-1);
        user-select: none;
      }

      .ellipsis {
        color: var(--color-text-muted);
        padding: 0 2px;
        cursor: default;
        letter-spacing: 0.06em;
      }
    `,
  ];

  private _visibleItems(): BreadcrumbItem[] {
    if (!this.max || this.items.length <= this.max) return this.items;
    // Always show first and last; collapse the middle.
    return [
      this.items[0]!,
      { label: '…', href: undefined },
      ...this.items.slice(this.items.length - (this.max - 1)),
    ];
  }

  protected override render(): TemplateResult {
    const visible = this._visibleItems();
    return html`
      <nav aria-label="Breadcrumb" part="nav">
        <ol part="list">
          ${visible.map((item, i) => {
            const isLast = i === visible.length - 1;
            const isEllipsis = item.label === '…' && !item.href;
            return html`
              <li part="item">
                ${isEllipsis
                  ? html`<span class="ellipsis" aria-hidden="true">…</span>`
                  : isLast
                  ? html`<span class="current" aria-current="page">${item.label}</span>`
                  : html`<a href=${item.href ?? '#'} part="link">${item.label}</a>`
                }
                ${!isLast ? html`
                  <span class="sep" aria-hidden="true">
                    <slot name="separator">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.6"
                              stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </slot>
                  </span>
                ` : null}
              </li>
            `;
          })}
        </ol>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-breadcrumbs': OvBreadcrumbs;
  }
}
