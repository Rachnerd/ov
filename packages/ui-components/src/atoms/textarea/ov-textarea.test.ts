import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvTextarea } from './ov-textarea.js';
import './ov-textarea.js';

describe('ov-textarea', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a native <textarea> in shadow DOM', async () => {
      const el = await fixture<OvTextarea>(html`<ov-textarea></ov-textarea>`);
      expect(el.shadowRoot!.querySelector('textarea')).to.exist;
    });

    it('forwards placeholder to native textarea', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea placeholder="Write here…"></ov-textarea>`,
      );
      expect(
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!
          .placeholder,
      ).to.equal('Write here…');
    });

    it('sets the initial rows value', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea rows="8"></ov-textarea>`,
      );
      expect(
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!.rows,
      ).to.equal(8);
    });

    it('defaults to 4 rows', async () => {
      const el = await fixture<OvTextarea>(html`<ov-textarea></ov-textarea>`);
      expect(
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!.rows,
      ).to.equal(4);
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects disabled attribute', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea disabled></ov-textarea>`,
      );
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!.disabled,
      ).to.be.true;
    });

    it('reflects readonly attribute', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea readonly></ov-textarea>`,
      );
      expect(el.hasAttribute('readonly')).to.be.true;
      expect(
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!.readOnly,
      ).to.be.true;
    });

    it('reflects invalid attribute', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea invalid></ov-textarea>`,
      );
      expect(el.hasAttribute('invalid')).to.be.true;
    });

    it('reflects resize attribute', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea resize="none"></ov-textarea>`,
      );
      expect(el.getAttribute('resize')).to.equal('none');
    });

    it('sets aria-invalid="true" on native textarea when invalid', async () => {
      const el = await fixture<OvTextarea>(
        html`<ov-textarea invalid></ov-textarea>`,
      );
      expect(
        el
          .shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!
          .getAttribute('aria-invalid'),
      ).to.equal('true');
    });

    it('sets aria-invalid="false" when not invalid', async () => {
      const el = await fixture<OvTextarea>(html`<ov-textarea></ov-textarea>`);
      expect(
        el
          .shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!
          .getAttribute('aria-invalid'),
      ).to.equal('false');
    });

    it('updates invalid reactively', async () => {
      const el = await fixture<OvTextarea>(html`<ov-textarea></ov-textarea>`);
      el.invalid = true;
      await elementUpdated(el);
      expect(
        el
          .shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!
          .getAttribute('aria-invalid'),
      ).to.equal('true');
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "input" event with value detail on keystroke', async () => {
      const el = await fixture<OvTextarea>(html`<ov-textarea></ov-textarea>`);
      const textarea =
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;

      let detail: { value: string } | null = null;
      el.addEventListener('input', (e) => {
        detail = (e as CustomEvent).detail;
      });

      textarea.value = 'Hello';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));

      expect(detail).to.not.be.null;
      expect(detail!.value).to.equal('Hello');
    });

    it('updates the value property on input', async () => {
      const el = await fixture<OvTextarea>(html`<ov-textarea></ov-textarea>`);
      const textarea =
        el.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!;
      textarea.value = 'New value';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      expect(el.value).to.equal('New value');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe when labelled via aria-label', async () => {
      const el = await fixture(
        html`<ov-textarea aria-label="Message"></ov-textarea>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'aria-prohibited-attr', 'label'],
      });
    });
  });
});
