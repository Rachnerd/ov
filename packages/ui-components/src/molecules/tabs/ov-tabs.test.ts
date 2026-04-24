import { fixture, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import type { OvTabs } from './ov-tabs.js';
import './ov-tabs.js';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'activity', label: 'Activity', count: 5 },
  { key: 'settings', label: 'Settings' },
  { key: 'archived', label: 'Archived', disabled: true },
];

describe('ov-tabs', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a tab button for each item', async () => {
      const el = await fixture<OvTabs>(html`<ov-tabs .tabs=${TABS}></ov-tabs>`);
      const buttons = el.shadowRoot!.querySelectorAll('button[role="tab"]');
      expect(buttons.length).to.equal(TABS.length);
    });

    it('renders tab labels', async () => {
      const el = await fixture<OvTabs>(html`<ov-tabs .tabs=${TABS}></ov-tabs>`);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      expect(buttons[0]!.textContent!.trim()).to.include('Overview');
      expect(buttons[1]!.textContent!.trim()).to.include('Activity');
    });

    it('renders count badge next to tab with count', async () => {
      const el = await fixture<OvTabs>(html`<ov-tabs .tabs=${TABS}></ov-tabs>`);
      const activityBtn =
        el.shadowRoot!.querySelectorAll('button[role="tab"]')[1]!;
      expect(activityBtn.querySelector('.count')).to.exist;
      expect(activityBtn.querySelector('.count')!.textContent!.trim()).to.equal(
        '5',
      );
    });
  });

  // ── Active state ──────────────────────────────────────────────────────────

  describe('active state', () => {
    it('defaults active to the first non-disabled tab', async () => {
      const el = await fixture<OvTabs>(html`<ov-tabs .tabs=${TABS}></ov-tabs>`);
      await elementUpdated(el);
      expect(el.active).to.equal('overview');
    });

    it('marks the active tab button as aria-selected="true"', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="activity"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      expect(buttons[1]!.getAttribute('aria-selected')).to.equal('true');
    });

    it('marks inactive tabs as aria-selected="false"', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      expect(buttons[1]!.getAttribute('aria-selected')).to.equal('false');
    });

    it('marks disabled tab as aria-disabled="true"', async () => {
      const el = await fixture<OvTabs>(html`<ov-tabs .tabs=${TABS}></ov-tabs>`);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      const archivedBtn = buttons[3]!;
      expect(archivedBtn.getAttribute('aria-disabled')).to.equal('true');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects appearance attribute', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} appearance="pills"></ov-tabs>`,
      );
      expect(el.getAttribute('appearance')).to.equal('pills');
    });

    it('reflects fill attribute', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} fill></ov-tabs>`,
      );
      expect(el.hasAttribute('fill')).to.be.true;
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "change" event with correct key on tab click', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      const changePromise = oneEvent(el, 'change');

      const activityBtn =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        )[1]!;
      activityBtn.click();

      const event = await changePromise;
      expect((event as CustomEvent).detail.key).to.equal('activity');
    });

    it('updates active property after tab click', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      const settingsBtn =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        )[2]!;
      settingsBtn.click();
      await elementUpdated(el);
      expect(el.active).to.equal('settings');
    });

    it('does not dispatch "change" for disabled tab', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      let changed = false;
      el.addEventListener('change', () => {
        changed = true;
      });

      const archivedBtn =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        )[3]!;
      archivedBtn.click();
      await elementUpdated(el);

      expect(changed).to.be.false;
      expect(el.active).to.equal('overview');
    });

    it('does not dispatch "change" when clicking the already-active tab', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      let changeCount = 0;
      el.addEventListener('change', () => {
        changeCount++;
      });

      const overviewBtn =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        )[0]!;
      overviewBtn.click();
      await elementUpdated(el);

      expect(changeCount).to.equal(0);
    });
  });

  // ── Keyboard navigation ───────────────────────────────────────────────────

  describe('keyboard navigation', () => {
    it('ArrowRight moves focus to the next tab', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      const overviewBtn = buttons[0]!;

      overviewBtn.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
      );
      await elementUpdated(el);

      expect(el.active).to.equal('activity');
    });

    it('ArrowLeft moves focus to the previous tab', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="activity"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      const activityBtn = buttons[1]!;

      activityBtn.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }),
      );
      await elementUpdated(el);

      expect(el.active).to.equal('overview');
    });

    it('Home key moves to the first tab', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="settings"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      const settingsBtn = buttons[2]!;

      settingsBtn.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
      );
      await elementUpdated(el);

      expect(el.active).to.equal('overview');
    });

    it('End key moves to the last enabled tab', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      const overviewBtn = buttons[0]!;

      overviewBtn.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
      );
      await elementUpdated(el);

      // 'archived' is disabled, so End should go to 'settings'
      expect(el.active).to.equal('settings');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for underline appearance', async () => {
      const el = await fixture(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      await elementUpdated(el);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for pills appearance', async () => {
      const el = await fixture(
        html`<ov-tabs
          .tabs=${TABS}
          appearance="pills"
          active="overview"
        ></ov-tabs>`,
      );
      await elementUpdated(el);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('tablist has role="tablist"', async () => {
      const el = await fixture<OvTabs>(html`<ov-tabs .tabs=${TABS}></ov-tabs>`);
      expect(el.shadowRoot!.querySelector('[role="tablist"]')).to.exist;
    });

    it('active tab has tabindex="0", others have tabindex="-1"', async () => {
      const el = await fixture<OvTabs>(
        html`<ov-tabs .tabs=${TABS} active="overview"></ov-tabs>`,
      );
      await elementUpdated(el);
      const buttons =
        el.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          'button[role="tab"]',
        );
      expect(buttons[0]!.getAttribute('tabindex')).to.equal('0');
      expect(buttons[1]!.getAttribute('tabindex')).to.equal('-1');
    });
  });
});
