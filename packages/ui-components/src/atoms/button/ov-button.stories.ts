import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-button.js';
import '../icon/ov-icon.js';

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'ov-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'inverse', 'accent', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: (args) => html`
    <ov-button
      variant=${args['variant']}
      size=${args['size']}
      ?disabled=${args['disabled']}
      ?loading=${args['loading']}
      ?block=${args['block']}
      >Get started</ov-button
    >
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      <ov-button variant="primary">Primary</ov-button>
      <ov-button variant="secondary">Secondary</ov-button>
      <ov-button variant="ghost">Ghost</ov-button>
      <ov-button variant="accent">Accent</ov-button>
      <ov-button variant="danger">Danger</ov-button>
      <div style="background:#1D252D;padding:8px;border-radius:8px">
        <ov-button variant="inverse">Inverse</ov-button>
      </div>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-button size="sm">Small</ov-button>
      <ov-button size="md">Medium</ov-button>
      <ov-button size="lg">Large</ov-button>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      <ov-button variant="primary">
        <ov-icon slot="start" name="plus"></ov-icon>
        New project
      </ov-button>
      <ov-button variant="secondary">
        Search
        <ov-icon slot="end" name="search"></ov-icon>
      </ov-button>
      <ov-button variant="ghost">
        <ov-icon slot="start" name="arrow-left"></ov-icon>
        Back
      </ov-button>
      <ov-button variant="accent">
        Continue
        <ov-icon slot="end" name="arrow-right"></ov-icon>
      </ov-button>
    </div>
  `,
};

export const LoadingState: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <ov-button variant="primary" loading>Submitting...</ov-button>
      <ov-button variant="secondary" loading>Loading</ov-button>
      <ov-button variant="danger" loading>Deleting</ov-button>
    </div>
  `,
};

export const DisabledState: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <ov-button variant="primary" disabled>Primary</ov-button>
      <ov-button variant="secondary" disabled>Secondary</ov-button>
      <ov-button variant="ghost" disabled>Ghost</ov-button>
    </div>
  `,
};

export const BlockLayout: Story = {
  render: () => html`
    <div style="max-width:400px;display:flex;flex-direction:column;gap:12px">
      <ov-button variant="primary" block>Create account</ov-button>
      <ov-button variant="secondary" block>Sign in instead</ov-button>
    </div>
  `,
};

export const CallToAction: Story = {
  name: 'Real-world: CTA row',
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-button variant="primary" size="lg">
        <ov-icon slot="start" name="user"></ov-icon>
        Create free account
      </ov-button>
      <ov-button variant="ghost" size="lg">View demo</ov-button>
    </div>
  `,
};
