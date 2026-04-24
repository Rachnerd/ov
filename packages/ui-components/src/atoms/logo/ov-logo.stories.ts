import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-logo.js';

const DARK_BG =
  'background: var(--ov-charcoal); padding: var(--ov-space-8); display: flex; align-items: center; gap: var(--ov-space-6);';

const meta: Meta = {
  title: 'Atoms/Logo',
  component: 'ov-logo',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: { size: 'md' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style=${DARK_BG}>
      <ov-logo size=${args['size']}></ov-logo>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style=${DARK_BG + 'flex-direction: column; align-items: flex-start;'}>
      <ov-logo size="xs"></ov-logo>
      <ov-logo size="sm"></ov-logo>
      <ov-logo size="md"></ov-logo>
      <ov-logo size="lg"></ov-logo>
      <ov-logo size="xl"></ov-logo>
    </div>
  `,
};

export const TokenOverride: Story = {
  name: 'CSS token override (parent-driven size)',
  render: () => html`
    <div
      style=${DARK_BG +
      'flex-direction: column; align-items: flex-start; gap: var(--ov-space-4);'}
    >
      <p style="color: var(--ov-white); font-size: var(--ov-fs-xs); margin: 0;">
        size="sm" but --ov-logo-height overridden to 48px
      </p>
      <ov-logo size="sm" style="--ov-logo-height: 48px;"></ov-logo>
      <p style="color: var(--ov-white); font-size: var(--ov-fs-xs); margin: 0;">
        No size prop — purely token-driven at 36px
      </p>
      <ov-logo style="--ov-logo-height: 36px;"></ov-logo>
    </div>
  `,
};

export const RealWorldNavBar: Story = {
  name: 'Real-world: nav bar logo',
  render: () => html`
    <div style=${DARK_BG}>
      <ov-logo size="sm"></ov-logo>
    </div>
  `,
};

export const RealWorldHero: Story = {
  name: 'Real-world: hero logo',
  render: () => html`
    <div
      style="background: var(--ov-charcoal); min-height: 200px; display: flex; align-items: center; justify-content: center;"
    >
      <ov-logo size="lg"></ov-logo>
    </div>
  `,
};
