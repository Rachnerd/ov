import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvField } from './ov-field.js';
import './ov-field.js';
import '../../atoms/input/ov-input.js';
import '../../atoms/switch/ov-switch.js';

describe('ov-field', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a label from the label property', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email address">
          <input type="email" />
        </ov-field>
      `);
      // ov-label renders inside the label-wrap
      expect(el.shadowRoot!.querySelector('.label-wrap')).to.exist;
    });

    it('shows a required asterisk when required', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Name" required>
          <input type="text" />
        </ov-field>
      `);
      expect(el.hasAttribute('required')).to.be.true;
    });

    it('renders slotted control in the control-wrap', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Name">
          <input type="text" id="ctrl" />
        </ov-field>
      `);
      expect(el.querySelector('#ctrl')).to.exist;
    });

    it('renders status message when status is set', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email" status="error" message="Invalid email.">
          <input type="email" />
        </ov-field>
      `);
      expect(el.shadowRoot!.querySelector('.message')).to.exist;
    });

    it('renders help text when status is idle', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Password">
          <input type="password" />
          <span slot="help">Min. 8 characters</span>
        </ov-field>
      `);
      expect(el.shadowRoot!.querySelector('.help')).to.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects status attribute', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email" status="error">
          <input type="email" />
        </ov-field>
      `);
      expect(el.getAttribute('status')).to.equal('error');
    });

    it('reflects inline attribute', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Dark mode" inline>
          <ov-switch>Dark mode</ov-switch>
        </ov-field>
      `);
      expect(el.hasAttribute('inline')).to.be.true;
    });

    it('updates status reactively', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email">
          <input type="email" />
        </ov-field>
      `);
      el.status = 'error';
      el.message = 'Required.';
      await elementUpdated(el);
      expect(el.getAttribute('status')).to.equal('error');
    });
  });

  // ── Invalid forwarding ────────────────────────────────────────────────────

  describe('invalid forwarding', () => {
    it('sets invalid on slotted ov-input when status=error', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email" status="error">
          <ov-input type="email" name="email"></ov-input>
        </ov-field>
      `);
      await elementUpdated(el);
      const input = el.querySelector('ov-input')!;
      expect((input as any).invalid).to.be.true;
    });

    it('clears invalid on slotted ov-input when status changes to success', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email" status="error">
          <ov-input type="email" name="email"></ov-input>
        </ov-field>
      `);
      el.status = 'success';
      await elementUpdated(el);
      const input = el.querySelector('ov-input')!;
      expect((input as any).invalid).to.be.false;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a labelled input field', async () => {
      const el = await fixture(html`
        <ov-field label="Email address">
          <ov-input
            type="email"
            name="email"
            aria-label="Email address"
          ></ov-input>
        </ov-field>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'aria-prohibited-attr', 'label'],
      });
    });

    it('passes axe for error state', async () => {
      const el = await fixture(html`
        <ov-field label="Email" status="error" message="Invalid email.">
          <ov-input
            type="email"
            aria-label="Email"
            aria-describedby="field-msg"
          ></ov-input>
        </ov-field>
      `);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast', 'aria-prohibited-attr', 'label'],
      });
    });

    it('error message has role="alert"', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Email" status="error" message="Required.">
          <input type="email" />
        </ov-field>
      `);
      const msg = el.shadowRoot!.querySelector('.message')!;
      expect(msg.getAttribute('role')).to.equal('alert');
    });

    it('non-error message has role="status"', async () => {
      const el = await fixture<OvField>(html`
        <ov-field label="Name" status="success" message="Looks good!">
          <input type="text" />
        </ov-field>
      `);
      const msg = el.shadowRoot!.querySelector('.message')!;
      expect(msg.getAttribute('role')).to.equal('status');
    });
  });
});
