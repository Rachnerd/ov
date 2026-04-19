import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvLogo } from './ov-logo.js';
import './ov-logo.js';

describe('ov-logo', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders an <img> in shadow DOM', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo></ov-logo>`);
      expect(el.shadowRoot!.querySelector('img')).to.exist;
    });

    it('uses the OpenValue wordmark as src', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(img.getAttribute('src')).to.include('openvalue-tt-white');
    });

    it('has a non-empty alt attribute', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(img.alt).to.not.equal('');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to size="md"', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo></ov-logo>`);
      expect(el.size).to.equal('md');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="lg"></ov-logo>`);
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('sets the img height to 20 for size="xs"', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="xs"></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(Number(img.getAttribute('height'))).to.equal(20);
    });

    it('sets the img height to 28 for size="sm"', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="sm"></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(Number(img.getAttribute('height'))).to.equal(28);
    });

    it('sets the img height to 44 for size="md"', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="md"></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(Number(img.getAttribute('height'))).to.equal(44);
    });

    it('sets the img height to 72 for size="lg"', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="lg"></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(Number(img.getAttribute('height'))).to.equal(72);
    });

    it('sets the img height to 108 for size="xl"', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="xl"></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(Number(img.getAttribute('height'))).to.equal(108);
    });

    it('sets a proportional width derived from the aspect ratio', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="md"></ov-logo>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      const expectedWidth = Math.round(44 * (1614 / 298));
      expect(Number(img.getAttribute('width'))).to.equal(expectedWidth);
    });

    it('updates height reactively when size changes', async () => {
      const el = await fixture<OvLogo>(html`<ov-logo size="sm"></ov-logo>`);
      el.size = 'xl';
      await elementUpdated(el);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(Number(img.getAttribute('height'))).to.equal(108);
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe', async () => {
      const el = await fixture(html`<ov-logo></ov-logo>`);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
