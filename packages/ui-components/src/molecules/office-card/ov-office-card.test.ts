import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvOfficeCard } from './ov-office-card.js';
import './ov-office-card.js';

describe('ov-office-card', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a wrapping <a> element', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="Amsterdam"></ov-office-card>`);
      expect(el.shadowRoot!.querySelector('a')).to.exist;
    });

    it('renders a .header bar', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="Utrecht"></ov-office-card>`);
      expect(el.shadowRoot!.querySelector('.header')).to.exist;
    });

    it('renders the label in the header', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="Rotterdam"></ov-office-card>`);
      const header = el.shadowRoot!.querySelector('.header')!;
      expect(header.textContent).to.include('Rotterdam');
    });

    it('renders a .photo <img> element', async () => {
      const el = await fixture<OvOfficeCard>(html`
        <ov-office-card label="Eindhoven" src="/offices/eindhoven.jpg"></ov-office-card>
      `);
      expect(el.shadowRoot!.querySelector('img.photo')).to.exist;
    });

    it('sets the img src from the src property', async () => {
      const el = await fixture<OvOfficeCard>(html`
        <ov-office-card label="Eindhoven" src="/offices/eindhoven.jpg"></ov-office-card>
      `);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img.photo')!;
      expect(img.getAttribute('src')).to.equal('/offices/eindhoven.jpg');
    });

    it('uses label as the img alt text', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="Groningen"></ov-office-card>`);
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img.photo')!;
      expect(img.alt).to.include('Groningen');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults href to "#"', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="Amsterdam"></ov-office-card>`);
      expect(el.href).to.equal('#');
    });

    it('sets the anchor href from the href property', async () => {
      const el = await fixture<OvOfficeCard>(html`
        <ov-office-card label="Amsterdam" href="/offices/amsterdam"></ov-office-card>
      `);
      const a = el.shadowRoot!.querySelector<HTMLAnchorElement>('a')!;
      expect(a.getAttribute('href')).to.equal('/offices/amsterdam');
    });

    it('updates the label reactively', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="Amsterdam"></ov-office-card>`);
      el.label = 'Den Haag';
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.header')!.textContent).to.include('Den Haag');
    });

    it('updates src reactively', async () => {
      const el = await fixture<OvOfficeCard>(html`<ov-office-card label="X" src="/a.jpg"></ov-office-card>`);
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
        <ov-office-card label="Amsterdam" href="/offices/amsterdam"></ov-office-card>
      `);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
