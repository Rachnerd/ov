import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvOfficeCarousel } from './ov-office-carousel.js';
import './ov-office-carousel.js';

const OFFICES = [
  { label: 'Amsterdam',  src: '/amsterdam.jpg',  href: '/offices/amsterdam' },
  { label: 'Rotterdam',  src: '/rotterdam.jpg',   href: '/offices/rotterdam' },
  { label: 'Eindhoven',  src: '/eindhoven.jpg',   href: '/offices/eindhoven' },
  { label: 'Utrecht',    src: '/utrecht.jpg',     href: '/offices/utrecht' },
  { label: 'Den Haag',   src: '/denhaag.jpg',     href: '/offices/denhaag' },
];

describe('ov-office-carousel', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders the heading when heading is set', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel heading="Our offices" .items=${OFFICES}></ov-office-carousel>
      `);
      expect(el.shadowRoot!.querySelector('ov-heading')).to.exist;
    });

    it('does not render heading element when heading is empty', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      expect(el.shadowRoot!.querySelector('ov-heading')).to.not.exist;
    });

    it('renders one ov-office-card per item', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const cards = el.shadowRoot!.querySelectorAll('ov-office-card');
      expect(cards.length).to.equal(OFFICES.length);
    });

    it('passes correct label to each card', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const cards = el.shadowRoot!.querySelectorAll<HTMLElement>('ov-office-card');
      expect(cards[0].getAttribute('label')).to.equal('Amsterdam');
      expect(cards[1].getAttribute('label')).to.equal('Rotterdam');
    });

    it('passes correct href to each card', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const cards = el.shadowRoot!.querySelectorAll<HTMLElement>('ov-office-card');
      expect(cards[0].getAttribute('href')).to.equal('/offices/amsterdam');
    });

    it('renders dot navigation when items.length > 3', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const dots = el.shadowRoot!.querySelectorAll('.dot');
      expect(dots.length).to.equal(OFFICES.length);
    });

    it('does not render dots when items.length <= 3', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES.slice(0, 3)}></ov-office-carousel>
      `);
      expect(el.shadowRoot!.querySelector('.dot')).to.not.exist;
    });

    it('projects description slot content', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}>
          <p slot="description" id="desc">Find us across the Netherlands.</p>
        </ov-office-carousel>
      `);
      expect(el.querySelector('#desc')).to.exist;
    });

    it('renders no cards when items is empty', async () => {
      const el = await fixture<OvOfficeCarousel>(html`<ov-office-carousel></ov-office-carousel>`);
      expect(el.shadowRoot!.querySelectorAll('ov-office-card').length).to.equal(0);
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults items to an empty array', async () => {
      const el = await fixture<OvOfficeCarousel>(html`<ov-office-carousel></ov-office-carousel>`);
      expect(el.items).to.deep.equal([]);
    });

    it('defaults autoPlayMs to 4000', async () => {
      const el = await fixture<OvOfficeCarousel>(html`<ov-office-carousel></ov-office-carousel>`);
      expect(el.autoPlayMs).to.equal(4000);
    });

    it('reads auto-play-ms from attribute', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel auto-play-ms="2000"></ov-office-carousel>
      `);
      expect(el.autoPlayMs).to.equal(2000);
    });

    it('updates cards reactively when items changes', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      el.items = OFFICES.slice(0, 2);
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelectorAll('ov-office-card').length).to.equal(2);
    });
  });

  // ── Dot navigation ────────────────────────────────────────────────────────

  describe('dot navigation', () => {
    it('first dot has aria-current="true" by default', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      expect(dots[0].getAttribute('aria-current')).to.equal('true');
    });

    it('non-first dots have aria-current="false" by default', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      expect(dots[1].getAttribute('aria-current')).to.equal('false');
    });

    it('clicking a dot updates aria-current', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel auto-play-ms="0" .items=${OFFICES}></ov-office-carousel>
      `);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      dots[2].click();
      await elementUpdated(el);
      expect(dots[2].getAttribute('aria-current')).to.equal('true');
      expect(dots[0].getAttribute('aria-current')).to.equal('false');
    });

    it('each dot has an aria-label', async () => {
      const el = await fixture<OvOfficeCarousel>(html`
        <ov-office-carousel .items=${OFFICES}></ov-office-carousel>
      `);
      const dots = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.dot');
      dots.forEach(dot => expect(dot.getAttribute('aria-label')).to.not.equal(''));
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe with items and heading', async () => {
      const el = await fixture(html`
        <ov-office-carousel heading="Our offices" auto-play-ms="0" .items=${OFFICES}></ov-office-carousel>
      `);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
