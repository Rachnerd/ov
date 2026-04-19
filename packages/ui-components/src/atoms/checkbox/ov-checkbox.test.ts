import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvCheckbox } from './ov-checkbox.js';
import './ov-checkbox.js';

describe('ov-checkbox', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a hidden native checkbox input', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Accept</ov-checkbox>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input[type="checkbox"]');
      expect(input).to.exist;
    });

    it('renders a visual control element', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Accept</ov-checkbox>`);
      expect(el.shadowRoot!.querySelector('.control')).to.exist;
    });

    it('projects label text through the default slot', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Accept terms</ov-checkbox>`);
      expect(el.textContent!.trim()).to.equal('Accept terms');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to unchecked', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Accept</ov-checkbox>`);
      expect(el.checked).to.be.false;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.checked).to.be.false;
    });

    it('reflects checked attribute when set initially', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox checked>Accept</ov-checkbox>`);
      expect(el.checked).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.checked).to.be.true;
    });

    it('reflects disabled attribute', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox disabled>Accept</ov-checkbox>`);
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.disabled).to.be.true;
    });

    it('updates native indeterminate from property', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Select all</ov-checkbox>`);
      el.indeterminate = true;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.indeterminate).to.be.true;
    });

    it('updates checked reactively', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Accept</ov-checkbox>`);
      el.checked = true;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.checked).to.be.true;
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "change" event with checked=true when checked', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox value="accepted">Accept</ov-checkbox>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let detail: { checked: boolean; value: string } | null = null;
      el.addEventListener('change', (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(detail).to.deep.equal({ checked: true, value: 'accepted' });
    });

    it('dispatches "change" event with checked=false when unchecked', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox checked value="on">Accept</ov-checkbox>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let detail: { checked: boolean; value: string } | null = null;
      el.addEventListener('change', (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      input.checked = false;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(detail).to.deep.equal({ checked: false, value: 'on' });
    });

    it('clears indeterminate state on change', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox indeterminate>Select all</ov-checkbox>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await elementUpdated(el);

      expect(el.indeterminate).to.be.false;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe with label text', async () => {
      const el = await fixture(html`<ov-checkbox>Receive newsletters</ov-checkbox>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe when disabled', async () => {
      const el = await fixture(html`<ov-checkbox disabled>Disabled option</ov-checkbox>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('native input is visually hidden but accessible', async () => {
      const el = await fixture<OvCheckbox>(html`<ov-checkbox>Accept</ov-checkbox>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
      const style = getComputedStyle(input);
      // Input must be opacity:0 or positioned off-screen, not display:none
      // (display:none would hide it from screen readers)
      expect(style.display).to.not.equal('none');
    });
  });
});
