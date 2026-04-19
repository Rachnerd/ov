import { LitElement, html, css, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import type { InputGroupAttach } from '../../molecule-tokens.js';

/**
 * <ov-input-group>
 *
 * Visually fuses an ov-input with attached buttons or text adornments,
 * producing a single compound control (search bar, URL copier, promo-code
 * entry, unit suffix, etc.).
 *
 * The group collapses inner borders and border-radii so the combined
 * shape reads as one element. The input always fills remaining space.
 *
 * @element ov-input-group
 *
 * @slot        - The ov-input (required — exactly one).
 * @slot start  - ov-button or plain text attached to the left edge.
 * @slot end    - ov-button or plain text attached to the right edge.
 *
 * @example
 * ```html
 * <ov-input-group>
 *   <ov-input slot="start" value="https://" readonly></ov-input>
 *   <ov-input placeholder="your-domain.com"></ov-input>
 *   <ov-button slot="end">Copy</ov-button>
 * </ov-input-group>
 * ```
 */
@customElement('ov-input-group')
export class OvInputGroup extends LitElement {
  /**
   * Which sides have an attached adornment. Drives the border-radius
   * adjustment on the slotted input.
   * 'start' | 'end' | 'both'
   */
  @property({ type: String, reflect: true }) attach: InputGroupAttach = 'end';

  static override styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: stretch;
        width: 100%;
        max-height: 44px;
        overflow: hidden;
      }

      /* ---- Slot containers ---- */
      .slot-wrap {
        display: contents;   /* transparent wrapper so flex sees children directly */
      }

      /* All direct slot content aligns to a common height */
      ::slotted(ov-button),
      ::slotted(ov-input) {
        display: flex;
        align-self: stretch;
      }

      /* ---- Adornment text (non-interactive prefix/suffix labels) ---- */
      ::slotted([slot='start']),
      ::slotted([slot='end']) {
        display: inline-flex;
        align-items: center;
        background: var(--color-bg-surface-alt);
        border: 1px solid var(--color-control-border);
        font-size: var(--ov-fs-sm);
        color: var(--color-text-secondary);
        white-space: nowrap;
        flex: 0 0 auto;
        overflow: hidden;
      }

      /* Start adornment: left-rounded, no right border */
      ::slotted([slot='start']) {
        border-right: 0;
        border-radius: var(--ov-radius-md) 0 0 var(--ov-radius-md);
        padding: 0 var(--ov-space-4);
      }

      /* End adornment: right-rounded, no left border */
      ::slotted([slot='end']) {
        border-left: 0;
        border-radius: 0 var(--ov-radius-md) var(--ov-radius-md) 0;
      }

      /* Flatten input corners on the joining side via an inherited CSS custom property */
      :host([attach='end'])   ::slotted(ov-input) { --ov-input-radius: var(--ov-radius-md) 0 0 var(--ov-radius-md); }
      :host([attach='start']) ::slotted(ov-input) { --ov-input-radius: 0 var(--ov-radius-md) var(--ov-radius-md) 0; }
      :host([attach='both'])  ::slotted(ov-input) { --ov-input-radius: 0; }

      /* Buttons: flatten joining corners via CSS custom property, then overlap
         the input border by 1px so the two borders merge into one. */
      ::slotted(ov-button[slot='end']) {
        --ov-button-radius: 0 var(--ov-radius-md) var(--ov-radius-md) 0;
        margin-left: -1px;
        position: relative;
        z-index: 1;
      }
      ::slotted(ov-button[slot='start']) {
        --ov-button-radius: var(--ov-radius-md) 0 0 var(--ov-radius-md);
        margin-right: -1px;
        position: relative;
        z-index: 1;
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-input-group': OvInputGroup;
  }
}
