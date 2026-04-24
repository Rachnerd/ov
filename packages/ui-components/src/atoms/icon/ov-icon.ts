import {
  LitElement,
  html,
  css,
  svg,
  type TemplateResult,
  type SVGTemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import {
  BUILT_IN_ICON_NAMES,
  type BuiltInIconName,
  type IconName,
  type IconSize,
  type SpinnerTone,
} from '../../tokens.js';

/**
 * Built-in icon paths. The record type is fixed to BuiltInIconName so adding
 * an entry to BUILT_IN_ICON_NAMES without a path (or vice versa) is a
 * compile error.
 *
 * Values are SVGTemplateResult, so Lit sanitises them safely — no innerHTML.
 */
const ICON_PATHS: Record<BuiltInIconName, SVGTemplateResult> = {
  check: svg`<path d="M4 8l3 3 5-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  x: svg`<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
  'arrow-right': svg`<path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  'arrow-left': svg`<path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  search: svg`<circle cx="7" cy="7" r="4" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M10 10l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  mail: svg`<rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M2.5 4l5.5 4.5L13.5 4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
  info: svg`<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 7v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="5" r="0.9" fill="currentColor"/>`,
  warning: svg`<path d="M8 2l6.5 11h-13z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="none"/><path d="M8 6v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="12" r="0.8" fill="currentColor"/>`,
  sun: svg`<circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1.1 1.1M11.9 11.9L13 13M3 13l1.1-1.1M11.9 4.1L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  moon: svg`<path d="M13 9.5A5.5 5.5 0 1 1 6.5 3a4.5 4.5 0 0 0 6.5 6.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>`,
  plus: svg`<path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  user: svg`<circle cx="8" cy="5.5" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2.5 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  menu: svg`<path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
};

/** Runtime type guard — narrows an arbitrary string to BuiltInIconName. */
function isBuiltInIcon(name: string): name is BuiltInIconName {
  return (BUILT_IN_ICON_NAMES as readonly string[]).includes(name);
}

/**
 * @element ov-icon
 *
 * Colour is always `currentColor` so icons inherit from text.
 */
@customElement('ov-icon')
export class OvIcon extends LitElement {
  @property({ type: String, reflect: true }) name: IconName = '';
  @property({ type: String, reflect: true }) size: IconSize = 'md';
  @property({ type: String }) label = '';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
        line-height: 0;
      }
      :host([size='sm']) {
        width: 12px;
        height: 12px;
      }
      :host([size='md']) {
        width: 16px;
        height: 16px;
      }
      :host([size='lg']) {
        width: 20px;
        height: 20px;
      }
      :host([size='xl']) {
        width: 24px;
        height: 24px;
      }

      svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      ::slotted(svg) {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  protected override render(): TemplateResult {
    const labelled = this.label.length > 0;

    if (this.name && isBuiltInIcon(this.name)) {
      return html`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          role=${labelled ? 'img' : 'presentation'}
          aria-label=${labelled ? this.label : ''}
          aria-hidden=${labelled ? 'false' : 'true'}
        >
          ${ICON_PATHS[this.name]}
        </svg>
      `;
    }
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-icon': OvIcon;
  }
}
