import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-avatar.js';

const meta: Meta = {
  title: 'Atoms/Avatar',
  component: 'ov-avatar',
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    tone:  { control: 'select', options: ['brand', 'accent', 'neutral'] },
    name:  { control: 'text' },
    initials: { control: 'text' },
    src:  { control: 'text' },
  },
  args: {
    name: 'Sarah Kim',
    size: 'md',
    shape: 'circle',
    tone: 'brand',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-avatar
      name=${args['name']}
      initials=${args['initials'] ?? ''}
      src=${args['src'] ?? ''}
      size=${args['size']}
      shape=${args['shape']}
      tone=${args['tone']}
    ></ov-avatar>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-avatar size="xs" name="Anna Berg"></ov-avatar>
      <ov-avatar size="sm" name="Tom Chen"></ov-avatar>
      <ov-avatar size="md" name="Sarah Kim"></ov-avatar>
      <ov-avatar size="lg" name="David Park"></ov-avatar>
      <ov-avatar size="xl" name="Maria Lopez"></ov-avatar>
    </div>
  `,
};

export const Tones: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-avatar name="Brand User" tone="brand"></ov-avatar>
      <ov-avatar name="Accent User" tone="accent"></ov-avatar>
      <ov-avatar name="Neutral User" tone="neutral"></ov-avatar>
    </div>
  `,
};

export const Shapes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-avatar name="Circle" shape="circle" size="lg"></ov-avatar>
      <ov-avatar name="Square Org" shape="square" size="lg"></ov-avatar>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <ov-avatar name="Derived Initials"></ov-avatar>
      <ov-avatar initials="AI"></ov-avatar>
      <ov-avatar name="No initials fallback"></ov-avatar>
    </div>
  `,
};

export const AvatarStack: Story = {
  name: 'Real-world: Avatar stack',
  render: () => html`
    <div style="display:flex;align-items:center;gap:12px">
      <div style="display:flex">
        <ov-avatar name="Alice W" tone="brand" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
        <ov-avatar name="Bob M" tone="accent" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
        <ov-avatar name="Carol S" tone="neutral" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
        <ov-avatar initials="+4" tone="neutral" style="border:2px solid white;border-radius:50%"></ov-avatar>
      </div>
      <span style="font-size:13px;color:#6b7280">8 team members</span>
    </div>
  `,
};
