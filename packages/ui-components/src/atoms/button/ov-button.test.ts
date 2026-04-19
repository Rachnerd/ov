import { fixture, expect, elementUpdated, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import type { OvButton } from './ov-button.js';
import './ov-button.js';

describe('ov-button', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders a native <button> in shadow DOM', async () => {
      const el = await fixture<OvButton>(html`<ov-button>Save</ov-button>`);
      expect(el.shadowRoot!.querySelector('button')).to.exist;
    });

    it('projects label text through the default slot', async () => {
      const el = await fixture<OvButton>(html`<ov-button>Submit</ov-button>`);
      expect(el.textContent!.trim()).to.equal('Submit');
    });

    it('projects leading icon through the start slot', async () => {
      const el = await fixture<OvButton>(html`
        <ov-button>
          <span slot="start" data-testid="icon">★</span>
          New
        </ov-button>
      `);
      expect(el.querySelector('[data-testid="icon"]')).to.exist;
    });

    it('shows spinner markup when loading', async () => {
      const el = await fixture<OvButton>(html`<ov-button loading>Saving</ov-button>`);
      expect(el.shadowRoot!.querySelector('.spinner')).to.exist;
    });

    it('hides spinner markup when not loading', async () => {
      const el = await fixture<OvButton>(html`<ov-button>Save</ov-button>`);
      expect(el.shadowRoot!.querySelector('.spinner')).to.not.exist;
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('defaults to variant="primary"', async () => {
      const el = await fixture<OvButton>(html`<ov-button>X</ov-button>`);
      expect(el.variant).to.equal('primary');
      expect(el.getAttribute('variant')).to.equal('primary');
    });

    it('reflects variant to attribute', async () => {
      const el = await fixture<OvButton>(html`<ov-button variant="danger">Delete</ov-button>`);
      expect(el.getAttribute('variant')).to.equal('danger');
    });

    it('reflects size to attribute', async () => {
      const el = await fixture<OvButton>(html`<ov-button size="lg">Large</ov-button>`);
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('reflects disabled to attribute and disables native button', async () => {
      const el = await fixture<OvButton>(html`<ov-button disabled>No</ov-button>`);
      expect(el.hasAttribute('disabled')).to.be.true;
      expect(el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.disabled).to.be.true;
    });

    it('reflects loading to attribute', async () => {
      const el = await fixture<OvButton>(html`<ov-button loading>Wait</ov-button>`);
      expect(el.hasAttribute('loading')).to.be.true;
    });

    it('updates disabled reactively', async () => {
      const el = await fixture<OvButton>(html`<ov-button>X</ov-button>`);
      el.disabled = true;
      await elementUpdated(el);
      expect(el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.disabled).to.be.true;
    });

    it('sets native button type attribute', async () => {
      const el = await fixture<OvButton>(html`<ov-button type="submit">Submit</ov-button>`);
      expect(el.shadowRoot!.querySelector<HTMLButtonElement>('button')!.type).to.equal('submit');
    });
  });

  // ── States ────────────────────────────────────────────────────────────────

  describe('states', () => {
    it('stops click propagation when disabled', async () => {
      const el = await fixture<OvButton>(html`<ov-button disabled>No</ov-button>`);
      let clicked = false;
      el.addEventListener('click', () => { clicked = true; });
      // Dispatch directly on shadow button to bypass native disabled suppression
      el.shadowRoot!.querySelector('button')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      expect(clicked).to.be.false;
    });

    it('stops click propagation when loading', async () => {
      const el = await fixture<OvButton>(html`<ov-button loading>Wait</ov-button>`);
      let clicked = false;
      el.addEventListener('click', () => { clicked = true; });
      el.shadowRoot!.querySelector('button')!
        .dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      expect(clicked).to.be.false;
    });

    it('allows click propagation when enabled', async () => {
      const el = await fixture<OvButton>(html`<ov-button>Go</ov-button>`);
      const clickEvent = oneEvent(el, 'click');
      el.shadowRoot!.querySelector('button')!.click();
      await clickEvent;
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for a labelled button', async () => {
      const el = await fixture(html`<ov-button>Submit form</ov-button>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('sets aria-busy="true" when loading', async () => {
      const el = await fixture<OvButton>(html`<ov-button loading>Loading</ov-button>`);
      expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-busy')).to.equal('true');
    });

    it('sets aria-busy="false" when not loading', async () => {
      const el = await fixture<OvButton>(html`<ov-button>Go</ov-button>`);
      expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-busy')).to.equal('false');
    });

    it('sets aria-disabled="true" when disabled', async () => {
      const el = await fixture<OvButton>(html`<ov-button disabled>Disabled</ov-button>`);
      expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-disabled')).to.equal('true');
    });
  });
});
