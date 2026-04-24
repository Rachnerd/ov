import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvLabel } from './ov-label.js';
import './ov-label.js';

describe('ov-label', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a <label> element in shadow DOM', async () => {
      const el = await fixture<OvLabel>(html`<ov-label>Email</ov-label>`);
      expect(el.shadowRoot!.querySelector('label')).to.exist;
    });

    it('projects slot content into the label', async () => {
      const el = await fixture<OvLabel>(
        html`<ov-label>Email address</ov-label>`,
      );
      expect(el.textContent!.trim()).to.equal('Email address');
    });

    it('renders required asterisk when required', async () => {
      const el = await fixture<OvLabel>(
        html`<ov-label required>Name</ov-label>`,
      );
      expect(el.shadowRoot!.querySelector('.required')).to.exist;
    });

    it('does not render required asterisk by default', async () => {
      const el = await fixture<OvLabel>(html`<ov-label>Name</ov-label>`);
      expect(el.shadowRoot!.querySelector('.required')).to.not.exist;
    });

    it('renders hint slot content when provided', async () => {
      const el = await fixture<OvLabel>(html`
        <ov-label>
          Password
          <span slot="hint" id="hint-text">Min. 8 characters</span>
        </ov-label>
      `);
      expect(el.querySelector('#hint-text')).to.exist;
    });

    it('sets for attribute on the inner label element', async () => {
      const el = await fixture<OvLabel>(
        html`<ov-label for="email-input">Email</ov-label>`,
      );
      expect(
        el.shadowRoot!.querySelector('label')!.getAttribute('for'),
      ).to.equal('email-input');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects required attribute', async () => {
      const el = await fixture<OvLabel>(
        html`<ov-label required>Name</ov-label>`,
      );
      expect(el.hasAttribute('required')).to.be.true;
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvLabel>(
        html`<ov-label size="sm">Search</ov-label>`,
      );
      expect(el.getAttribute('size')).to.equal('sm');
    });

    it('defaults to size="md"', async () => {
      const el = await fixture<OvLabel>(html`<ov-label>Email</ov-label>`);
      expect(el.size).to.equal('md');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a basic label', async () => {
      const el = await fixture(html`
        <div>
          <ov-label for="t">Email address</ov-label>
          <input id="t" type="email" />
        </div>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'label'],
      });
    });

    it('required asterisk is aria-hidden', async () => {
      const el = await fixture<OvLabel>(
        html`<ov-label required>Name</ov-label>`,
      );
      expect(
        el.shadowRoot!.querySelector('.required')!.getAttribute('aria-hidden'),
      ).to.equal('true');
    });
  });
});
