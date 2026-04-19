import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-spinner.js';

const meta: Meta = {
  title: 'Atoms/Spinner',
  component: 'ov-spinner',
  argTypes: {
    size:  { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    tone:  { control: 'select', options: ['brand', 'neutral', 'inverse'] },
    label: { control: 'text' },
  },
  args: {
    size: 'md',
    tone: 'brand',
    label: 'Loading',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-spinner
      size=${args['size']}
      tone=${args['tone']}
      label=${args['label']}
    ></ov-spinner>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <ov-spinner size="sm"></ov-spinner>
      <ov-spinner size="md"></ov-spinner>
      <ov-spinner size="lg"></ov-spinner>
      <ov-spinner size="xl"></ov-spinner>
    </div>
  `,
};

export const Tones: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <ov-spinner tone="brand"></ov-spinner>
      <ov-spinner tone="neutral"></ov-spinner>
      <div style="background:var(--ov-charcoal,#1d252d);padding:12px;border-radius:8px">
        <ov-spinner tone="inverse"></ov-spinner>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
      <ov-spinner size="sm" tone="brand"></ov-spinner>
      <ov-spinner size="md" tone="neutral"></ov-spinner>
      <ov-spinner size="lg" label="Fetching results"></ov-spinner>
    </div>
  `,
};

export const InlineWithText: Story = {
  name: 'Real-world: Loading state in button',
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <div style="display:inline-flex;align-items:center;gap:8px;padding:10px 16px;background:var(--color-brand,#2563eb);color:white;border-radius:8px;font-size:14px;font-weight:500">
        <ov-spinner size="sm" tone="inverse" label="Saving"></ov-spinner>
        Saving…
      </div>
      <div style="display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px">
        <ov-spinner size="sm" tone="neutral" label="Loading"></ov-spinner>
        Loading data…
      </div>
    </div>
  `,
};
