import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvInputGroup } from './ov-input-group.js';
import './ov-input-group.js';
import '../../atoms/input/ov-input.js';
import '../../atoms/button/ov-button.js';

describe('ov-input-group', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders start, default, and end slots', async () => {
      const el = await fixture<OvInputGroup>(html`
        <ov-input-group>
          <ov-input placeholder="Search…"></ov-input>
          <ov-button slot="end" variant="primary">Go</ov-button>
        </ov-input-group>
      `);
      expect(el.shadowRoot!.querySelector('slot[name="start"]')).to.exist;
      expect(el.shadowRoot!.querySelector('slot:not([name])')).to.exist;
      expect(el.shadowRoot!.querySelector('slot[name="end"]')).to.exist;
    });

    it('projects slotted input into the default slot', async () => {
      const el = await fixture<OvInputGroup>(html`
        <ov-input-group>
          <ov-input id="inp" placeholder="Value"></ov-input>
        </ov-input-group>
      `);
      expect(el.querySelector('#inp')).to.exist;
    });

    it('projects start slot content', async () => {
      const el = await fixture<OvInputGroup>(html`
        <ov-input-group attach="start">
          <span slot="start" id="prefix">https://</span>
          <ov-input placeholder="domain.com"></ov-input>
        </ov-input-group>
      `);
      expect(el.querySelector('#prefix')).to.exist;
    });

    it('projects end slot content', async () => {
      const el = await fixture<OvInputGroup>(html`
        <ov-input-group>
          <ov-input placeholder="Search…"></ov-input>
          <ov-button slot="end" id="btn">Search</ov-button>
        </ov-input-group>
      `);
      expect(el.querySelector('#btn')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to attach="end"', async () => {
      const el = await fixture<OvInputGroup>(html`
        <ov-input-group>
          <ov-input placeholder="Search"></ov-input>
        </ov-input-group>
      `);
      expect(el.attach).to.equal('end');
    });

    it('reflects attach attribute', async () => {
      const el = await fixture<OvInputGroup>(html`
        <ov-input-group attach="both">
          <ov-input placeholder="Value"></ov-input>
        </ov-input-group>
      `);
      expect(el.getAttribute('attach')).to.equal('both');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for search group', async () => {
      const el = await fixture(html`
        <ov-input-group>
          <ov-input aria-label="Search" placeholder="Search…"></ov-input>
          <ov-button slot="end" variant="primary">Search</ov-button>
        </ov-input-group>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'aria-prohibited-attr', 'label'],
      });
    });
  });
});
