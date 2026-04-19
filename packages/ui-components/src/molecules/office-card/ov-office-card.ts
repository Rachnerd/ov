import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import '@ov/ui-components/atoms/icon/ov-icon';

/**
 * <ov-office-card>
 *
 * A card displaying a city office: a dark header bar with the city name
 * and an arrow icon, plus a city photo below with a hover zoom effect.
 *
 * @element ov-office-card
 */
@customElement('ov-office-card')
export class OvOfficeCard extends LitElement {
  /** City or location name shown in the header bar. */
  @property({ type: String }) label = '';

  /** URL of the city photo. */
  @property({ type: String }) src = '';

  /** Link destination when the card is clicked. */
  @property({ type: String }) href = '#';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        flex: 0 0 auto;
      }

      a {
        display: block;
        text-decoration: none;
        border-radius: var(--ov-radius-lg, 12px);
        overflow: hidden;
        background: var(--ov-charcoal, #1e2330);
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--ov-space-4) var(--ov-space-5);
        background: var(--ov-charcoal, #1e2330);
      }

      .city-name {
        font-family: inherit;
        font-size: var(--ov-fs-base);
        font-weight: var(--ov-fw-semibold, 600);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: white;
        margin: 0;
      }

      .arrow {
        color: white;
        opacity: 0.7;
        transition: opacity var(--ov-duration-fast, 150ms),
                    transform var(--ov-duration-fast, 150ms);
      }

      .photo {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        transition: transform 400ms ease;
        max-height: 240px;
      }

      a:hover .photo {
        transform: scale(1.05);
      }

      a:hover .arrow {
        opacity: 1;
        transform: translateX(3px);
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <a href="${this.href}">
        <div class="header">
          <span class="city-name">${this.label}</span>
          <ov-icon class="arrow" name="arrow-right" size="md"></ov-icon>
        </div>
        <img class="photo" src="${this.src}" alt="${this.label} office" loading="lazy" />
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-office-card': OvOfficeCard;
  }
}
