import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-nav-link.js';

const meta: Meta = {
  title: 'Atoms/NavLink',
  component: 'ov-nav-link',
  argTypes: {
    href: { control: 'text' },
    active: { control: 'boolean' },
  },
  args: { href: '#', active: false },
  decorators: [
    (story) => html`
      <div style="background:#1e2330;padding:16px 24px;display:inline-flex">
        ${story()}
      </div>
    `,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-nav-link href=${args['href']} ?active=${args['active']}
      >Services</ov-nav-link
    >
  `,
};

export const Active: Story = {
  render: () => html` <ov-nav-link href="#" active>Home</ov-nav-link> `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center">
      <ov-nav-link href="#">Default</ov-nav-link>
      <ov-nav-link href="#" active>Active</ov-nav-link>
    </div>
  `,
};

export const RealWorldNavBar: Story = {
  name: 'Real-world: Nav bar',
  decorators: [(story) => story()],
  render: () => html`
    <nav
      style="background:#1e2330;display:flex;align-items:center;gap:24px;padding:0 32px;min-height:60px"
    >
      <span
        style="color:white;font-weight:700;font-size:14px;letter-spacing:0.12em;text-transform:uppercase;margin-right:auto"
      >
        OpenValue
      </span>
      <ov-nav-link href="/" active>Home</ov-nav-link>
      <ov-nav-link href="/services">Services</ov-nav-link>
      <ov-nav-link href="/about">About</ov-nav-link>
      <ov-nav-link href="/career">Career</ov-nav-link>
    </nav>
  `,
};
