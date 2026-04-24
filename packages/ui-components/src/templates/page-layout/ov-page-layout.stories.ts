import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-page-layout.js';
import '../../organisms/nav-bar/ov-nav-bar';
import '../../organisms/hero/ov-hero';
import '../../organisms/carousel/ov-carousel';
import '../../molecules/image-card/ov-image-card';
import '../../atoms/logo/ov-logo';
import '../../atoms/button/ov-button';
import '../../atoms/text/ov-text';
import '../../atoms/heading/ov-heading';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const meta: Meta = {
  title: 'Templates/PageLayout',
  component: 'ov-page-layout',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    maxWidth: {
      control: 'text',
      description: 'Override --ov-page-max-width inline',
    },
  },
  args: {
    maxWidth: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-page-layout max-width=${args['maxWidth'] || ''}>
      <ov-nav-bar slot="nav" logo-href="/" .items=${NAV_ITEMS} active="/">
        <ov-logo slot="logo" size="sm"></ov-logo>
        <ov-button slot="actions" variant="primary" size="sm"
          >Contact</ov-button
        >
      </ov-nav-bar>

      <ov-hero slot="hero" src="/banner.jpg" overlay="0.68">
        <ov-logo slot="logo" size="xl"></ov-logo>
      </ov-hero>

      <section
        style="padding:var(--ov-space-12) var(--ov-space-8);text-align:center"
      >
        <ov-heading level="2"
          >Body content is constrained to 1200 px</ov-heading
        >
        <ov-text variant="body" as="p" tone="secondary">
          This text and everything in the default slot sits within the centred
          max-width container. The nav and hero above stretch to the full
          viewport width.
        </ov-text>
      </section>

      <ov-carousel heading="Featured" auto-play-ms="0">
        <ov-image-card
          label="Amsterdam"
          src="/banner.jpg"
          href="#"
        ></ov-image-card>
        <ov-image-card
          label="Rotterdam"
          src="/banner.jpg"
          href="#"
        ></ov-image-card>
        <ov-image-card
          label="Eindhoven"
          src="/banner.jpg"
          href="#"
        ></ov-image-card>
        <ov-image-card
          label="Utrecht"
          src="/banner.jpg"
          href="#"
        ></ov-image-card>
      </ov-carousel>

      <footer
        slot="footer"
        style="background:var(--ov-charcoal,#1e2330);color:white;padding:var(--ov-space-8);text-align:center"
      >
        Full-width footer
      </footer>
    </ov-page-layout>
  `,
};

export const NavAndHeroOnlyFullWidth: Story = {
  name: 'Nav + Hero full-width, body constrained',
  render: () => html`
    <ov-page-layout>
      <ov-nav-bar slot="nav" logo-href="/" .items=${NAV_ITEMS} active="/">
        <ov-logo slot="logo" size="sm"></ov-logo>
      </ov-nav-bar>

      <ov-hero slot="hero" heading="Full Width Hero"></ov-hero>

      <section style="padding:var(--ov-space-12) var(--ov-space-8)">
        <ov-heading level="2">Constrained section</ov-heading>
        <ov-text variant="body" as="p">
          This section is capped at 1200 px and centred on wide screens.
        </ov-text>
      </section>
    </ov-page-layout>
  `,
};

export const NarrowMaxWidth: Story = {
  name: 'Custom max-width (800 px)',
  render: () => html`
    <ov-page-layout max-width="800px">
      <ov-nav-bar slot="nav" logo-href="/" .items=${NAV_ITEMS} active="/">
        <ov-logo slot="logo" size="sm"></ov-logo>
      </ov-nav-bar>

      <section style="padding:var(--ov-space-12) var(--ov-space-8)">
        <ov-heading level="2">Narrower layout (800 px)</ov-heading>
        <ov-text variant="body" as="p"
          >Useful for content-heavy pages like articles.</ov-text
        >
      </section>
    </ov-page-layout>
  `,
};
