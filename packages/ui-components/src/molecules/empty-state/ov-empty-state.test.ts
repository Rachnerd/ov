import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvEmptyState } from './ov-empty-state.js';
import './ov-empty-state.js';

describe('ov-empty-state', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders the heading text', async () => {
      const el = await fixture<OvEmptyState>(html`
        <ov-empty-state heading="No results found"></ov-empty-state>
      `);
      expect(el.shadowRoot!.querySelector('.heading')!.textContent!.trim()).to.equal('No results found');
    });

    it('renders the description text', async () => {
      const el = await fixture<OvEmptyState>(html`
        <ov-empty-state heading="Empty" description="Nothing here yet."></ov-empty-state>
      `);
      expect(el.shadowRoot!.querySelector('.description')!.textContent!.trim()).to.equal('Nothing here yet.');
    });

    it('renders default dashed-box icon when no icon prop is set', async () => {
      const el = await fixture<OvEmptyState>(html`
        <ov-empty-state heading="Empty"></ov-empty-state>
      `);
      expect(el.shadowRoot!.querySelector('.icon-wrap svg')).to.exist;
    });

    it('does not render heading when heading is empty', async () => {
      const el = await fixture<OvEmptyState>(html`<ov-empty-state></ov-empty-state>`);
      expect(el.shadowRoot!.querySelector('.heading')).to.not.exist;
    });

    it('does not render description when description is empty', async () => {
      const el = await fixture<OvEmptyState>(html`<ov-empty-state heading="Empty"></ov-empty-state>`);
      expect(el.shadowRoot!.querySelector('.description')).to.not.exist;
    });

    it('projects actions slot content', async () => {
      const el = await fixture<OvEmptyState>(html`
        <ov-empty-state heading="Empty">
          <button slot="actions" id="cta">Create</button>
        </ov-empty-state>
      `);
      expect(el.querySelector('#cta')).to.exist;
    });

    it('projects icon slot content', async () => {
      const el = await fixture<OvEmptyState>(html`
        <ov-empty-state heading="Empty">
          <img slot="icon" id="custom-icon" src="/empty.svg" alt="">
        </ov-empty-state>
      `);
      expect(el.querySelector('#custom-icon')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to size="md"', async () => {
      const el = await fixture<OvEmptyState>(html`<ov-empty-state heading="Empty"></ov-empty-state>`);
      expect(el.size).to.equal('md');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<OvEmptyState>(html`<ov-empty-state heading="Empty" size="lg"></ov-empty-state>`);
      expect(el.getAttribute('size')).to.equal('lg');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for basic empty state', async () => {
      const el = await fixture(html`
        <ov-empty-state
          heading="No projects yet"
          description="Create your first project to get started."
        ></ov-empty-state>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe with action button', async () => {
      const el = await fixture(html`
        <ov-empty-state heading="No results" description="Try a different search.">
          <button slot="actions">Clear filters</button>
        </ov-empty-state>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
