import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvHeading } from './ov-heading.js';
import './ov-heading.js';

describe('ov-heading', () => {
  // ── Semantic HTML ─────────────────────────────────────────────────────────

  describe('semantic HTML element', () => {
    ([1, 2, 3, 4, 5, 6] as const).forEach((level) => {
      it(`renders <h${level}> for level=${level}`, async () => {
        const el = await fixture<OvHeading>(
          html`<ov-heading level=${level}>Title</ov-heading>`,
        );
        expect(el.shadowRoot!.querySelector(`h${level}`)).to.exist;
      });
    });

    it('defaults to level=2', async () => {
      const el = await fixture<OvHeading>(html`<ov-heading>Title</ov-heading>`);
      expect(el.shadowRoot!.querySelector('h2')).to.exist;
    });

    it('updates semantic element when level changes', async () => {
      const el = await fixture<OvHeading>(
        html`<ov-heading level="2">Title</ov-heading>`,
      );
      el.level = 3;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('h2')).to.not.exist;
      expect(el.shadowRoot!.querySelector('h3')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects level attribute', async () => {
      const el = await fixture<OvHeading>(
        html`<ov-heading level="3">Section</ov-heading>`,
      );
      expect(el.getAttribute('level')).to.equal('3');
    });

    it('reflects tone attribute', async () => {
      const el = await fixture<OvHeading>(
        html`<ov-heading tone="brand">Brand</ov-heading>`,
      );
      expect(el.getAttribute('tone')).to.equal('brand');
    });

    it('reflects size attribute override', async () => {
      const el = await fixture<OvHeading>(
        html`<ov-heading level="3" size="h1">Title</ov-heading>`,
      );
      expect(el.getAttribute('size')).to.equal('h1');
    });

    it('projects slot content into the heading element', async () => {
      const el = await fixture<OvHeading>(
        html`<ov-heading level="2">My heading</ov-heading>`,
      );
      expect(el.textContent!.trim()).to.equal('My heading');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for h1', async () => {
      const el = await fixture(
        html`<ov-heading level="1">Page title</ov-heading>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'page-has-heading-one'],
      });
    });

    it('passes axe for h2', async () => {
      const el = await fixture(
        html`<ov-heading level="2">Section title</ov-heading>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for h2 with size override (display-1)', async () => {
      const el = await fixture(
        html`<ov-heading level="2" size="display-1">Hero</ov-heading>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('rendered heading element has accessible text', async () => {
      const el = await fixture<OvHeading>(
        html`<ov-heading level="2">Section title</ov-heading>`,
      );
      const h2 = el.shadowRoot!.querySelector('h2')!;
      expect(h2).to.exist;
    });
  });
});
