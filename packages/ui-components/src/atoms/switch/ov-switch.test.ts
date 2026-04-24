import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvSwitch } from './ov-switch.js';
import './ov-switch.js';

describe('ov-switch', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders an input with role="switch"', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch>Dark mode</ov-switch>`,
      );
      expect(
        el.shadowRoot!.querySelector<HTMLInputElement>('input[role="switch"]'),
      ).to.exist;
    });

    it('renders the track element', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch>Dark mode</ov-switch>`,
      );
      expect(el.shadowRoot!.querySelector('.track')).to.exist;
    });

    it('projects label text', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch>Dark mode</ov-switch>`,
      );
      expect(el.textContent!.trim()).to.equal('Dark mode');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to unchecked', async () => {
      const el = await fixture<OvSwitch>(html`<ov-switch>Option</ov-switch>`);
      expect(el.checked).to.be.false;
    });

    it('reflects checked attribute', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch checked>Dark mode</ov-switch>`,
      );
      expect(el.checked).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.checked)
        .to.be.true;
    });

    it('reflects disabled attribute', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch disabled>Option</ov-switch>`,
      );
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.disabled)
        .to.be.true;
    });

    it('updates checked state reactively', async () => {
      const el = await fixture<OvSwitch>(html`<ov-switch>Option</ov-switch>`);
      el.checked = true;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.checked)
        .to.be.true;
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "change" event with checked=true when toggled on', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch value="notifications">Notifications</ov-switch>`,
      );
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let detail: { checked: boolean; value: string } | null = null;
      el.addEventListener('change', (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(detail).to.deep.equal({ checked: true, value: 'notifications' });
    });

    it('dispatches "change" event with checked=false when toggled off', async () => {
      const el = await fixture<OvSwitch>(
        html`<ov-switch checked value="on">Option</ov-switch>`,
      );
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let detail: { checked: boolean; value: string } | null = null;
      el.addEventListener('change', (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      input.checked = false;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(detail).to.deep.equal({ checked: false, value: 'on' });
    });

    it('updates checked property on toggle', async () => {
      const el = await fixture<OvSwitch>(html`<ov-switch>Option</ov-switch>`);
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await elementUpdated(el);

      expect(el.checked).to.be.true;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe with label text', async () => {
      const el = await fixture(
        html`<ov-switch>Enable notifications</ov-switch>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe when checked', async () => {
      const el = await fixture(html`<ov-switch checked>Dark mode</ov-switch>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe when disabled', async () => {
      const el = await fixture(
        html`<ov-switch disabled>Locked setting</ov-switch>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
