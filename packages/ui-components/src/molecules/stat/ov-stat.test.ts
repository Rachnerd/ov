import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvStat } from './ov-stat.js';
import './ov-stat.js';

describe('ov-stat', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders the label text', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat label="Total users" value="12,340"></ov-stat>`,
      );
      expect(
        el.shadowRoot!.querySelector('.label')!.textContent!.trim(),
      ).to.equal('Total users');
    });

    it('renders the value text', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat label="Revenue" value="$84,200"></ov-stat>`,
      );
      expect(
        el.shadowRoot!.querySelector('.value')!.textContent!.trim(),
      ).to.equal('$84,200');
    });

    it('renders delta text when set', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat
          label="Revenue"
          value="$84,200"
          delta="+14.3%"
        ></ov-stat>`,
      );
      expect(el.shadowRoot!.querySelector('.delta')).to.exist;
      expect(
        el.shadowRoot!.querySelector('.delta')!.textContent!.trim(),
      ).to.include('+14.3%');
    });

    it('does not render delta element when delta is empty', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat label="Users" value="100"></ov-stat>`,
      );
      expect(el.shadowRoot!.querySelector('.delta')).to.not.exist;
    });

    it('renders sublabel text when set', async () => {
      const el = await fixture<OvStat>(html`
        <ov-stat
          label="Revenue"
          value="$84,200"
          delta="+14%"
          trend="up"
          sublabel="vs last month"
        ></ov-stat>
      `);
      expect(
        el.shadowRoot!.querySelector('.sublabel')!.textContent!.trim(),
      ).to.equal('vs last month');
    });

    it('does not render sublabel when not set', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat label="Users" value="100"></ov-stat>`,
      );
      expect(el.shadowRoot!.querySelector('.sublabel')).to.not.exist;
    });

    it('renders an up-arrow SVG path for trend="up"', async () => {
      const el = await fixture<OvStat>(html`
        <ov-stat
          label="Revenue"
          value="$84,200"
          delta="+14%"
          trend="up"
        ></ov-stat>
      `);
      const path = el.shadowRoot!.querySelector('.delta path');
      expect(path).to.exist;
    });

    it('renders a down-arrow SVG path for trend="down"', async () => {
      const el = await fixture<OvStat>(html`
        <ov-stat
          label="Churn"
          value="2.1%"
          delta="-0.4%"
          trend="down"
        ></ov-stat>
      `);
      const path = el.shadowRoot!.querySelector('.delta path');
      expect(path).to.exist;
    });

    it('does not render an arrow SVG for trend="neutral"', async () => {
      const el = await fixture<OvStat>(html`
        <ov-stat
          label="Sessions"
          value="847"
          delta="0%"
          trend="neutral"
        ></ov-stat>
      `);
      // Arrow path should not exist in neutral mode
      expect(el.shadowRoot!.querySelector('.delta path')).to.not.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to trend="neutral"', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat label="Users" value="100"></ov-stat>`,
      );
      expect(el.trend).to.equal('neutral');
    });

    it('reflects trend attribute', async () => {
      const el = await fixture<OvStat>(
        html`<ov-stat label="Revenue" value="$84k" trend="up"></ov-stat>`,
      );
      expect(el.getAttribute('trend')).to.equal('up');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for basic stat', async () => {
      const el = await fixture(
        html`<ov-stat label="Total users" value="12,340"></ov-stat>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for stat with delta', async () => {
      const el = await fixture(html`
        <ov-stat
          label="Revenue"
          value="$84,200"
          delta="+14.3%"
          trend="up"
          sublabel="vs last month"
        ></ov-stat>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
