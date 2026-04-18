import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-heading.js';

const meta: Meta = {
  title: 'Atoms/Heading',
  component: 'ov-heading',
  argTypes: {
    level:  { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
    size:   { control: { type: 'select' }, options: ['', 'display-1', 'display-2', 'h1', 'h2', 'h3', 'h4'] },
    tone:   { control: { type: 'select' }, options: ['primary', 'secondary', 'brand', 'accent', 'inverse'] },
  },
  args: { level: 2, size: '', tone: 'primary' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-heading level=${args['level']} size=${args['size']} tone=${args['tone']}>
      Empowering investment decisions
    </ov-heading>
  `,
};

export const Levels: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--ov-space-4)">
      <ov-heading level="1">H1 — The future of financial clarity</ov-heading>
      <ov-heading level="2">H2 — Empowering investment decisions</ov-heading>
      <ov-heading level="3">H3 — Real-time portfolio insights</ov-heading>
      <ov-heading level="4">H4 — Customizable dashboards</ov-heading>
      <ov-heading level="5">H5 — Export and reporting</ov-heading>
      <ov-heading level="6">H6 — Section Label</ov-heading>
    </div>
  `,
};

export const DisplaySizes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--ov-space-5)">
      <ov-heading level="1" size="display-1">Display 1 — Bold Vision</ov-heading>
      <ov-heading level="2" size="display-2">Display 2 — Strategic Insight</ov-heading>
      <ov-heading level="2" size="h1">H1 size on H2 element</ov-heading>
      <ov-heading level="3" size="h2">H2 size on H3 element</ov-heading>
    </div>
  `,
};

export const Tones: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--ov-space-3)">
      <ov-heading level="2" tone="primary">Primary</ov-heading>
      <ov-heading level="2" tone="secondary">Secondary</ov-heading>
      <ov-heading level="2" tone="brand">Brand</ov-heading>
      <ov-heading level="2" tone="accent">Accent</ov-heading>
      <div style="background:var(--ov-charcoal);padding:var(--ov-space-4);border-radius:var(--ov-radius-md)">
        <ov-heading level="2" tone="inverse">Inverse</ov-heading>
      </div>
    </div>
  `,
};

export const RealWorldHero: Story = {
  name: 'Real-world: Hero section',
  render: () => html`
    <div style="max-width:640px;display:flex;flex-direction:column;gap:var(--ov-space-3)">
      <ov-heading level="1" size="display-1">Q1 Portfolio Performance Exceeds Expectations</ov-heading>
      <ov-heading level="2" tone="secondary">Strong results across all asset classes</ov-heading>
    </div>
  `,
};
