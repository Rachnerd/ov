import { fixture, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import type { OvMenuItem } from './ov-menu-item.js';
import './ov-menu-item.js';

describe('ov-menu-item', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders label text in .main element', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Edit profile"></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('.main')!.textContent!.trim()).to.equal('Edit profile');
    });

    it('renders description text when set', async () => {
      const el = await fixture<OvMenuItem>(html`
        <ov-menu-item label="Export" description="Download as CSV"></ov-menu-item>
      `);
      expect(el.shadowRoot!.querySelector('.desc')!.textContent!.trim()).to.equal('Download as CSV');
    });

    it('does not render .desc when description is empty', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Edit"></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('.desc')).to.not.exist;
    });

    it('renders a separator div with role="separator" when separator=true', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item separator></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('[role="separator"]')).to.exist;
    });

    it('does not render label text in separator mode', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Hidden" separator></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('.main')).to.not.exist;
    });

    it('projects icon slot content', async () => {
      const el = await fixture<OvMenuItem>(html`
        <ov-menu-item label="Search">
          <span slot="icon" id="ico">🔍</span>
        </ov-menu-item>
      `);
      expect(el.querySelector('#ico')).to.exist;
    });

    it('projects trailing slot content', async () => {
      const el = await fixture<OvMenuItem>(html`
        <ov-menu-item label="Notifications">
          <span slot="trailing" id="badge">3</span>
        </ov-menu-item>
      `);
      expect(el.querySelector('#badge')).to.exist;
    });

    it('has role="menuitem" on the item div', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Edit"></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('[role="menuitem"]')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects disabled attribute', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Delete" disabled></ov-menu-item>`);
      expect(el.hasAttribute('disabled')).to.be.true;
    });

    it('sets aria-disabled="true" when disabled', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Delete" disabled></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('[role="menuitem"]')!.getAttribute('aria-disabled')).to.equal('true');
    });

    it('reflects selected attribute', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Dashboard" selected></ov-menu-item>`);
      expect(el.hasAttribute('selected')).to.be.true;
    });

    it('sets aria-current="true" when selected', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Dashboard" selected></ov-menu-item>`);
      expect(el.shadowRoot!.querySelector('[role="menuitem"]')!.getAttribute('aria-current')).to.equal('true');
    });

    it('reflects separator attribute', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item separator></ov-menu-item>`);
      expect(el.hasAttribute('separator')).to.be.true;
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "select" event with label detail on click', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Edit profile"></ov-menu-item>`);
      const selectPromise = oneEvent(el, 'select');
      el.shadowRoot!.querySelector<HTMLElement>('[role="menuitem"]')!.click();
      const event = await selectPromise;
      expect((event as CustomEvent).detail.label).to.equal('Edit profile');
    });

    it('does not dispatch "select" when disabled', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item label="Delete" disabled></ov-menu-item>`);
      let fired = false;
      el.addEventListener('select', () => { fired = true; });
      el.shadowRoot!.querySelector<HTMLElement>('[role="menuitem"]')!.dispatchEvent(
        new MouseEvent('click', { bubbles: true, composed: true }),
      );
      await elementUpdated(el);
      expect(fired).to.be.false;
    });

    it('does not dispatch "select" for separator items', async () => {
      const el = await fixture<OvMenuItem>(html`<ov-menu-item separator></ov-menu-item>`);
      let fired = false;
      el.addEventListener('select', () => { fired = true; });
      el.shadowRoot!.querySelector<HTMLElement>('[role="separator"]')!.dispatchEvent(
        new MouseEvent('click', { bubbles: true, composed: true }),
      );
      await elementUpdated(el);
      expect(fired).to.be.false;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a standard menu item', async () => {
      const el = await fixture(html`
        <div role="menu">
          <ov-menu-item label="Edit profile"></ov-menu-item>
        </div>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for a disabled menu item', async () => {
      const el = await fixture(html`
        <div role="menu">
          <ov-menu-item label="Delete" disabled></ov-menu-item>
        </div>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for a separator', async () => {
      const el = await fixture(html`
        <div role="menu">
          <ov-menu-item label="Edit"></ov-menu-item>
          <ov-menu-item separator></ov-menu-item>
          <ov-menu-item label="Delete"></ov-menu-item>
        </div>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });
  });
});
