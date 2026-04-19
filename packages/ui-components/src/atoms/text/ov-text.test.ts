import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvText } from './ov-text.js';
import './ov-text.js';

describe('ov-text', () => {
  // ── Semantic element ──────────────────────────────────────────────────────

  describe('semantic element rendering', () => {
    it('renders a <span> by default', async () => {
      const el = await fixture<OvText>(html`<ov-text>Hello</ov-text>`);
      expect(el.shadowRoot!.querySelector('span.t')).to.exist;
    });

    it('renders <p> when as="p"', async () => {
      const el = await fixture<OvText>(html`<ov-text as="p">Paragraph</ov-text>`);
      expect(el.shadowRoot!.querySelector('p.t')).to.exist;
    });

    it('renders <div> when as="div"', async () => {
      const el = await fixture<OvText>(html`<ov-text as="div">Block</ov-text>`);
      expect(el.shadowRoot!.querySelector('div.t')).to.exist;
    });

    it('renders <strong> when as="strong"', async () => {
      const el = await fixture<OvText>(html`<ov-text as="strong">Bold</ov-text>`);
      expect(el.shadowRoot!.querySelector('strong.t')).to.exist;
    });

    it('renders <em> when as="em"', async () => {
      const el = await fixture<OvText>(html`<ov-text as="em">Italic</ov-text>`);
      expect(el.shadowRoot!.querySelector('em.t')).to.exist;
    });

    it('renders <small> when as="small"', async () => {
      const el = await fixture<OvText>(html`<ov-text as="small">Fine print</ov-text>`);
      expect(el.shadowRoot!.querySelector('small.t')).to.exist;
    });

    it('projects slot content', async () => {
      const el = await fixture<OvText>(html`<ov-text>Hello world</ov-text>`);
      expect(el.textContent!.trim()).to.equal('Hello world');
    });

    it('updates element when as changes', async () => {
      const el = await fixture<OvText>(html`<ov-text as="span">Text</ov-text>`);
      el.as = 'p';
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('p.t')).to.exist;
      expect(el.shadowRoot!.querySelector('span.t')).to.not.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to variant="body"', async () => {
      const el = await fixture<OvText>(html`<ov-text>Text</ov-text>`);
      expect(el.variant).to.equal('body');
    });

    it('reflects variant attribute', async () => {
      const el = await fixture<OvText>(html`<ov-text variant="caption">Caption</ov-text>`);
      expect(el.getAttribute('variant')).to.equal('caption');
    });

    it('reflects tone attribute', async () => {
      const el = await fixture<OvText>(html`<ov-text tone="danger">Error text</ov-text>`);
      expect(el.getAttribute('tone')).to.equal('danger');
    });

    it('reflects weight attribute', async () => {
      const el = await fixture<OvText>(html`<ov-text weight="semibold">Notice</ov-text>`);
      expect(el.getAttribute('weight')).to.equal('semibold');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for body variant', async () => {
      const el = await fixture(html`<ov-text variant="body" as="p">Standard copy.</ov-text>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for eyebrow variant', async () => {
      const el = await fixture(html`<ov-text variant="eyebrow">Market Update</ov-text>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for code variant', async () => {
      const el = await fixture(html`<ov-text variant="code">portfolio.sync()</ov-text>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
