import { fixture, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import type { OvAlert } from './ov-alert.js';
import './ov-alert.js';

describe('ov-alert', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders body copy through the default slot', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert>Session expiring soon.</ov-alert>`);
      expect(el.textContent!.trim()).to.equal('Session expiring soon.');
    });

    it('renders title from the title property', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert title="Warning">Low storage.</ov-alert>`);
      expect(el.shadowRoot!.querySelector('.title-slot')).to.exist;
    });

    it('shows dismiss button when dismissible', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert dismissible>Alert text.</ov-alert>`);
      expect(el.shadowRoot!.querySelector('.dismiss')).to.exist;
    });

    it('hides alert after dismiss button is clicked', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert dismissible>Alert text.</ov-alert>`);
      el.shadowRoot!.querySelector<HTMLButtonElement>('.dismiss')!.click();
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector('.alert')).to.not.exist;
    });

    it('renders action slot content', async () => {
      const el = await fixture<OvAlert>(html`
        <ov-alert title="Unsaved changes">
          You have unsaved changes.
          <button slot="actions" id="discard">Discard</button>
        </ov-alert>
      `);
      expect(el.querySelector('#discard')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to variant="info"', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert>Info.</ov-alert>`);
      expect(el.getAttribute('variant')).to.equal('info');
    });

    it('reflects variant attribute', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert variant="danger">Error.</ov-alert>`);
      expect(el.getAttribute('variant')).to.equal('danger');
    });

    it('reflects dismissible attribute', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert dismissible>Alert.</ov-alert>`);
      expect(el.hasAttribute('dismissible')).to.be.true;
    });
  });

  // ── Events ────────────────────────────────────────────────────────────────

  describe('events', () => {
    it('dispatches "dismiss" event when dismiss button is clicked', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert dismissible>Alert.</ov-alert>`);
      const dismissPromise = oneEvent(el, 'dismiss');
      el.shadowRoot!.querySelector<HTMLButtonElement>('.dismiss')!.click();
      const event = await dismissPromise;
      expect(event).to.exist;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for info variant', async () => {
      const el = await fixture(html`<ov-alert variant="info">Your session expires in 5 minutes.</ov-alert>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for danger variant', async () => {
      const el = await fixture(html`<ov-alert variant="danger" title="Payment failed">Update your billing info.</ov-alert>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for dismissible alert', async () => {
      const el = await fixture(html`<ov-alert dismissible>New feature available.</ov-alert>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('root element has role="alert"', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert>Info.</ov-alert>`);
      expect(el.shadowRoot!.querySelector('[role="alert"]')).to.exist;
    });

    it('dismiss button has an accessible label', async () => {
      const el = await fixture<OvAlert>(html`<ov-alert dismissible>Alert.</ov-alert>`);
      const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.dismiss')!;
      expect(btn.getAttribute('aria-label')).to.not.be.empty;
    });
  });
});
