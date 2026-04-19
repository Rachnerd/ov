import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-office-card.js';

const meta: Meta = {
  title: 'Molecules/OfficeCard',
  component: 'ov-office-card',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    src:   { control: 'text' },
    href:  { control: 'text' },
  },
  args: {
    label: 'Amsterdam',
    src:   '/banner.jpg',
    href:  '/offices/amsterdam',
  },
  decorators: [
    (story) => html`<div style="max-width:320px">${story()}</div>`,
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-office-card
      label=${args['label']}
      src=${args['src']}
      href=${args['href']}
    ></ov-office-card>
  `,
};

export const Row: Story = {
  name: 'Three cards in a row',
  render: () => html`
    <div style="display:flex;gap:16px;max-width:960px">
      <ov-office-card label="Amsterdam"  src="/banner.jpg" href="#"></ov-office-card>
      <ov-office-card label="Rotterdam"  src="/banner.jpg" href="#"></ov-office-card>
      <ov-office-card label="Eindhoven"  src="/banner.jpg" href="#"></ov-office-card>
    </div>
  `,
};

export const RealWorld: Story = {
  name: 'Real-world: office carousel card',
  render: () => html`
    <div style="width:300px">
      <ov-office-card label="Utrecht" src="/banner.jpg" href="/offices/utrecht"></ov-office-card>
    </div>
  `,
};
