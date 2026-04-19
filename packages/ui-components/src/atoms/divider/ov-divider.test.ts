import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvDivider } from './ov-divider.js';
import './ov-divider.js';

describe('ov-divider', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a div with role="separator" for horizontal orientation', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider></ov-divider>`);
      expect(el.shadowRoot!.querySelector('[role="separator"]')).to.exist;
    });

    it('renders nothing visible for vertical orientation', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider orientation="vertical"></ov-divider>`);
      expect(el.shadowRoot!.querySelector('[role="separator"]')).to.not.exist;
    });

    it('renders slotted label text inside separator', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider>OR</ov-divider>`);
      expect(el.textContent!.trim()).to.equal('OR');
    });

    it('applies empty class when no slot content', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider></ov-divider>`);
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.empty')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to orientation="horizontal"', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider></ov-divider>`);
      expect(el.orientation).to.equal('horizontal');
    });

    it('reflects orientation attribute', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider orientation="vertical"></ov-divider>`);
      expect(el.getAttribute('orientation')).to.equal('vertical');
    });

    it('defaults to variant="default"', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider></ov-divider>`);
      expect(el.variant).to.equal('default');
    });

    it('reflects variant attribute', async () => {
      const el = await fixture<OvDivider>(html`<ov-divider variant="subtle"></ov-divider>`);
      expect(el.getAttribute('variant')).to.equal('subtle');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for plain horizontal divider', async () => {
      const el = await fixture(html`<ov-divider></ov-divider>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for divider with label', async () => {
      const el = await fixture(html`<ov-divider>OR</ov-divider>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
