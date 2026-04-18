import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-badge.js';

const meta: Meta = {
  title: 'Atoms/Badge',
  component: 'ov-badge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'brand', 'accent', 'success', 'warning', 'danger', 'info'],
    },
    appearance: { control: 'select', options: ['soft', 'solid', 'outline'] },
    size: { control: 'select', options: ['sm', 'md'] },
    pill: { control: 'boolean' },
  },
  args: { variant: 'brand', appearance: 'soft', size: 'md', pill: true },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-badge
      variant=${args['variant']}
      appearance=${args['appearance']}
      size=${args['size']}
      ?pill=${args['pill']}
    >New</ov-badge>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <ov-badge variant="default">Default</ov-badge>
      <ov-badge variant="brand">Brand</ov-badge>
      <ov-badge variant="accent">Accent</ov-badge>
      <ov-badge variant="success">Success</ov-badge>
      <ov-badge variant="warning">Warning</ov-badge>
      <ov-badge variant="danger">Danger</ov-badge>
      <ov-badge variant="info">Info</ov-badge>
    </div>
  `,
};

export const SolidAppearance: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <ov-badge variant="brand" appearance="solid">Brand</ov-badge>
      <ov-badge variant="accent" appearance="solid">Accent</ov-badge>
      <ov-badge variant="success" appearance="solid">Success</ov-badge>
      <ov-badge variant="warning" appearance="solid">Warning</ov-badge>
      <ov-badge variant="danger" appearance="solid">Danger</ov-badge>
      <ov-badge variant="info" appearance="solid">Info</ov-badge>
    </div>
  `,
};

export const OutlineAppearance: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <ov-badge variant="brand" appearance="outline">Brand</ov-badge>
      <ov-badge variant="accent" appearance="outline">Accent</ov-badge>
      <ov-badge variant="success" appearance="outline">Success</ov-badge>
      <ov-badge variant="warning" appearance="outline">Warning</ov-badge>
      <ov-badge variant="danger" appearance="outline">Danger</ov-badge>
      <ov-badge variant="info" appearance="outline">Info</ov-badge>
    </div>
  `,
};

export const WithStatusDot: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <ov-badge variant="success">
        <span slot="dot" style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span>
        Online
      </ov-badge>
      <ov-badge variant="warning">
        <span slot="dot" style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span>
        Away
      </ov-badge>
      <ov-badge variant="danger">
        <span slot="dot" style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block"></span>
        Offline
      </ov-badge>
    </div>
  `,
};

export const RealWorldUsage: Story = {
  name: 'Real-world: Status labels',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:500px">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px">
        <span style="font-size:14px;font-weight:500">Quarterly Report Q1</span>
        <ov-badge variant="success" size="sm">Published</ov-badge>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px">
        <span style="font-size:14px;font-weight:500">2024 Annual Forecast</span>
        <ov-badge variant="warning" size="sm">Draft</ov-badge>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px">
        <span style="font-size:14px;font-weight:500">Market Analysis</span>
        <ov-badge variant="info" size="sm">In Review</ov-badge>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px">
        <span style="font-size:14px;font-weight:500">Legacy Budget 2022</span>
        <ov-badge variant="default" appearance="outline" size="sm">Archived</ov-badge>
      </div>
    </div>
  `,
};
