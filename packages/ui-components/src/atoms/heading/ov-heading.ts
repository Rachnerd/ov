import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { HeadingLevel, HeadingSize, HeadingTone } from '../../tokens.js';

/**
 * @element ov-heading
 */
@customElement('ov-heading')
export class OvHeading extends LitElement {
  @property({ type: Number, reflect: true }) level: HeadingLevel = 2;

  /** Visual size override. Empty string → derived from level. */
  @property({ type: String, reflect: true }) size: HeadingSize = '';

  @property({ type: String, reflect: true }) tone: HeadingTone = 'primary';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        font-family: var(--ov-font-primary);
        color: var(--_tone, var(--color-text-primary));
        line-height: var(--ov-lh-snug);
        letter-spacing: var(--ov-ls-tight);
      }

      /* Tone */
      :host([tone='primary']) {
        --_tone: var(--color-text-primary);
      }
      :host([tone='secondary']) {
        --_tone: var(--color-text-secondary);
      }
      :host([tone='brand']) {
        --_tone: var(--color-brand);
      }
      :host([tone='accent']) {
        --_tone: var(--color-accent);
      }
      :host([tone='inverse']) {
        --_tone: var(--color-text-inverse);
      }

      /* Explicit sizes */
      :host([size='display-1']) :is(h1, h2, h3, h4, h5, h6) {
        font-weight: var(--ov-fw-light);
        font-size: var(--ov-fs-3xl);
        line-height: var(--ov-lh-tight);
        letter-spacing: var(--ov-ls-tighter);
      }
      :host([size='display-2']) :is(h1, h2, h3, h4, h5, h6) {
        font-weight: var(--ov-fw-light);
        font-size: var(--ov-fs-2xl);
        line-height: var(--ov-lh-tight);
        letter-spacing: var(--ov-ls-tight);
      }
      :host([size='h1']) :is(h1, h2, h3, h4, h5, h6) {
        font-weight: var(--ov-fw-semibold);
        font-size: var(--ov-fs-xl);
      }
      :host([size='h2']) :is(h1, h2, h3, h4, h5, h6) {
        font-weight: var(--ov-fw-semibold);
        font-size: var(--ov-fs-lg);
      }
      :host([size='h3']) :is(h1, h2, h3, h4, h5, h6) {
        font-weight: var(--ov-fw-medium);
        font-size: var(--ov-fs-md);
      }
      :host([size='h4']) :is(h1, h2, h3, h4, h5, h6) {
        font-weight: var(--ov-fw-medium);
        font-size: var(--ov-fs-base);
      }

      /* Defaults when size is unset */
      :host(:not([size])) h1 {
        font-weight: var(--ov-fw-semibold);
        font-size: var(--ov-fs-xl);
      }
      :host(:not([size])) h2 {
        font-weight: var(--ov-fw-semibold);
        font-size: var(--ov-fs-lg);
      }
      :host(:not([size])) h3 {
        font-weight: var(--ov-fw-medium);
        font-size: var(--ov-fs-md);
      }
      :host(:not([size])) h4 {
        font-weight: var(--ov-fw-medium);
        font-size: var(--ov-fs-base);
      }
      :host(:not([size])) h5 {
        font-weight: var(--ov-fw-medium);
        font-size: var(--ov-fs-sm);
      }
      :host(:not([size])) h6 {
        font-weight: var(--ov-fw-medium);
        font-size: var(--ov-fs-xs);
        text-transform: uppercase;
        letter-spacing: var(--ov-ls-wider);
      }
    `,
  ];

  protected override render(): TemplateResult {
    const lvl = Math.min(6, Math.max(1, this.level || 2)) as HeadingLevel;
    switch (lvl) {
      case 1:
        return html`<h1><slot></slot></h1>`;
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 5:
        return html`<h5><slot></slot></h5>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-heading': OvHeading;
  }
}
