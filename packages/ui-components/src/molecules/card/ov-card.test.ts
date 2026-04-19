import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvCard } from './ov-card.js';
import './ov-card.js';

describe('ov-card', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a root .card div', async () => {
      const el = await fixture<OvCard>(html`<ov-card>Body</ov-card>`);
      expect(el.shadowRoot!.querySelector('.card')).to.exist;
    });

    it('projects default slot content into the body region', async () => {
      const el = await fixture<OvCard>(html`<ov-card><p id="body-text">Hello</p></ov-card>`);
      expect(el.querySelector('#body-text')).to.exist;
    });

    it('projects header slot content', async () => {
      const el = await fixture<OvCard>(html`
        <ov-card>
          <span slot="header" id="hdr">Card Title</span>
          Body
        </ov-card>
      `);
      expect(el.querySelector('#hdr')).to.exist;
    });

    it('projects footer slot content', async () => {
      const el = await fixture<OvCard>(html`
        <ov-card>
          Body
          <button slot="footer" id="ftr">Action</button>
        </ov-card>
      `);
      expect(el.querySelector('#ftr')).to.exist;
    });

    it('projects media slot content', async () => {
      const el = await fixture<OvCard>(html`
        <ov-card>
          <img slot="media" id="media-img" src="/img.jpg" alt="Photo">
          Body
        </ov-card>
      `);
      expect(el.querySelector('#media-img')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to variant="default"', async () => {
      const el = await fixture<OvCard>(html`<ov-card>Body</ov-card>`);
      expect(el.variant).to.equal('default');
    });

    it('reflects variant attribute', async () => {
      const el = await fixture<OvCard>(html`<ov-card variant="brand">Body</ov-card>`);
      expect(el.getAttribute('variant')).to.equal('brand');
    });

    it('reflects interactive attribute', async () => {
      const el = await fixture<OvCard>(html`<ov-card interactive>Body</ov-card>`);
      expect(el.hasAttribute('interactive')).to.be.true;
    });

    it('reflects borderless attribute', async () => {
      const el = await fixture<OvCard>(html`<ov-card borderless>Body</ov-card>`);
      expect(el.hasAttribute('borderless')).to.be.true;
    });

    it('reflects flush attribute', async () => {
      const el = await fixture<OvCard>(html`<ov-card flush>Body</ov-card>`);
      expect(el.hasAttribute('flush')).to.be.true;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for default card', async () => {
      const el = await fixture(html`<ov-card>Card content.</ov-card>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for card with header and footer', async () => {
      const el = await fixture(html`
        <ov-card>
          <span slot="header">Title</span>
          Body content.
          <button slot="footer">Action</button>
        </ov-card>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
