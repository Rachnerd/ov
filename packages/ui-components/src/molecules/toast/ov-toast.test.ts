import { fixture, expect, elementUpdated, oneEvent, aTimeout } from '@open-wc/testing';
import { html } from 'lit';
import type { OvToast } from './ov-toast.js';
import './ov-toast.js';

describe('ov-toast', () => {
  // ── Initial state ─────────────────────────────────────────────────────────

  describe('initial state', () => {
    it('renders nothing before show() is called', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" variant="info" title="Hello" message="World."></ov-toast>
      `);
      expect(el.shadowRoot!.querySelector('.toast')).to.not.exist;
    });

    it('renders the toast element after show() is called', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" variant="info" title="Hello" message="World."></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.exist;
    });
  });

  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders the title', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" variant="success" title="Saved" message="Changes saved."></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.title')!.textContent!.trim()).to.equal('Saved');
    });

    it('renders the message', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" variant="info" title="Info" message="File uploaded."></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.msg')!.textContent!.trim()).to.equal('File uploaded.');
    });

    it('renders a close button', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" variant="info" title="Info" message="Text."></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('button.close')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects variant attribute', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" variant="danger" title="Error" message="Failed."></ov-toast>
      `);
      expect(el.getAttribute('variant')).to.equal('danger');
    });

    it('defaults to variant="info"', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t1" title="Notif" message="Text."></ov-toast>
      `);
      expect(el.variant).to.equal('info');
    });
  });

  // ── Dismiss behaviour ─────────────────────────────────────────────────────

  describe('dismiss behaviour', () => {
    it('hides toast and dispatches "dismiss" when close button is clicked', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t-close" variant="info" title="Info" message="Text." duration="0"></ov-toast>
      `);
      el.show();
      await elementUpdated(el);

      const dismissPromise = oneEvent(el, 'dismiss');
      el.shadowRoot!.querySelector<HTMLButtonElement>('button.close')!.click();
      const event = await dismissPromise;

      expect((event as CustomEvent).detail.id).to.equal('t-close');
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.not.exist;
    });

    it('hides toast when hide() is called', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t-hide" variant="info" title="Info" message="Text." duration="0"></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.exist;

      el.hide();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.not.exist;
    });

    it('auto-dismisses after the duration elapses', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t-auto" variant="info" title="Info" message="Text." duration="100"></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.exist;

      await aTimeout(200);
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.not.exist;
    });

    it('does not auto-dismiss when duration=0', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t-no-auto" variant="info" title="Info" message="Text." duration="0"></ov-toast>
      `);
      el.show();
      await elementUpdated(el);

      await aTimeout(50);
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.toast')).to.exist;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for success variant when visible', async () => {
      const el = await fixture(html`
        <ov-toast toast-id="t-a11y" variant="success" title="Saved" message="Changes saved." duration="0"></ov-toast>
      `);
      (el as OvToast).show();
      await elementUpdated(el);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('close button has an accessible label', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t-label" variant="info" title="Info" message="Text." duration="0"></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('button.close')!;
      expect(btn.getAttribute('aria-label')).to.not.be.empty;
    });

    it('toast container has role="status"', async () => {
      const el = await fixture<OvToast>(html`
        <ov-toast toast-id="t-role" variant="info" title="Info" message="Text." duration="0"></ov-toast>
      `);
      el.show();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('[role="status"]')).to.exist;
    });
  });
});
