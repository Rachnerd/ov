import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvNavBar } from './ov-nav-bar.js';
import './ov-nav-bar.js';

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
];

describe('ov-nav-bar', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a <nav> element', async () => {
      const el = await fixture<OvNavBar>(html`<ov-nav-bar></ov-nav-bar>`);
      expect(el.shadowRoot!.querySelector('nav')).to.exist;
    });

    it('renders a link for each item', async () => {
      const el = await fixture<OvNavBar>(
        html`<ov-nav-bar .items=${ITEMS}></ov-nav-bar>`,
      );
      const links = el.shadowRoot!.querySelectorAll('ov-nav-link');
      expect(links.length).to.equal(ITEMS.length);
    });

    it('renders the correct label text for each link', async () => {
      const el = await fixture<OvNavBar>(
        html`<ov-nav-bar .items=${ITEMS}></ov-nav-bar>`,
      );
      const links = Array.from(
        el.shadowRoot!.querySelectorAll<HTMLElement>('ov-nav-link'),
      );
      expect(links[0].textContent!.trim()).to.equal('Home');
      expect(links[1].textContent!.trim()).to.equal('Services');
    });

    it('renders the correct href for each link', async () => {
      const el = await fixture<OvNavBar>(
        html`<ov-nav-bar .items=${ITEMS}></ov-nav-bar>`,
      );
      const links = Array.from(
        el.shadowRoot!.querySelectorAll<HTMLElement>('ov-nav-link'),
      );
      expect(links[0].getAttribute('href')).to.equal('/');
      expect(links[1].getAttribute('href')).to.equal('/services');
    });

    it('renders the text wordmark when brand and tagline are set', async () => {
      const el = await fixture<OvNavBar>(html`
        <ov-nav-bar brand="OpenValue" tagline="Tech Tribes"></ov-nav-bar>
      `);
      const logoLink = el.shadowRoot!.querySelector('.logo-link')!;
      expect(logoLink.textContent).to.include('OpenValue');
      expect(logoLink.textContent).to.include('Tech Tribes');
    });

    it('projects logo slot content', async () => {
      const el = await fixture<OvNavBar>(html`
        <ov-nav-bar>
          <span slot="logo" id="logo-slot">Logo</span>
        </ov-nav-bar>
      `);
      expect(el.querySelector('#logo-slot')).to.exist;
    });

    it('projects actions slot content', async () => {
      const el = await fixture<OvNavBar>(html`
        <ov-nav-bar>
          <button slot="actions" id="cta">Contact</button>
        </ov-nav-bar>
      `);
      expect(el.querySelector('#cta')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults items to an empty array', async () => {
      const el = await fixture<OvNavBar>(html`<ov-nav-bar></ov-nav-bar>`);
      expect(el.items).to.deep.equal([]);
    });

    it('defaults logoHref to "/"', async () => {
      const el = await fixture<OvNavBar>(html`<ov-nav-bar></ov-nav-bar>`);
      expect(el.logoHref).to.equal('/');
    });

    it('sets logo link href from logo-href attribute', async () => {
      const el = await fixture<OvNavBar>(
        html`<ov-nav-bar logo-href="/home"></ov-nav-bar>`,
      );
      const logoLink =
        el.shadowRoot!.querySelector<HTMLAnchorElement>('.logo-link')!;
      expect(logoLink.getAttribute('href')).to.equal('/home');
    });

    it('renders no links when items is empty', async () => {
      const el = await fixture<OvNavBar>(html`<ov-nav-bar></ov-nav-bar>`);
      expect(el.shadowRoot!.querySelectorAll('ov-nav-link').length).to.equal(0);
    });

    it('updates links reactively when items changes', async () => {
      const el = await fixture<OvNavBar>(
        html`<ov-nav-bar .items=${ITEMS}></ov-nav-bar>`,
      );
      el.items = [{ label: 'New', href: '/new' }];
      await elementUpdated(el);
      const links = el.shadowRoot!.querySelectorAll('ov-nav-link');
      expect(links.length).to.equal(1);
      expect(links[0].textContent!.trim()).to.equal('New');
    });
  });

  // ── Active state ──────────────────────────────────────────────────────────

  describe('active state', () => {
    it('sets active attribute on the active link', async () => {
      const el = await fixture<OvNavBar>(html`
        <ov-nav-bar .items=${ITEMS} active="/services"></ov-nav-bar>
      `);
      const links = Array.from(
        el.shadowRoot!.querySelectorAll<HTMLElement>('ov-nav-link'),
      );
      const activeLink = links.find(
        (a) => a.getAttribute('href') === '/services',
      );
      expect(activeLink!.hasAttribute('active')).to.be.true;
    });

    it('does not set active attribute on non-active links', async () => {
      const el = await fixture<OvNavBar>(html`
        <ov-nav-bar .items=${ITEMS} active="/services"></ov-nav-bar>
      `);
      const links = Array.from(
        el.shadowRoot!.querySelectorAll<HTMLElement>('ov-nav-link'),
      );
      const homeLink = links.find((a) => a.getAttribute('href') === '/');
      expect(homeLink!.hasAttribute('active')).to.be.false;
    });

    it('updates active attribute reactively', async () => {
      const el = await fixture<OvNavBar>(html`
        <ov-nav-bar .items=${ITEMS} active="/"></ov-nav-bar>
      `);
      el.active = '/about';
      await elementUpdated(el);
      const links = Array.from(
        el.shadowRoot!.querySelectorAll<HTMLElement>('ov-nav-link'),
      );
      const aboutLink = links.find((a) => a.getAttribute('href') === '/about');
      expect(aboutLink!.hasAttribute('active')).to.be.true;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('nav has aria-label="Main navigation"', async () => {
      const el = await fixture<OvNavBar>(html`<ov-nav-bar></ov-nav-bar>`);
      const nav = el.shadowRoot!.querySelector('nav')!;
      expect(nav.getAttribute('aria-label')).to.equal('Main navigation');
    });

    it('passes axe with nav items', async () => {
      const el = await fixture(html`
        <ov-nav-bar brand="OpenValue" .items=${ITEMS} active="/"></ov-nav-bar>
      `);
      await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
    });
  });
});
