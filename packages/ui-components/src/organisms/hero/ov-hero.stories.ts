import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-hero.js';
import '@ov/ui-components/atoms/button/ov-button';
import '@ov/ui-components/atoms/logo/ov-logo';

const meta: Meta = {
  title: 'Organisms/Hero',
  component: 'ov-hero',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    src: { control: 'text', description: 'Background image URL' },
    overlay: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'Dark overlay opacity',
    },
  },
  args: {
    heading: '',
    subheading: '',
    src: '',
    overlay: 0.55,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-hero
      heading=${args['heading']}
      subheading=${args['subheading']}
      src=${args['src']}
      .overlay=${args['overlay']}
    >
      <ov-logo slot="logo" size="lg"></ov-logo>
    </ov-hero>
  `,
};

export const TextHeading: Story = {
  name: 'Text heading (no logo)',
  args: { heading: 'OpenValue' },
  render: (args) => html`
    <ov-hero
      heading=${args['heading']}
      subheading=${args['subheading']}
      .overlay=${args['overlay']}
    ></ov-hero>
  `,
};

export const WithActions: Story = {
  render: () => html`
    <ov-hero subheading="Tech Tribes">
      <ov-logo slot="logo" size="lg"></ov-logo>
      <ov-button slot="actions" variant="primary" size="lg"
        >Get in touch</ov-button
      >
      <ov-button slot="actions" variant="inverse" size="lg"
        >Our services</ov-button
      >
    </ov-hero>
  `,
};

export const RealWorldOpenValue: Story = {
  name: 'Real-world: OpenValue homepage hero',
  render: () => html`
    <ov-hero src="/banner.jpg" overlay="0.62" subheading="Tech Tribes">
      <ov-logo slot="logo" size="lg"></ov-logo>
    </ov-hero>
  `,
};
