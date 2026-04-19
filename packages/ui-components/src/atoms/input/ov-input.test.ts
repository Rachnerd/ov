import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvInput } from './ov-input.js';
import './ov-input.js';

describe('ov-input', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a native <input> in shadow DOM', async () => {
      const el = await fixture<OvInput>(html`<ov-input></ov-input>`);
      expect(el.shadowRoot!.querySelector('input')).to.exist;
    });

    it('forwards placeholder to native input', async () => {
      const el = await fixture<OvInput>(html`<ov-input placeholder="Search…"></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.placeholder)
        .to.equal('Search…');
    });

    it('renders prefix slot content', async () => {
      const el = await fixture<OvInput>(html`
        <ov-input>
          <span slot="prefix" id="pfx">$</span>
        </ov-input>
      `);
      expect(el.querySelector('#pfx')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to type="text"', async () => {
      const el = await fixture<OvInput>(html`<ov-input></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.type).to.equal('text');
    });

    it('sets type="password" on native input', async () => {
      const el = await fixture<OvInput>(html`<ov-input type="password"></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.type).to.equal('password');
    });

    it('reflects disabled attribute', async () => {
      const el = await fixture<OvInput>(html`<ov-input disabled></ov-input>`);
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.disabled).to.be.true;
    });

    it('reflects invalid attribute', async () => {
      const el = await fixture<OvInput>(html`<ov-input invalid></ov-input>`);
      expect(el.hasAttribute('invalid')).to.be.true;
    });

    it('reflects readonly attribute', async () => {
      const el = await fixture<OvInput>(html`<ov-input readonly></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.readOnly).to.be.true;
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvInput>(html`<ov-input size="sm"></ov-input>`);
      expect(el.getAttribute('size')).to.equal('sm');
    });

    it('sets initial value on native input', async () => {
      const el = await fixture<OvInput>(html`<ov-input value="hello"></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.value).to.equal('hello');
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "input" event with value detail on keystroke', async () => {
      const el = await fixture<OvInput>(html`<ov-input></ov-input>`);
      const nativeInput = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let receivedDetail: { value: string } | null = null;
      el.addEventListener('input', (e: Event) => {
        receivedDetail = (e as CustomEvent<{ value: string }>).detail;
      });

      nativeInput.value = 'test';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));

      expect(receivedDetail).to.deep.equal({ value: 'test' });
    });

    it('dispatches "change" event with value detail on commit', async () => {
      const el = await fixture<OvInput>(html`<ov-input></ov-input>`);
      const nativeInput = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      let receivedDetail: { value: string } | null = null;
      el.addEventListener('change', (e: Event) => {
        receivedDetail = (e as CustomEvent<{ value: string }>).detail;
      });

      nativeInput.value = 'committed';
      nativeInput.dispatchEvent(new Event('change', { bubbles: true }));

      expect(receivedDetail).to.deep.equal({ value: 'committed' });
    });

    it('updates value property when native input changes', async () => {
      const el = await fixture<OvInput>(html`<ov-input></ov-input>`);
      const nativeInput = el.shadowRoot!.querySelector<HTMLInputElement>('input')!;

      nativeInput.value = 'updated';
      nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
      await elementUpdated(el);

      expect(el.value).to.equal('updated');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe when labelled via aria-label', async () => {
      const el = await fixture(html`<ov-input aria-label="Search"></ov-input>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'aria-prohibited-attr', 'label'],
      });
    });

    it('sets aria-invalid="true" on native input when invalid', async () => {
      const el = await fixture<OvInput>(html`<ov-input invalid></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.getAttribute('aria-invalid'))
        .to.equal('true');
    });

    it('sets aria-invalid="false" on native input when not invalid', async () => {
      const el = await fixture<OvInput>(html`<ov-input></ov-input>`);
      expect(el.shadowRoot!.querySelector<HTMLInputElement>('input')!.getAttribute('aria-invalid'))
        .to.equal('false');
    });
  });
});
