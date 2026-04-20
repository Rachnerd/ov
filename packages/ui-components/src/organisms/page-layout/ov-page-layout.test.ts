import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import type { OvPageLayout } from './ov-page-layout.js';
import './ov-page-layout.js';

describe('ov-page-layout', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders four slot wrappers', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout></ov-page-layout>`);
      const slots = el.shadowRoot!.querySelectorAll('slot');
      // nav, hero, default, footer
      expect(slots.length).to.equal(4);
    });

    it('projects nav slot content', async () => {
      const el = await fixture<OvPageLayout>(html`
        <ov-page-layout>
          <nav slot="nav" id="nav">Navigation</nav>
        </ov-page-layout>
      `);
      expect(el.querySelector('#nav')).to.exist;
    });

    it('projects hero slot content', async () => {
      const el = await fixture<OvPageLayout>(html`
        <ov-page-layout>
          <div slot="hero" id="hero">Hero</div>
        </ov-page-layout>
      `);
      expect(el.querySelector('#hero')).to.exist;
    });

    it('projects default slot content', async () => {
      const el = await fixture<OvPageLayout>(html`
        <ov-page-layout>
          <section id="body-content">Body</section>
        </ov-page-layout>
      `);
      expect(el.querySelector('#body-content')).to.exist;
    });

    it('projects footer slot content', async () => {
      const el = await fixture<OvPageLayout>(html`
        <ov-page-layout>
          <footer slot="footer" id="footer">Footer</footer>
        </ov-page-layout>
      `);
      expect(el.querySelector('#footer')).to.exist;
    });
  });

  // ── Layout structure ──────────────────────────────────────────────────────

  describe('layout structure', () => {
    it('content wrapper has the .content class', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout></ov-page-layout>`);
      expect(el.shadowRoot!.querySelector('.content')).to.exist;
    });

    it('hero and footer wrappers have the .full-width class', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout></ov-page-layout>`);
      const fullWidths = el.shadowRoot!.querySelectorAll('.full-width');
      // hero, footer
      expect(fullWidths.length).to.equal(2);
    });

    it('nav wrapper has the .nav-wrap class (sticky)', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout></ov-page-layout>`);
      expect(el.shadowRoot!.querySelector('.nav-wrap')).to.exist;
    });

    it('applies max-width attribute as inline style on content wrapper', async () => {
      const el = await fixture<OvPageLayout>(html`
        <ov-page-layout max-width="800px"></ov-page-layout>
      `);
      const content = el.shadowRoot!.querySelector<HTMLElement>('.content')!;
      expect(content.getAttribute('style')).to.include('800px');
    });

    it('content wrapper has no inline style when max-width is not set', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout></ov-page-layout>`);
      const content = el.shadowRoot!.querySelector<HTMLElement>('.content')!;
      expect(content.getAttribute('style') ?? '').to.equal('');
    });
  });

  // ── Properties ────────────────────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults maxWidth to empty string', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout></ov-page-layout>`);
      expect(el.maxWidth).to.equal('');
    });

    it('reads max-width attribute', async () => {
      const el = await fixture<OvPageLayout>(html`<ov-page-layout max-width="960px"></ov-page-layout>`);
      expect(el.maxWidth).to.equal('960px');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe with nav, hero, body, and footer content', async () => {
      const el = await fixture(html`
        <ov-page-layout>
          <nav slot="nav" aria-label="Main">Nav</nav>
          <div slot="hero" role="img" aria-label="Hero">Hero</div>
          <main><p>Body content</p></main>
          <footer slot="footer">Footer</footer>
        </ov-page-layout>
      `);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
