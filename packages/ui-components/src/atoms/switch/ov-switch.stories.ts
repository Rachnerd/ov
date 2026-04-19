import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-switch.js';

const meta: Meta = {
  title: 'Atoms/Switch',
  component: 'ov-switch',
  argTypes: {
    checked:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    value:    { control: 'text' },
    name:     { control: 'text' },
  },
  args: {
    checked: false,
    disabled: false,
    value: 'on',
    name: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-switch
      ?checked=${args['checked']}
      ?disabled=${args['disabled']}
      value=${args['value']}
      name=${args['name']}
    >Enable notifications</ov-switch>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-switch>Off (default)</ov-switch>
      <ov-switch checked>On</ov-switch>
      <ov-switch disabled>Disabled (off)</ov-switch>
      <ov-switch checked disabled>Disabled (on)</ov-switch>
    </div>
  `,
};

export const SettingsPanel: Story = {
  name: 'Real-world: Settings panel',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:0;max-width:360px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
      ${[
        { label: 'Email notifications', checked: true },
        { label: 'Push notifications', checked: false },
        { label: 'Weekly digest', checked: true },
        { label: 'Marketing emails', checked: false },
      ].map((item, i, arr) => html`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;${i < arr.length - 1 ? 'border-bottom:1px solid #f3f4f6' : ''}">
          <span style="font-size:14px">${item.label}</span>
          <ov-switch ?checked=${item.checked}></ov-switch>
        </div>
      `)}
    </div>
  `,
};
