import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-nav-bar.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/nav-link/ov-nav-link.js';
import '../../atoms/logo/ov-logo.js';

const meta: Meta = {
  title: 'Organisms/NavBar',
  component: 'ov-nav-bar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    brand: { control: 'text' },
    tagline: { control: 'text' },
    logoHref: { control: 'text' },
  },
  args: {
    brand: '',
    tagline: '',
    logoHref: '/',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-nav-bar logo-href=${args['logoHref']}>
      <ov-logo slot="logo" size="sm"></ov-logo>
      <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
      <ov-nav-link slot="links" href="/services">Services</ov-nav-link>
      <ov-nav-link slot="links" href="/projects">Projects</ov-nav-link>
      <ov-nav-link slot="links" href="/training">Training</ov-nav-link>
      <ov-nav-link slot="links" href="/career">Career</ov-nav-link>
      <ov-nav-link slot="links" href="/speakers">Speakers</ov-nav-link>
      <ov-nav-link slot="links" href="/tech-insights"
        >Tech Insights</ov-nav-link
      >
      <ov-nav-link slot="links" href="/about">About</ov-nav-link>
      <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
    </ov-nav-bar>
  `,
};

export const TextWordmark: Story = {
  name: 'Text wordmark (no image)',
  render: (args) => html`
    <ov-nav-bar
      brand="OpenValue"
      tagline="Tech Tribes"
      logo-href=${args['logoHref']}
    >
      <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
      <ov-nav-link slot="links" href="/services">Services</ov-nav-link>
      <ov-nav-link slot="links" href="/projects">Projects</ov-nav-link>
      <ov-nav-link slot="links" href="/training">Training</ov-nav-link>
      <ov-nav-link slot="links" href="/career">Career</ov-nav-link>
      <ov-nav-link slot="links" href="/speakers">Speakers</ov-nav-link>
      <ov-nav-link slot="links" href="/tech-insights"
        >Tech Insights</ov-nav-link
      >
      <ov-nav-link slot="links" href="/about">About</ov-nav-link>
      <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
    </ov-nav-bar>
  `,
};

export const FewLinks: Story = {
  render: () => html`
    <ov-nav-bar logo-href="/">
      <ov-logo slot="logo" size="sm"></ov-logo>
      <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
      <ov-nav-link slot="links" href="/about">About</ov-nav-link>
    </ov-nav-bar>
  `,
};

export const RealWorldOpenValue: Story = {
  name: 'Real-world: OpenValue site nav',
  render: () => html`
    <ov-nav-bar logo-href="/">
      <ov-logo slot="logo" size="sm"></ov-logo>
      <ov-nav-link slot="links" href="/" active>Home</ov-nav-link>
      <ov-nav-link slot="links" href="/services">Services</ov-nav-link>
      <ov-nav-link slot="links" href="/projects">Projects</ov-nav-link>
      <ov-nav-link slot="links" href="/training">Training</ov-nav-link>
      <ov-nav-link slot="links" href="/career">Career</ov-nav-link>
      <ov-nav-link slot="links" href="/speakers">Speakers</ov-nav-link>
      <ov-nav-link slot="links" href="/tech-insights"
        >Tech Insights</ov-nav-link
      >
      <ov-nav-link slot="links" href="/about">About</ov-nav-link>
      <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
    </ov-nav-bar>
    <div
      style="background:var(--color-bg-canvas);padding:var(--ov-space-12);display:flex;justify-content:center;color:var(--color-text-muted);font-size:var(--ov-fs-sm)"
    >
      Page content below the sticky nav
    </div>
  `,
};
