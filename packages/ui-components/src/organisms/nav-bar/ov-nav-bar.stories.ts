import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-nav-bar.js';
import '../../atoms/button/ov-button';
import '../../atoms/logo/ov-logo';
import type { NavItem } from './ov-nav-bar.js';

const ALL_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Training', href: '/training' },
  { label: 'Career', href: '/career' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Tech Insights', href: '/tech-insights' },
  { label: 'About', href: '/about' },
];

const meta: Meta = {
  title: 'Organisms/NavBar',
  component: 'ov-nav-bar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    brand: { control: 'text' },
    tagline: { control: 'text' },
    logoHref: { control: 'text' },
    active: { control: 'text', description: 'href of the active nav item' },
  },
  args: {
    brand: '',
    tagline: '',
    logoHref: '/',
    active: '/',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-nav-bar
      logo-href=${args['logoHref']}
      .items=${ALL_ITEMS}
      active=${args['active']}
    >
      <ov-logo slot="logo" size="sm"></ov-logo>
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
      .items=${ALL_ITEMS}
      active=${args['active']}
    >
      <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
    </ov-nav-bar>
  `,
};

export const FewLinks: Story = {
  render: () => html`
    <ov-nav-bar
      logo-href="/"
      .items=${[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ]}
      active="/"
    >
      <ov-logo slot="logo" size="sm"></ov-logo>
    </ov-nav-bar>
  `,
};

export const RealWorldOpenValue: Story = {
  name: 'Real-world: OpenValue site nav',
  render: () => html`
    <ov-nav-bar logo-href="/" .items=${ALL_ITEMS} active="/">
      <ov-logo slot="logo" size="sm"></ov-logo>
      <ov-button slot="actions" variant="primary" size="sm">Contact</ov-button>
    </ov-nav-bar>
    <div
      style="background:var(--color-bg-canvas);padding:var(--ov-space-12);display:flex;justify-content:center;color:var(--color-text-muted);font-size:var(--ov-fs-sm)"
    >
      Page content below the sticky nav
    </div>
  `,
};
