import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { TabItem, TabChangeDetail } from '../../molecule-tokens.js';

/**
 * <ov-tabs>
 *
 * Accessible tab list. Items are supplied as a typed array so consumers
 * can't accidentally pass malformed data. Keyboard navigation follows
 * the ARIA Authoring Practices Guide pattern: ← / → move between tabs,
 * Home / End jump to first / last, Tab exits the tab list.
 *
 * @element ov-tabs
 *
 * @fires {CustomEvent<TabChangeDetail>} change - Emits whenever the
 *   active tab changes, with `detail.key` set to the new tab's key.
 */
@customElement('ov-tabs')
export class OvTabs extends LitElement {
  /** Full list of tab descriptors. */
  @property({ type: Array }) tabs: TabItem[] = [];

  /** Key of the active tab. Defaults to the first item. */
  @property({ type: String, reflect: true }) active = '';

  /** Visual style of the tab bar. */
  @property({ type: String, reflect: true }) appearance: 'underline' | 'pills' =
    'underline';

  /** Stretch tabs to fill the full width. */
  @property({ type: Boolean, reflect: true }) fill = false;

  protected override updated(changed: Map<string, unknown>): void {
    // On first render, default active to first non-disabled tab.
    if (changed.has('tabs') && !this.active && this.tabs.length) {
      this.active = this.tabs.find((t) => !t.disabled)?.key ?? '';
    }
  }

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .tablist {
        display: flex;
        align-items: stretch;
        position: relative;
        gap: 0;
      }
      :host([fill]) .tablist {
        width: 100%;
      }

      /* ── Underline appearance ────────────────────── */
      :host([appearance='underline']) .tablist {
        border-bottom: 2px solid var(--color-border-subtle);
        gap: var(--ov-space-1);
      }
      :host([appearance='underline']) .tab {
        position: relative;
        padding: var(--ov-space-3) var(--ov-space-4);
        margin-bottom: -2px; /* overlap parent border */
        border-bottom: 2px solid transparent;
        color: var(--color-text-secondary);
        transition:
          color var(--ov-duration-fast) var(--ov-ease-out),
          border-color var(--ov-duration-fast) var(--ov-ease-out);
      }
      :host([appearance='underline']) .tab:hover:not(.disabled) {
        color: var(--color-text-primary);
      }
      :host([appearance='underline']) .tab.active {
        color: var(--color-brand);
        border-bottom-color: var(--color-brand);
      }

      /* ── Pills appearance ────────────────────────── */
      :host([appearance='pills']) .tablist {
        background: var(--color-bg-surface-muted);
        border-radius: var(--ov-radius-lg);
        padding: var(--ov-space-1);
        gap: var(--ov-space-1);
      }
      :host([appearance='pills']) .tab {
        border-radius: var(--ov-radius-md);
        padding: var(--ov-space-2) var(--ov-space-4);
        color: var(--color-text-secondary);
        transition:
          background-color var(--ov-duration-fast) var(--ov-ease-out),
          color var(--ov-duration-fast) var(--ov-ease-out);
      }
      :host([appearance='pills']) .tab:hover:not(.disabled) {
        background: var(--color-bg-surface);
      }
      :host([appearance='pills']) .tab.active {
        background: var(--color-bg-surface);
        color: var(--color-text-primary);
        box-shadow: var(--shadow-sm);
      }

      /* ── Shared tab styles ───────────────────────── */
      .tab {
        display: inline-flex;
        align-items: center;
        gap: var(--ov-space-2);
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-medium);
        white-space: nowrap;
        cursor: pointer;
        background: none;
        border: 0;
        border-radius: 0;
        font-family: inherit;
        outline: none;
        user-select: none;
        flex: 0 0 auto;
      }
      :host([fill]) .tab {
        flex: 1 1 0;
        justify-content: center;
      }

      .tab.disabled {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
      }
      .tab:focus-visible {
        box-shadow: var(--shadow-focus);
        border-radius: var(--ov-radius-sm);
      }

      .count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 5px;
        border-radius: var(--ov-radius-pill);
        background: var(--color-bg-surface-muted);
        color: var(--color-text-secondary);
        font-size: 11px;
        font-weight: var(--ov-fw-semibold);
        line-height: var(--ov-lh-none);
      }
      .tab.active .count {
        background: var(--color-brand-subtle);
        color: var(--color-brand);
      }
    `,
  ];

  private _select(key: string): void {
    if (key === this.active) return;
    const tab = this.tabs.find((t) => t.key === key);
    if (!tab || tab.disabled) return;
    this.active = key;
    this.dispatchEvent(
      new CustomEvent<TabChangeDetail>('change', {
        detail: { key },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onKeydown(e: KeyboardEvent, key: string): void {
    const enabled = this.tabs.filter((t) => !t.disabled);
    const idx = enabled.findIndex((t) => t.key === key);
    let next: TabItem | undefined;

    if (e.key === 'ArrowRight') next = enabled[idx + 1] ?? enabled[0];
    if (e.key === 'ArrowLeft')
      next = enabled[idx - 1] ?? enabled[enabled.length - 1];
    if (e.key === 'Home') next = enabled[0];
    if (e.key === 'End') next = enabled[enabled.length - 1];

    if (next) {
      e.preventDefault();
      this._select(next.key);
      // Move real focus to the newly-active tab button
      this.renderRoot
        .querySelector<HTMLButtonElement>(`[data-key="${next.key}"]`)
        ?.focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="tablist"
        role="tablist"
        part="tablist"
        aria-label=${this.getAttribute('aria-label') ?? 'Tabs'}
      >
        ${this.tabs.map((tab) => {
          const isActive = tab.key === this.active;
          return html`
            <button
              class="tab ${isActive ? 'active' : ''} ${tab.disabled
                ? 'disabled'
                : ''}"
              role="tab"
              data-key=${tab.key}
              aria-selected=${isActive ? 'true' : 'false'}
              aria-disabled=${tab.disabled ? 'true' : 'false'}
              tabindex=${isActive ? '0' : '-1'}
              part="tab ${isActive ? 'tab-active' : ''}"
              @click=${() => this._select(tab.key)}
              @keydown=${(e: KeyboardEvent) => this._onKeydown(e, tab.key)}
            >
              ${tab.label}
              ${tab.count !== undefined
                ? html`<span class="count">${tab.count}</span>`
                : null}
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-tabs': OvTabs;
  }
}
