import { LitElement, html, css, type TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { TextVariant, Tone, FontWeight, TextTag } from '../../tokens.js';

/**
 * @element ov-text
 */
@customElement('ov-text')
export class OvText extends LitElement {
  @property({ type: String, reflect: true }) variant: TextVariant = 'body';
  @property({ type: String, reflect: true }) tone: Tone = 'primary';
  @property({ type: String, reflect: true }) weight: FontWeight = '';
  @property({ type: String }) as: TextTag = 'span';

  static override styles = [
    baseStyles,
    css`
      :host { display: inline; }
      :host([as='p']), :host([as='div']) { display: block; }

      .t {
        font-family: var(--ov-font-primary);
        color: var(--_tone, var(--color-text-primary));
        font-weight: var(--_weight, var(--ov-fw-regular));
      }

      :host([variant='body'])    .t { font-size: var(--ov-fs-base); line-height: var(--ov-lh-normal); }
      :host([variant='body-sm']) .t { font-size: var(--ov-fs-sm);   line-height: var(--ov-lh-normal); }
      :host([variant='caption']) .t { font-size: var(--ov-fs-xs);   line-height: var(--ov-lh-normal); color: var(--_tone, var(--color-text-tertiary)); }
      :host([variant='lead'])    .t { font-size: var(--ov-fs-md);   line-height: var(--ov-lh-relaxed); color: var(--_tone, var(--color-text-secondary)); }
      :host([variant='eyebrow']) .t {
        font-size: var(--ov-fs-xs);
        font-weight: var(--_weight, var(--ov-fw-medium));
        letter-spacing: var(--ov-ls-widest);
        text-transform: uppercase;
        color: var(--_tone, var(--color-text-secondary));
      }
      :host([variant='code']) .t {
        font-family: var(--ov-font-mono);
        font-size: 0.9em;
        background: var(--color-bg-surface-muted);
        padding: 0.15em 0.4em;
        border-radius: var(--ov-radius-xs);
      }

      /* Tones */
      :host([tone='primary'])   { --_tone: var(--color-text-primary); }
      :host([tone='secondary']) { --_tone: var(--color-text-secondary); }
      :host([tone='tertiary'])  { --_tone: var(--color-text-tertiary); }
      :host([tone='muted'])     { --_tone: var(--color-text-muted); }
      :host([tone='brand'])     { --_tone: var(--color-brand); }
      :host([tone='accent'])    { --_tone: var(--color-accent); }
      :host([tone='success'])   { --_tone: var(--color-success); }
      :host([tone='warning'])   { --_tone: var(--color-warning); }
      :host([tone='danger'])    { --_tone: var(--color-danger); }
      :host([tone='inverse'])   { --_tone: var(--color-text-inverse); }

      /* Weight */
      :host([weight='light'])    { --_weight: var(--ov-fw-light); }
      :host([weight='regular'])  { --_weight: var(--ov-fw-regular); }
      :host([weight='medium'])   { --_weight: var(--ov-fw-medium); }
      :host([weight='semibold']) { --_weight: var(--ov-fw-semibold); }
      :host([weight='bold'])     { --_weight: var(--ov-fw-bold); }
    `,
  ];

  protected override render(): TemplateResult | typeof nothing {
    switch (this.as) {
      case 'p':      return html`<p class="t"><slot></slot></p>`;
      case 'div':    return html`<div class="t"><slot></slot></div>`;
      case 'small':  return html`<small class="t"><slot></slot></small>`;
      case 'strong': return html`<strong class="t"><slot></slot></strong>`;
      case 'em':     return html`<em class="t"><slot></slot></em>`;
      case 'span':   return html`<span class="t"><slot></slot></span>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-text': OvText;
  }
}
