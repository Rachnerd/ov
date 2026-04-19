import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-office-carousel.js';
import '@ov/ui-components/atoms/text/ov-text';
import '@ov/ui-components/atoms/link/ov-link';

const OFFICES = [
  { label: 'Amsterdam',  src: '/amsterdam.jpg', href: '#' },
  { label: 'Arnhem',  src: '/arnhem.jpg', href: '#' },
  { label: 'Düsseldorf',  src: '/dusseldorf.jpg', href: '#' },
];

const meta: Meta = {
  title: 'Organisms/OfficeCarousel',
  component: 'ov-office-carousel',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading:    { control: 'text' },
    autoPlayMs: { control: { type: 'number', min: 0, step: 500 } },
  },
  args: {
    heading:    'Our offices in 8 cities',
    autoPlayMs: 4000,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-office-carousel
      heading=${args['heading']}
      .autoPlayMs=${args['autoPlayMs']}
      .items=${OFFICES}
    ></ov-office-carousel>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <ov-office-carousel heading="Our offices in 8 cities" .items=${OFFICES}>
      <ov-text slot="description" variant="body" as="p">
        We're present throughout the Netherlands.
        <ov-link href="/contact">Contact us</ov-link> to find your nearest office.
      </ov-text>
    </ov-office-carousel>
  `,
};

export const NoAutoPlay: Story = {
  name: 'Manual navigation only',
  render: () => html`
    <ov-office-carousel
      heading="Our offices"
      auto-play-ms="0"
      .items=${OFFICES}
    ></ov-office-carousel>
  `,
};

export const FewItems: Story = {
  name: 'Fewer than 4 items (no dots)',
  render: () => html`
    <ov-office-carousel
      heading="Our offices"
      .items=${OFFICES.slice(0, 3)}
    ></ov-office-carousel>
  `,
};

export const RealWorldOpenValue: Story = {
  name: 'Real-world: OpenValue homepage section',
  render: () => html`
    <ov-office-carousel heading="Our offices in 8 cities" .items=${OFFICES}>
      <ov-text slot="description" variant="lead" as="p">
        Spread across the Netherlands — always close to you.
        <ov-link href="/contact">Get in touch</ov-link>.
      </ov-text>
    </ov-office-carousel>
  `,
};
