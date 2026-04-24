import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-radio.js';

const meta: Meta = {
  title: 'Atoms/Radio',
  component: 'ov-radio',
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    name: { control: 'text' },
  },
  args: {
    checked: false,
    disabled: false,
    value: 'option',
    name: 'group',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-radio
      ?checked=${args['checked']}
      ?disabled=${args['disabled']}
      value=${args['value']}
      name=${args['name']}
      >Option label</ov-radio
    >
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-radio name="demo" value="a">Unchecked</ov-radio>
      <ov-radio name="demo" value="b" checked>Checked</ov-radio>
      <ov-radio name="demo" value="c" disabled>Disabled</ov-radio>
      <ov-radio name="demo" value="d" checked disabled
        >Checked + disabled</ov-radio
      >
    </div>
  `,
};

export const RadioGroup: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:10px">
      <ov-radio name="plan" value="free" checked>Free — $0/month</ov-radio>
      <ov-radio name="plan" value="pro">Pro — $29/month</ov-radio>
      <ov-radio name="plan" value="enterprise"
        >Enterprise — contact sales</ov-radio
      >
      <ov-radio name="plan" value="legacy" disabled
        >Legacy (unavailable)</ov-radio
      >
    </div>
  `,
};

export const PlanSelector: Story = {
  name: 'Real-world: Plan selection',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;max-width:320px">
      <p style="margin:0 0 8px;font-size:14px;font-weight:600">
        Choose your plan
      </p>
      <label
        style="display:flex;align-items:flex-start;gap:12px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;cursor:pointer"
      >
        <ov-radio name="pricing" value="monthly" checked></ov-radio>
        <div>
          <div style="font-size:14px;font-weight:500">Monthly</div>
          <div style="font-size:12px;color:#6b7280">
            $29/month, cancel anytime
          </div>
        </div>
      </label>
      <label
        style="display:flex;align-items:flex-start;gap:12px;padding:12px;border:1px solid #e5e7eb;border-radius:8px;cursor:pointer"
      >
        <ov-radio name="pricing" value="annual"></ov-radio>
        <div>
          <div style="font-size:14px;font-weight:500">
            Annual <span style="color:green;font-size:12px">Save 20%</span>
          </div>
          <div style="font-size:12px;color:#6b7280">
            $279/year, billed upfront
          </div>
        </div>
      </label>
    </div>
  `,
};
