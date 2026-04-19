import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvIcon } from './ov-icon.js';
import './ov-icon.js';

describe('ov-icon', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders an SVG for a built-in icon name', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="check"></ov-icon>`);
      expect(el.shadowRoot!.querySelector('svg')).to.exist;
    });

    it('renders slot content when name is empty', async () => {
      const el = await fixture<OvIcon>(html`
        <ov-icon>
          <svg id="custom" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
        </ov-icon>
      `);
      expect(el.querySelector('#custom')).to.exist;
      expect(el.shadowRoot!.querySelector('slot')).to.exist;
    });

    it('renders slot content when name is not a built-in', async () => {
      const el = await fixture<OvIcon>(html`
        <ov-icon name="">
          <svg id="fallback" viewBox="0 0 24 24"><rect width="24" height="24"/></svg>
        </ov-icon>
      `);
      expect(el.shadowRoot!.querySelector('slot')).to.exist;
    });

    it('renders different built-in icons', async () => {
      for (const name of ['x', 'search', 'plus', 'user', 'mail'] as const) {
        const el = await fixture<OvIcon>(html`<ov-icon name=${name}></ov-icon>`);
        expect(el.shadowRoot!.querySelector('svg'), `icon ${name} should render svg`).to.exist;
      }
    });
  });

  // ── ARIA ──────────────────────────────────────────────────────────────────

  describe('ARIA', () => {
    it('is aria-hidden by default (decorative)', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="check"></ov-icon>`);
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).to.equal('true');
    });

    it('sets role="img" and aria-label when label is provided', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="warning" label="Warning"></ov-icon>`);
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('role')).to.equal('img');
      expect(svg.getAttribute('aria-label')).to.equal('Warning');
    });

    it('removes aria-hidden when label is set', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="info" label="Info"></ov-icon>`);
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).to.not.equal('true');
    });

    it('updates aria attributes when label changes', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="check"></ov-icon>`);
      el.label = 'Done';
      await elementUpdated(el);
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('aria-label')).to.equal('Done');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects name attribute', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="search"></ov-icon>`);
      expect(el.getAttribute('name')).to.equal('search');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="check" size="xl"></ov-icon>`);
      expect(el.getAttribute('size')).to.equal('xl');
    });

    it('defaults to size="md"', async () => {
      const el = await fixture<OvIcon>(html`<ov-icon name="check"></ov-icon>`);
      expect(el.size).to.equal('md');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for decorative icon', async () => {
      const el = await fixture(html`<ov-icon name="check"></ov-icon>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for labelled icon', async () => {
      const el = await fixture(html`<ov-icon name="warning" label="Warning"></ov-icon>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
