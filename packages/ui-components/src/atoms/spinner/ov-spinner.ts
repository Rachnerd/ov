import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { IconSize, SpinnerTone } from '../../tokens.js';

/**
 * @element ov-spinner
 */
@customElement('ov-spinner')
export class OvSpinner extends LitElement {
  @property({ type: String, reflect: true }) size: IconSize = 'md';
  @property({ type: String, reflect: true }) tone: SpinnerTone = 'brand';
  @property({ type: String }) label = 'Loading';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        --_color: var(--color-brand);
      }
      :host([size='sm']) {
        width: 14px;
        height: 14px;
      }
      :host([size='md']) {
        width: 20px;
        height: 20px;
      }
      :host([size='lg']) {
        width: 32px;
        height: 32px;
      }
      :host([size='xl']) {
        width: 40px;
        height: 40px;
      }

      :host([tone='neutral']) {
        --_color: var(--color-text-secondary);
      }
      :host([tone='inverse']) {
        --_color: var(--color-text-inverse);
      }

      svg {
        width: 100%;
        height: 100%;
        animation: spin 0.9s linear infinite;
      }
      circle.track {
        stroke: var(--_color);
        stroke-opacity: 0.2;
      }
      path.head {
        stroke: var(--_color);
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <svg
        viewBox="0 0 24 24"
        fill="none"
        role="progressbar"
        aria-label=${this.label}
        aria-valuetext=${this.label}
      >
        <circle class="track" cx="12" cy="12" r="9" stroke-width="3" />
        <path
          class="head"
          d="M21 12a9 9 0 0 0-9-9"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-spinner': OvSpinner;
  }
}
