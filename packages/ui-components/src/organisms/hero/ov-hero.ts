import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import '../../atoms/heading/ov-heading.js';

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
      :host {
        display: block;

        /* Local component tokens */
        --ov-hero-height: 36vh;
        --ov-hero-bg: var(--ov-charcoal);
        --ov-hero-clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
        --ov-hero-content-z: 1;
        --ov-hero-fg-muted: rgba(255, 255, 255, 0.8);
        --ov-hero-subheading-ls: 0.45em;
      }

      section {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--ov-hero-height);
        overflow: hidden;
        background: var(--ov-hero-bg);
        clip-path: var(--ov-hero-clip-path);
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
        background: var(--ov-hero-bg);
      }

      /* content layer */
      .content {
        position: relative;
        z-index: var(--ov-hero-content-z);
        text-align: center;
        padding: var(--ov-space-16) var(--ov-space-8) var(--ov-space-8);
        width: 100%;
      }

      /* subheading */
      .subheading {
        display: block;
        margin-top: var(--ov-space-3);
        font-size: var(--ov-fs-sm);
        font-weight: var(--ov-fw-regular);
        letter-spacing: var(--ov-hero-subheading-ls);
        text-transform: uppercase;
        color: var(--ov-hero-fg-muted);
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
        ${this.src
          ? html`
              <div
                class="bg"
                style="background-image: url('${this.src}')"
                role="img"
                aria-hidden="true"
                fetch-priority="high"
              ></div>
            `
          : nothing}

        <div
          class="overlay"
          style="opacity: ${this.overlay}"
          aria-hidden="true"
        ></div>

        <div class="content">
          <div class="logo-area"><slot name="logo"></slot></div>
          ${this.heading
            ? html`<ov-heading level="1" size="hero" tone="inverse"
                >${this.heading}</ov-heading
              >`
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
