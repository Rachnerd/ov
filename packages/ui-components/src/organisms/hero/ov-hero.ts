import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';

/**
 * <ov-hero>
 *
 * Full-width hero section. All typography (heading size, letter-spacing,
 * uppercase treatment, colour) is encapsulated. Consumers pass text via
 * props and optional CTA buttons via the `actions` slot.
 *
 * @element ov-hero
 *
 * @slot logo    - Brand logo displayed above the heading / subheading (e.g. ov-logo).
 * @slot actions - Optional CTA buttons / links displayed below the subheading.
 */
@customElement('ov-hero')
export class OvHero extends LitElement {
  /** Main display heading text. */
  @property({ type: String }) heading = '';

  /** Subtitle rendered below the heading. */
  @property({ type: String }) subheading = '';

  /** Background image URL. Omit for a solid dark fill. */
  @property({ type: String }) src = '';

  /** Opacity of the dark overlay placed on top of the image (0–1). */
  @property({ type: Number }) overlay = 0.55;

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }

      section {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36vh;
        overflow: hidden;
        background: var(--ov-charcoal, #1e2330);
        /* diagonal bottom edge */
        clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
      }

      /* background image layer */
      .bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      /* dark overlay */
      .overlay {
        position: absolute;
        inset: 0;
        background: var(--ov-charcoal, #1e2330);
      }

      /* content layer */
      .content {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: var(--ov-space-16) var(--ov-space-8) var(--ov-space-8);
        width: 100%;
      }

      /* heading */
      .heading {
        margin: 0;
        font-family: inherit;
        font-size: clamp(3rem, 10vw, 7rem);
        font-weight: var(--ov-fw-bold, 700);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: white;
        line-height: var(--ov-lh-none);
      }

      /* subheading */
      .subheading {
        display: block;
        margin-top: var(--ov-space-3);
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-regular, 400);
        letter-spacing: 0.45em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.8);
      }

      /* logo slot wrapper */
      .logo-area {
        display: flex;
        justify-content: center;
        margin-bottom: var(--ov-space-4);
      }

      /* actions slot wrapper */
      .actions {
        display: flex;
        gap: var(--ov-space-3);
        justify-content: center;
        margin-top: var(--ov-space-8);
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <section aria-label="Hero">

        ${this.src ? html`
          <div
            class="bg"
            style="background-image: url('${this.src}')"
            role="img"
            aria-hidden="true"
          ></div>
        ` : nothing}

        <div
          class="overlay"
          style="opacity: ${this.overlay}"
          aria-hidden="true"
        ></div>

        <div class="content">
          <div class="logo-area"><slot name="logo"></slot></div>
          ${this.heading
            ? html`<h1 class="heading">${this.heading}</h1>`
            : nothing}
          ${this.subheading
            ? html`<span class="subheading">${this.subheading}</span>`
            : nothing}
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>

      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-hero': OvHero;
  }
}
