import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-image-card.js';

const meta: Meta = {
  title: 'Molecules/ImageCard',
  component: 'ov-image-card',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    src: { control: 'text' },
    href: { control: 'text' },
  },
  args: {
    label: 'Amsterdam',
    src: '/banner.jpg',
    href: '/cities/amsterdam',
  },
  decorators: [(story) => html`<div style="max-width:340px">${story()}</div>`],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-image-card
      label=${args['label']}
      src=${args['src']}
      href=${args['href']}
    ></ov-image-card>
  `,
};

export const Row: Story = {
  name: 'Three cards in a row',
  decorators: [],
  render: () => html`
    <div style="display:flex;gap:16px;max-width:960px">
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
    </div>
  `,
};

export const LongLabel: Story = {
  name: 'Long label text',
  render: () => html`
    <div style="max-width:340px">
      <ov-image-card
        label="Den Haag (The Hague)"
        src="/banner.jpg"
        href="#"
      ></ov-image-card>
    </div>
  `,
};

export const RealWorld: Story = {
  name: 'Real-world: office card',
  render: () => html`
    <div style="width:300px">
      <ov-image-card
        label="Utrecht"
        src="/banner.jpg"
        href="/offices/utrecht"
      ></ov-image-card>
    </div>
  `,
};
