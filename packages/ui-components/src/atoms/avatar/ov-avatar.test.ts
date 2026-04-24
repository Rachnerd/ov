import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { html } from 'lit';
import type { OvAvatar } from './ov-avatar.js';
import './ov-avatar.js';

describe('ov-avatar', () => {
  // ── Rendering ─────────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders an <img> when src is set', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar src="/photo.jpg" name="Ada Lovelace"></ov-avatar>`,
      );
      expect(el.shadowRoot!.querySelector('img')).to.exist;
    });

    it('sets img src and alt correctly', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar
          src="/photo.jpg"
          name="Ada Lovelace"
          alt="Ada"
        ></ov-avatar>`,
      );
      const img = el.shadowRoot!.querySelector<HTMLImageElement>('img')!;
      expect(img.src).to.include('photo.jpg');
      expect(img.alt).to.equal('Ada');
    });

    it('falls back to name for alt when alt is not set', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar src="/photo.jpg" name="Ada Lovelace"></ov-avatar>`,
      );
      expect(
        el.shadowRoot!.querySelector<HTMLImageElement>('img')!.alt,
      ).to.equal('Ada Lovelace');
    });

    it('renders initials span when no src', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="Sarah Kim"></ov-avatar>`,
      );
      expect(el.shadowRoot!.querySelector('span')).to.exist;
      expect(el.shadowRoot!.querySelector('img')).to.not.exist;
    });

    it('derives two-letter initials from name', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="Sarah Kim"></ov-avatar>`,
      );
      expect(
        el.shadowRoot!.querySelector('span')!.textContent!.trim(),
      ).to.equal('SK');
    });

    it('derives single-letter initials for one-word name', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="Tom"></ov-avatar>`,
      );
      expect(
        el.shadowRoot!.querySelector('span')!.textContent!.trim(),
      ).to.equal('T');
    });

    it('uses explicit initials over name-derived ones', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="Sarah Kim" initials="AI"></ov-avatar>`,
      );
      expect(
        el.shadowRoot!.querySelector('span')!.textContent!.trim(),
      ).to.equal('AI');
    });

    it('truncates explicit initials to 2 characters', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar initials="ABC"></ov-avatar>`,
      );
      expect(
        el.shadowRoot!.querySelector('span')!.textContent!.trim(),
      ).to.equal('AB');
    });
  });

  // ── Properties & attributes ───────────────────────────────────────────────

  describe('properties and attributes', () => {
    it('reflects size attribute', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="A B" size="lg"></ov-avatar>`,
      );
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('defaults to size="md"', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="A B"></ov-avatar>`,
      );
      expect(el.size).to.equal('md');
    });

    it('reflects shape attribute', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="A B" shape="square"></ov-avatar>`,
      );
      expect(el.getAttribute('shape')).to.equal('square');
    });

    it('reflects tone attribute', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="A B" tone="accent"></ov-avatar>`,
      );
      expect(el.getAttribute('tone')).to.equal('accent');
    });

    it('updates initials reactively when name changes', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="Alice B"></ov-avatar>`,
      );
      el.name = 'Charlie D';
      await elementUpdated(el);
      expect(
        el.shadowRoot!.querySelector('span')!.textContent!.trim(),
      ).to.equal('CD');
    });
  });

  // ── Accessibility ─────────────────────────────────────────────────────────

  describe('accessibility', () => {
    it('passes axe for initials avatar', async () => {
      const el = await fixture(html`<ov-avatar name="Sarah Kim"></ov-avatar>`);
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('passes axe for image avatar', async () => {
      const el = await fixture(
        html`<ov-avatar src="/photo.jpg" name="Sarah Kim"></ov-avatar>`,
      );
      await expect(el).to.be.accessible({
        ignoredRules: ['color-contrast'],
      });
    });

    it('initials span is aria-hidden', async () => {
      const el = await fixture<OvAvatar>(
        html`<ov-avatar name="Sarah Kim"></ov-avatar>`,
      );
      expect(
        el.shadowRoot!.querySelector('span')!.getAttribute('aria-hidden'),
      ).to.equal('true');
    });
  });
});
