import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-divider.js';

const meta: Meta = {
  title: 'Atoms/Divider',
  component: 'ov-divider',
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['default', 'subtle', 'strong'] },
    spacing: { control: 'text' },
  },
  args: {
    orientation: 'horizontal',
    variant: 'default',
    spacing: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:400px">
      <ov-divider
        orientation=${args['orientation']}
        variant=${args['variant']}
        spacing=${args['spacing'] || ''}
      ></ov-divider>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
      <div>
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280">Default</p>
        <ov-divider></ov-divider>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280">Subtle</p>
        <ov-divider variant="subtle"></ov-divider>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:13px;color:#6b7280">Strong</p>
        <ov-divider variant="strong"></ov-divider>
      </div>
    </div>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
      <ov-divider>OR</ov-divider>
      <ov-divider>Continue with</ov-divider>
    </div>
  `,
};

export const Vertical: Story = {
  render: () => html`
    <div style="display:flex;align-items:center;height:40px;font-size:14px">
      <span>Dashboard</span>
      <ov-divider orientation="vertical"></ov-divider>
      <span>Reports</span>
      <ov-divider orientation="vertical"></ov-divider>
      <span>Settings</span>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
      <ov-divider></ov-divider>
      <ov-divider>Label</ov-divider>
      <ov-divider variant="subtle"></ov-divider>
      <ov-divider variant="strong"></ov-divider>
    </div>
  `,
};

export const LoginPageOR: Story = {
  name: 'Real-world: Login OR divider',
  render: () => html`
    <div style="max-width:320px;display:flex;flex-direction:column;gap:16px">
      <button style="padding:10px;border:1px solid #e5e7eb;border-radius:8px;background:white;cursor:pointer;font-size:14px">
        Continue with Google
      </button>
      <ov-divider>OR</ov-divider>
      <input type="email" placeholder="Email address" style="padding:10px;border:1px solid #e5e7eb;border-radius:8px;font-size:14px">
    </div>
  `,
};
