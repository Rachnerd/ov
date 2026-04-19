import { css, type CSSResult } from 'lit';
import type { LitElement } from 'lit';
import type { SelectionChangeDetail } from '../tokens.js';

export const selectionBase: CSSResult = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--ov-space-2);
    cursor: pointer;
    user-select: none;
    font-size: var(--ov-fs-sm);
    color: var(--color-text-primary);
  }
  :host([disabled]) { cursor: not-allowed; opacity: 0.5; }

  input {
    position: absolute;
    opacity: 0;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  label {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--ov-space-3);
    cursor: inherit;
  }
  input:focus-visible + .control,
  input:focus-visible + .track {
    box-shadow: var(--shadow-focus);
  }
`;

export function dispatchSelectionChange(
  el: LitElement,
  detail: SelectionChangeDetail,
): void {
  el.dispatchEvent(new CustomEvent<SelectionChangeDetail>('change', {
    detail, bubbles: true, composed: true,
  }));
}
