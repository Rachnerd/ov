import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvRadio } from './ov-radio.js';
import './ov-radio.js';

describe('ov-radio', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a hidden native radio input', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="plan" value="free">Free</ov-radio>`,
      );
      expect(
        el.shadowRoot!.querySelector<HTMLInputElement>('input[type="radio"]'),
      ).to.exist;
    });

    it('projects label text through the default slot', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="plan" value="pro">Pro plan</ov-radio>`,
      );
      expect(el.textContent!.trim()).to.equal('Pro plan');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to unchecked', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="p" value="a">Option A</ov-radio>`,
      );
      expect(el.checked).to.be.false;
    });

    it('reflects checked attribute', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="p" value="a" checked>Option A</ov-radio>`,
      );
      expect(el.checked).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.checked)
        .to.be.true;
    });

    it('reflects disabled attribute', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="p" value="a" disabled>Option A</ov-radio>`,
      );
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.disabled)
        .to.be.true;
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "change" event with checked=true and value', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="plan" value="pro">Pro</ov-radio>`,
      );
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let detail: { checked: boolean; value: string } | null = null;
      el.addEventListener('change', (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(detail).to.deep.equal({ checked: true, value: 'pro' });
    });

    it('sets checked=true on the element after change', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="plan" value="pro">Pro</ov-radio>`,
      );
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await elementUpdated(el);
      expect(el.checked).to.be.true;
    });
  });

  // ── Group exclusivity ──────────────────────────────────────────────────────

  describe('group exclusivity', () => {
    it('unchecks sibling radios in the same group when selected', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <ov-radio name="plan" value="free" checked>Free</ov-radio>
          <ov-radio name="plan" value="pro">Pro</ov-radio>
        </div>
      `);

      const [free, pro] = Array.from(
        container.querySelectorAll<OvRadio>('ov-radio'),
      );
      const proInput =
        pro.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      proInput.dispatchEvent(new Event('change', { bubbles: true }));
      await elementUpdated(free!);

      expect(free!.checked).to.be.false;
      expect(pro.checked).to.be.true;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a radio group', async () => {
      const el = await fixture(html`
        <fieldset>
          <legend>Plan</legend>
          <ov-radio name="plan" value="free" checked>Free</ov-radio>
          <ov-radio name="plan" value="pro">Pro</ov-radio>
        </fieldset>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('native input is accessible (not display:none)', async () => {
      const el = await fixture<OvRadio>(
        html`<ov-radio name="p" value="a">Option</ov-radio>`,
      );
      const input = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;
      expect(getComputedStyle(input).display).to.not.equal('none');
    });
  });
});
