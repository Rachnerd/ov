import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-checkbox.js';
import '../link/ov-link.js';

const meta: Meta = {
  title: 'Atoms/Checkbox',
  component: 'ov-checkbox',
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-checkbox
      ?checked=${args['checked']}
      ?indeterminate=${args['indeterminate']}
      ?disabled=${args['disabled']}
      ?required=${args['required']}
      >Receive email updates</ov-checkbox
    >
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-checkbox>Unchecked</ov-checkbox>
      <ov-checkbox checked>Checked</ov-checkbox>
      <ov-checkbox indeterminate>Indeterminate</ov-checkbox>
      <ov-checkbox disabled>Disabled</ov-checkbox>
      <ov-checkbox checked disabled>Checked + disabled</ov-checkbox>
    </div>
  `,
};

export const RichLabel: Story = {
  name: 'Rich label (with links)',
  render: () => html`
    <ov-checkbox name="terms" value="accepted" required>
      <span
        >I agree to the
        <ov-link href="/terms" variant="brand">Terms of Service</ov-link> and
        <ov-link href="/privacy" variant="brand">Privacy Policy</ov-link></span
      >
    </ov-checkbox>
  `,
};

export const CheckboxGroup: Story = {
  name: 'Real-world: Multi-select options',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:10px">
      <p style="margin:0 0 4px;font-size:13px;font-weight:600">
        Notification preferences
      </p>
      <ov-checkbox name="notif" value="email" checked
        >Email notifications</ov-checkbox
      >
      <ov-checkbox name="notif" value="sms">SMS alerts</ov-checkbox>
      <ov-checkbox name="notif" value="push">Push notifications</ov-checkbox>
      <ov-checkbox name="notif" value="marketing" disabled
        >Marketing emails (unavailable)</ov-checkbox
      >
    </div>
  `,
};
