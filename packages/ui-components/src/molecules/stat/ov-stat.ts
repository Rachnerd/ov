import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { StatDelta } from '../../molecule-tokens.js';

/**
 * @element ov-stat
 */
@customElement('ov-stat')
export class OvStat extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) sublabel = '';
  @property({ type: String }) delta = '';
  @property({ type: String, reflect: true }) trend: StatDelta = 'neutral';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .stat {
        display: flex;
        flex-direction: column;
        gap: var(--ov-space-1);
      }

      .label {
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-medium);
        letter-spacing: var(--ov-ls-wider);
        text-transform: uppercase;
        color: var(--color-text-secondary);
      }

      .value {
        font-size: var(--ov-fs-2xl);
        font-weight: var(--ov-fw-semibold);
        line-height: var(--ov-lh-tight);
        letter-spacing: var(--ov-ls-tight);
        color: var(--color-text-primary);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: var(--ov-space-2);
        flex-wrap: wrap;
      }

      .delta {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: var(--ov-fs-xs);
        font-weight: var(--ov-fw-semibold);
      }
      :host([trend='up']) .delta {
        color: var(--color-success);
      }
      :host([trend='down']) .delta {
        color: var(--color-danger);
      }
      :host([trend='neutral']) .delta {
        color: var(--color-text-muted);
      }

      .delta svg {
        width: 12px;
        height: 12px;
      }

      .sublabel {
        font-size: var(--ov-fs-xs);
        color: var(--color-text-tertiary);
      }
    `,
  ];

  private _arrowPath(): TemplateResult | typeof nothing {
    if (this.trend === 'up')
      return html`<path
        d="M8 12V4m0 0L4 8m4-4l4 4"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />`;
    if (this.trend === 'down')
      return html`<path
        d="M8 4v8m0 0L4 8m4 4l4-4"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />`;
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="stat" part="stat">
        <div class="label">${this.label}</div>
        <div class="value">${this.value}</div>
        <div class="meta">
          ${this.delta
            ? html`
                <span class="delta">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    ${this._arrowPath()}
                  </svg>
                  ${this.delta}
                </span>
              `
            : nothing}
          ${this.sublabel
            ? html`<span class="sublabel">${this.sublabel}</span>`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-stat': OvStat;
  }
}
