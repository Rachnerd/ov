import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvLink } from './ov-link.js';
import './ov-link.js';

describe('ov-link', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders an <a> element in shadow DOM', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="/home">Home</ov-link>`);
      expect(el.shadowRoot!.querySelector('a')).to.exist;
    });

    it('forwards href to the anchor', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="/reports">Reports</ov-link>`);
      expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).to.equal('/reports');
    });

    it('projects slot content as link text', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="#">View details</ov-link>`);
      expect(el.textContent!.trim()).to.equal('View details');
    });

    it('defaults href to "#"', async () => {
      const el = await fixture<OvLink>(html`<ov-link>Click</ov-link>`);
      expect(el.shadowRoot!.querySelector('a')!.getAttribute('href')).to.equal('#');
    });

    it('sets target and rel on anchor', async () => {
      const el = await fixture<OvLink>(html`
        <ov-link href="https://example.com" target="_blank" rel="noopener noreferrer">External</ov-link>
      `);
      const a = el.shadowRoot!.querySelector('a')!;
      expect(a.getAttribute('target')).to.equal('_blank');
      expect(a.getAttribute('rel')).to.equal('noopener noreferrer');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to variant="default"', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="#">Link</ov-link>`);
      expect(el.variant).to.equal('default');
    });

    it('reflects variant attribute', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="#" variant="brand">Brand</ov-link>`);
      expect(el.getAttribute('variant')).to.equal('brand');
    });

    it('defaults to underline="hover"', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="#">Link</ov-link>`);
      expect(el.underline).to.equal('hover');
    });

    it('reflects underline attribute', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="#" underline="always">Link</ov-link>`);
      expect(el.getAttribute('underline')).to.equal('always');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvLink>(html`<ov-link href="#" size="lg">Link</ov-link>`);
      expect(el.getAttribute('size')).to.equal('lg');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a standard link', async () => {
      const el = await fixture(html`<ov-link href="/dashboard">Go to dashboard</ov-link>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for external link with rel', async () => {
      const el = await fixture(html`
        <ov-link href="https://example.com" target="_blank" rel="noopener noreferrer">External site</ov-link>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
