import { fixture, expect, elementUpdated, aTimeout } from '@open-wc/testing';
import { html } from 'lit';
import type { OvCarousel } from './ov-carousel.js';
import './ov-carousel.js';
import '../../molecules/image-card/ov-image-card.js';

const cards = html`
  <ov-image-card label="Amsterdam" src="/a.jpg" href="#"></ov-image-card>
  <ov-image-card label="Rotterdam" src="/b.jpg" href="#"></ov-image-card>
  <ov-image-card label="Eindhoven" src="/c.jpg" href="#"></ov-image-card>
  <ov-image-card label="Utrecht" src="/d.jpg" href="#"></ov-image-card>
  <ov-image-card label="Den Haag" src="/e.jpg" href="#"></ov-image-card>
`;

describe('ov-carousel', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders the heading when heading is set', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel heading="Featured">${cards}</ov-carousel>
      `);
      expect(el.shadowRoot!.querySelector('ov-heading')).to.exist;
    });

    it('does not render heading element when heading is empty', async () => {
      const el = await fixture<OvCarousel>(
        html`<ov-carousel>${cards}</ov-carousel>`,
      );
      expect(el.shadowRoot!.querySelector('ov-heading')).to.not.exist;
    });

    it('projects slotted items into the track', async () => {
      const el = await fixture<OvCarousel>(
        html`<ov-carousel>${cards}</ov-carousel>`,
      );
      expect(el.querySelectorAll('ov-image-card').length).to.equal(5);
    });

    it('projects description slot content', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel>
          <p slot="description" id="desc">Find us across the Netherlands.</p>
          ${cards}
        </ov-carousel>
      `);
      expect(el.querySelector('#desc')).to.exist;
    });

    it('renders one dot per distinct scroll position (items - visible + 1)', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel auto-play-ms="0">${cards}</ov-carousel>
      `);
      await aTimeout(50);
      const dots = el.shadowRoot!.querySelectorAll('.dot');
      expect(dots.length).to.equal(4);
    });

    it('does not render dots when items equal visible-count', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel
          auto-play-ms="0"
          visible-count="3"
          count-md="3"
          count-sm="3"
        >
          <ov-image-card label="A" src="/a.jpg" href="#"></ov-image-card>
          <ov-image-card label="B" src="/b.jpg" href="#"></ov-image-card>
          <ov-image-card label="C" src="/c.jpg" href="#"></ov-image-card>
        </ov-carousel>
      `);
      await aTimeout(50);
      expect(el.shadowRoot!.querySelector('.dot')).to.not.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults visibleCount to 3', async () => {
      const el = await fixture<OvCarousel>(html`<ov-carousel></ov-carousel>`);
      expect(el.visibleCount).to.equal(3);
    });

    it('defaults autoPlayMs to 4000', async () => {
      const el = await fixture<OvCarousel>(html`<ov-carousel></ov-carousel>`);
      expect(el.autoPlayMs).to.equal(4000);
    });

    it('reads visible-count attribute', async () => {
      const el = await fixture<OvCarousel>(
        html`<ov-carousel visible-count="2"></ov-carousel>`,
      );
      expect(el.visibleCount).to.equal(2);
    });

    it('reads auto-play-ms attribute', async () => {
      const el = await fixture<OvCarousel>(
        html`<ov-carousel auto-play-ms="2000"></ov-carousel>`,
      );
      expect(el.autoPlayMs).to.equal(2000);
    });

    it('sets --_vis CSS custom property on the host', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel visible-count="2">${cards}</ov-carousel>
      `);
      await aTimeout(50);
      expect(el.style.getPropertyValue('--_vis')).to.equal('2');
    });
  });

  // ── Dot navigation ────────────────────────────────────────────────────────

  describe('dot navigation', () => {
    it('first dot has aria-current="true" by default', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel auto-play-ms="0">${cards}</ov-carousel>
      `);
      await aTimeout(50);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      expect(dots[0].getAttribute('aria-current')).to.equal('true');
    });

    it('non-first dots have aria-current="false" by default', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel auto-play-ms="0">${cards}</ov-carousel>
      `);
      await aTimeout(50);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      expect(dots[1].getAttribute('aria-current')).to.equal('false');
    });

    it('clicking a dot updates aria-current', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel auto-play-ms="0">${cards}</ov-carousel>
      `);
      await aTimeout(50);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      dots[2].click();
      await elementUpdated(el);
      expect(dots[2].getAttribute('aria-current')).to.equal('true');
      expect(dots[0].getAttribute('aria-current')).to.equal('false');
    });

    it('each dot has an aria-label', async () => {
      const el = await fixture<OvCarousel>(html`
        <ov-carousel auto-play-ms="0">${cards}</ov-carousel>
      `);
      await aTimeout(50);
      el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot').forEach(
        (dot) => {
          expect(dot.getAttribute('aria-label')).to.not.equal('');
        },
      );
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe with heading and items', async () => {
      const el = await fixture(html`
        <ov-carousel heading="Our offices" auto-play-ms="0"
          >${cards}</ov-carousel
        >
      `);
      await aTimeout(50);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
