import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvImageCard } from './ov-image-card.js';
import './ov-image-card.js';

describe('ov-image-card', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a wrapping <a> element', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="Amsterdam"></ov-image-card>`);
      expect(el.shadowRoot!.querySelector('a')).to.exist;
    });

    it('renders a .header bar', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="Utrecht"></ov-image-card>`);
      expect(el.shadowRoot!.querySelector('.header')).to.exist;
    });

    it('renders the label in the header', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="Rotterdam"></ov-image-card>`);
      const header = el.shadowRoot!.querySelector('.header')!;
      expect(header.textContent).to.include('Rotterdam');
    });

    it('renders a .photo <img> element', async () => {
      const el = await fixture<OvImageCard>(html`
        <ov-image-card label="Eindhoven" src="/photos/eindhoven.jpg"></ov-image-card>
      `);
      expect(el.shadowRoot!.querySelector('img.photo')).to.exist;
    });

    it('sets the img src from the src property', async () => {
      const el = await fixture<OvImageCard>(html`
        <ov-image-card label="Eindhoven" src="/photos/eindhoven.jpg"></ov-image-card>
      `);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img.photo')!;
      expect(img.getAttribute('src')).to.equal('/photos/eindhoven.jpg');
    });

    it('sets alt="" on the photo so it is decorative (label carries the name)', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="Groningen"></ov-image-card>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img.photo')!;
      expect(img.alt).to.equal('');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults href to "#"', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="Amsterdam"></ov-image-card>`);
      expect(el.href).to.equal('#');
    });

    it('sets the anchor href from the href property', async () => {
      const el = await fixture<OvImageCard>(html`
        <ov-image-card label="Amsterdam" href="/cities/amsterdam"></ov-image-card>
      `);
      const a = el.shadowRoot!.querySelector<HTMLAnchorElement>('a')!;
      expect(a.getAttribute('href')).to.equal('/cities/amsterdam');
    });

    it('updates the label reactively', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="Amsterdam"></ov-image-card>`);
      el.label = 'Den Haag';
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.header')!.textContent).to.include('Den Haag');
    });

    it('updates src reactively', async () => {
      const el = await fixture<OvImageCard>(html`<ov-image-card label="X" src="/a.jpg"></ov-image-card>`);
      el.src = '/b.jpg';
      await elementUpdated(el);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img.photo')!;
      expect(img.getAttribute('src')).to.equal('/b.jpg');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe', async () => {
      const el = await fixture(html`
        <ov-image-card label="Amsterdam" href="/cities/amsterdam"></ov-image-card>
      `);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
