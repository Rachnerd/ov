import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvHero } from './ov-hero.js';
import './ov-hero.js';

describe('ov-hero', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a <section> element', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.shadowRoot!.querySelector('section')).to.exist;
    });

    it('renders the heading when heading is set', async () => {
      const el = await fixture<OvHero>(
        html`<ov-hero heading="OpenValue"></ov-hero>`,
      );
      const heading = el.shadowRoot!.querySelector('ov-heading[level="1"]');
      expect(heading).to.exist;
      expect(heading!.textContent).to.include('OpenValue');
    });

    it('does not render heading element when heading is empty', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.shadowRoot!.querySelector('h1')).to.not.exist;
    });

    it('renders the subheading when subheading is set', async () => {
      const el = await fixture<OvHero>(
        html`<ov-hero subheading="Tech Tribes"></ov-hero>`,
      );
      const sub = el.shadowRoot!.querySelector('.subheading');
      expect(sub).to.exist;
      expect(sub!.textContent).to.include('Tech Tribes');
    });

    it('does not render subheading element when subheading is empty', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.shadowRoot!.querySelector('.subheading')).to.not.exist;
    });

    it('renders a .bg element with background-image when src is set', async () => {
      const el = await fixture<OvHero>(
        html`<ov-hero src="/banner.jpg"></ov-hero>`,
      );
      const bg = el.shadowRoot!.querySelector<HTMLElement>('.bg')!;
      expect(bg).to.exist;
      expect(bg.style.backgroundImage).to.include('/banner.jpg');
    });

    it('does not render .bg element when src is empty', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.shadowRoot!.querySelector('.bg')).to.not.exist;
    });

    it('renders an overlay element', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.shadowRoot!.querySelector('.overlay')).to.exist;
    });

    it('applies overlay opacity to the overlay element', async () => {
      const el = await fixture<OvHero>(
        html`<ov-hero .overlay=${0.4}></ov-hero>`,
      );
      const overlay = el.shadowRoot!.querySelector<HTMLElement>('.overlay')!;
      expect(overlay.style.opacity).to.equal('0.4');
    });

    it('projects logo slot content', async () => {
      const el = await fixture<OvHero>(html`
        <ov-hero>
          <span slot="logo" id="logo-slot">Logo</span>
        </ov-hero>
      `);
      expect(el.querySelector('#logo-slot')).to.exist;
    });

    it('projects actions slot content', async () => {
      const el = await fixture<OvHero>(html`
        <ov-hero>
          <button slot="actions" id="cta">Get in touch</button>
        </ov-hero>
      `);
      expect(el.querySelector('#cta')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults heading to empty string', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.heading).to.equal('');
    });

    it('defaults overlay to 0.55', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      expect(el.overlay).to.equal(0.55);
    });

    it('updates heading reactively', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      el.heading = 'Hello';
      await elementUpdated(el);
      expect(
        el.shadowRoot!.querySelector('ov-heading[level="1"]')!.textContent,
      ).to.include('Hello');
    });

    it('updates subheading reactively', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      el.subheading = 'Sub text';
      await elementUpdated(el);
      expect(
        el.shadowRoot!.querySelector('.subheading')!.textContent,
      ).to.include('Sub text');
    });

    it('updates overlay reactively', async () => {
      const el = await fixture<OvHero>(
        html`<ov-hero .overlay=${0.5}></ov-hero>`,
      );
      el.overlay = 0.8;
      await elementUpdated(el);
      const overlay = el.shadowRoot!.querySelector<HTMLElement>('.overlay')!;
      expect(overlay.style.opacity).to.equal('0.8');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('section has aria-label', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      const section = el.shadowRoot!.querySelector('section')!;
      expect(section.getAttribute('aria-label')).to.equal('Hero');
    });

    it('overlay has aria-hidden="true"', async () => {
      const el = await fixture<OvHero>(html`<ov-hero></ov-hero>`);
      const overlay = el.shadowRoot!.querySelector('.overlay')!;
      expect(overlay.getAttribute('aria-hidden')).to.equal('true');
    });

    it('passes axe', async () => {
      const el = await fixture(
        html`<ov-hero heading="OpenValue" subheading="Tech Tribes"></ov-hero>`,
      );
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
