import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvBreadcrumbs } from './ov-breadcrumbs.js';
import './ov-breadcrumbs.js';

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile' },
];

describe('ov-breadcrumbs', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a <nav> with aria-label="Breadcrumb"', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      const nav = el.shadowRoot!.querySelector('nav')!;
      expect(nav).to.exist;
      expect(nav.getAttribute('aria-label')).to.equal('Breadcrumb');
    });

    it('renders an <ol> list', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      expect(el.shadowRoot!.querySelector('ol')).to.exist;
    });

    it('renders one <li> per item', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      expect(el.shadowRoot!.querySelectorAll('li').length).to.equal(
        ITEMS.length,
      );
    });

    it('renders <a> links for non-last items with href', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      const links = el.shadowRoot!.querySelectorAll('a');
      expect(links.length).to.equal(2);
      expect(links[0]!.getAttribute('href')).to.equal('/');
      expect(links[1]!.getAttribute('href')).to.equal('/settings');
    });

    it('renders last item as current page text (no link)', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      const current = el.shadowRoot!.querySelector('[aria-current="page"]')!;
      expect(current).to.exist;
      expect(current.textContent!.trim()).to.equal('Profile');
      expect(current.tagName.toLowerCase()).to.not.equal('a');
    });

    it('renders link text from item label', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      const links = el.shadowRoot!.querySelectorAll('a');
      expect(links[0]!.textContent!.trim()).to.equal('Home');
      expect(links[1]!.textContent!.trim()).to.equal('Settings');
    });
  });

  // ── Collapse behaviour ────────────────────────────────────────────────────

  describe('max / collapse', () => {
    const LONG_ITEMS = [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'OpenValue', href: '/projects/ov' },
      { label: 'Components', href: '/projects/ov/components' },
      { label: 'Breadcrumbs' },
    ];

    it('shows all items when max is 0', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${LONG_ITEMS}></ov-breadcrumbs>`,
      );
      expect(el.shadowRoot!.querySelectorAll('li').length).to.equal(
        LONG_ITEMS.length,
      );
    });

    it('collapses middle items when count exceeds max', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${LONG_ITEMS} max="3"></ov-breadcrumbs>`,
      );
      const ellipsis = el.shadowRoot!.querySelector('.ellipsis');
      expect(ellipsis).to.exist;
    });

    it('still shows first and last items when collapsed', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${LONG_ITEMS} max="3"></ov-breadcrumbs>`,
      );
      const links = el.shadowRoot!.querySelectorAll('a');
      expect(links[0]!.textContent!.trim()).to.equal('Home');
      const current = el.shadowRoot!.querySelector('[aria-current="page"]')!;
      expect(current.textContent!.trim()).to.equal('Breadcrumbs');
    });
  });

  // ── Reactivity ────────────────────────────────────────────────────────────

  describe('reactivity', () => {
    it('updates when items array changes', async () => {
      const el = await fixture<OvBreadcrumbs>(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      el.items = [{ label: 'Home', href: '/' }, { label: 'Dashboard' }];
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelectorAll('li').length).to.equal(2);
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe', async () => {
      const el = await fixture(
        html`<ov-breadcrumbs .items=${ITEMS}></ov-breadcrumbs>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
