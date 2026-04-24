import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvSpinner } from './ov-spinner.js';
import './ov-spinner.js';

describe('ov-spinner', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders an SVG element', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      expect(el.shadowRoot!.querySelector('svg')).to.exist;
    });

    it('SVG has role="progressbar"', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      expect(el.shadowRoot!.querySelector('[role="progressbar"]')).to.exist;
    });

    it('renders a track circle and head path', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      expect(el.shadowRoot!.querySelector('circle.track')).to.exist;
      expect(el.shadowRoot!.querySelector('path.head')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to size="md"', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      expect(el.size).to.equal('md');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvSpinner>(
        html`<ov-spinner size="lg"></ov-spinner>`,
      );
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('defaults to tone="brand"', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      expect(el.tone).to.equal('brand');
    });

    it('reflects tone attribute', async () => {
      const el = await fixture<OvSpinner>(
        html`<ov-spinner tone="neutral"></ov-spinner>`,
      );
      expect(el.getAttribute('tone')).to.equal('neutral');
    });

    it('defaults label to "Loading"', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      expect(el.label).to.equal('Loading');
    });

    it('applies label as aria-label on SVG', async () => {
      const el = await fixture<OvSpinner>(
        html`<ov-spinner label="Saving changes"></ov-spinner>`,
      );
      expect(
        el.shadowRoot!.querySelector('svg')!.getAttribute('aria-label'),
      ).to.equal('Saving changes');
    });

    it('updates aria-label reactively', async () => {
      const el = await fixture<OvSpinner>(html`<ov-spinner></ov-spinner>`);
      el.label = 'Fetching data';
      await elementUpdated(el);
      expect(
        el.shadowRoot!.querySelector('svg')!.getAttribute('aria-label'),
      ).to.equal('Fetching data');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe', async () => {
      const el = await fixture(
        html`<ov-spinner label="Loading content"></ov-spinner>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
