import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-carousel.js';
import '@ov/ui-components/molecules/image-card/ov-image-card';
import '@ov/ui-components/atoms/text/ov-text';
import '@ov/ui-components/atoms/link/ov-link';

const ITEMS = html`
  <ov-image-card label="Amsterdam"  src="/banner.jpg" href="#"></ov-image-card>
  <ov-image-card label="Arnhem"     src="/banner.jpg" href="#"></ov-image-card>
  <ov-image-card label="Düsseldorf" src="/banner.jpg" href="#"></ov-image-card>
  <ov-image-card label="Rotterdam"  src="/banner.jpg" href="#"></ov-image-card>
  <ov-image-card label="Eindhoven"  src="/banner.jpg" href="#"></ov-image-card>
  <ov-image-card label="Utrecht"    src="/banner.jpg" href="#"></ov-image-card>
`;

const meta: Meta = {
  title: 'Organisms/Carousel',
  component: 'ov-carousel',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading:      { control: 'text' },
    visibleCount: { control: { type: 'number', min: 1, max: 5 } },
    autoPlayMs:   { control: { type: 'number', min: 0, step: 500 } },
  },
  args: {
    heading:      'Featured cities',
    visibleCount: 3,
    autoPlayMs:   4000,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-carousel
      heading=${args['heading']}
      visible-count=${args['visibleCount']}
      auto-play-ms=${args['autoPlayMs']}
    >
      ${ITEMS}
    </ov-carousel>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <ov-carousel heading="Our offices in 8 cities">
      <ov-text slot="description" variant="body" as="p">
        Present throughout the Netherlands.
        <ov-link href="/contact">Contact us</ov-link>.
      </ov-text>
      ${ITEMS}
    </ov-carousel>
  `,
};

export const TwoVisible: Story = {
  name: '2 items visible',
  render: () => html`
    <ov-carousel heading="Projects" visible-count="2">
      ${ITEMS}
    </ov-carousel>
  `,
};

export const NoAutoPlay: Story = {
  name: 'Manual navigation only',
  render: () => html`
    <ov-carousel heading="Gallery" auto-play-ms="0">
      ${ITEMS}
    </ov-carousel>
  `,
};

export const FewItems: Story = {
  name: 'No dots (items ≤ visible-count)',
  render: () => html`
    <ov-carousel heading="Small set" visible-count="3">
      <ov-image-card label="Amsterdam"  src="/banner.jpg" href="#"></ov-image-card>
      <ov-image-card label="Rotterdam"  src="/banner.jpg" href="#"></ov-image-card>
      <ov-image-card label="Eindhoven"  src="/banner.jpg" href="#"></ov-image-card>
    </ov-carousel>
  `,
};

export const RealWorldOpenValue: Story = {
  name: 'Real-world: OpenValue homepage section',
  render: () => html`
    <ov-carousel heading="Our offices in 8 cities">
      <ov-text slot="description" variant="lead" as="p">
        Spread across the Netherlands — always close to you.
        <ov-link href="/contact">Get in touch</ov-link>.
      </ov-text>
      ${ITEMS}
    </ov-carousel>
  `,
};
