import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvBadge } from './ov-badge.js';
import './ov-badge.js';

describe('ov-badge', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders badge content through default slot', async () => {
      const el = await fixture<OvBadge>(html`<ov-badge>Published</ov-badge>`);
      expect(el.textContent!.trim()).to.equal('Published');
    });

    it('renders the inner .b element', async () => {
      const el = await fixture<OvBadge>(html`<ov-badge>New</ov-badge>`);
      expect(el.shadowRoot!.querySelector('.b')).to.exist;
    });

    it('hides the default dot when no dot slot content is provided', async () => {
      const el = await fixture<OvBadge>(html`<ov-badge>New</ov-badge>`);
      await elementUpdated(el);
      const dot = el.shadowRoot!.querySelector<HTMLElement>('.dot')!;
      expect(dot.style.display).to.equal('none');
    });

    it('shows a slotted dot element', async () => {
      const el = await fixture<OvBadge>(html`
        <ov-badge variant="success">
          <span slot="dot" id="status-dot"></span>
          Online
        </ov-badge>
      `);
      expect(el.querySelector('#status-dot')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to variant="default"', async () => {
      const el = await fixture<OvBadge>(html`<ov-badge>Tag</ov-badge>`);
      expect(el.getAttribute('variant')).to.equal('default');
    });

    it('reflects variant attribute', async () => {
      const el = await fixture<OvBadge>(
        html`<ov-badge variant="success">Active</ov-badge>`,
      );
      expect(el.getAttribute('variant')).to.equal('success');
    });

    it('reflects appearance attribute', async () => {
      const el = await fixture<OvBadge>(
        html`<ov-badge appearance="solid">Solid</ov-badge>`,
      );
      expect(el.getAttribute('appearance')).to.equal('solid');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvBadge>(
        html`<ov-badge size="sm">Small</ov-badge>`,
      );
      expect(el.getAttribute('size')).to.equal('sm');
    });

    it('reflects pill attribute — true by default', async () => {
      const el = await fixture<OvBadge>(html`<ov-badge>Pill</ov-badge>`);
      expect(el.pill).to.be.true;
      expect(el.hasAttribute('pill')).to.be.true;
    });

    it('reflects pill=false when set', async () => {
      const el = await fixture<OvBadge>(
        html`<ov-badge .pill=${false}>Square</ov-badge>`,
      );
      expect(el.pill).to.be.false;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a default badge', async () => {
      const el = await fixture(html`<ov-badge>Draft</ov-badge>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for success variant', async () => {
      const el = await fixture(
        html`<ov-badge variant="success">Published</ov-badge>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for solid appearance', async () => {
      const el = await fixture(
        html`<ov-badge variant="danger" appearance="solid">Critical</ov-badge>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
