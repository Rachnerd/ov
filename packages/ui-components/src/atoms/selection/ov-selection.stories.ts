import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-selection.js';

const meta: Meta = {
  title: 'Atoms/Selection Controls',
  component: 'ov-checkbox',
};

export default meta;
type Story = StoryObj;

export const Checkbox: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-checkbox>Unchecked</ov-checkbox>
      <ov-checkbox checked>Checked</ov-checkbox>
      <ov-checkbox indeterminate>Indeterminate</ov-checkbox>
      <ov-checkbox disabled>Disabled unchecked</ov-checkbox>
      <ov-checkbox checked disabled>Disabled checked</ov-checkbox>
    </div>
  `,
};

export const RadioGroup: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-radio name="plan" value="starter" checked>Starter — Free forever</ov-radio>
      <ov-radio name="plan" value="growth">Growth — $29/month</ov-radio>
      <ov-radio name="plan" value="enterprise">Enterprise — Custom pricing</ov-radio>
      <ov-radio name="plan" value="disabled" disabled>Legacy plan (unavailable)</ov-radio>
    </div>
  `,
};

export const Switch: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-switch>Email notifications</ov-switch>
      <ov-switch checked>Dark mode</ov-switch>
      <ov-switch disabled>Disabled off</ov-switch>
      <ov-switch checked disabled>Disabled on</ov-switch>
    </div>
  `,
};

export const SettingsPanel: Story = {
  name: 'Real-world: Settings panel',
  render: () => html`
    <div style="max-width:400px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="padding:16px 20px;border-bottom:1px solid #e5e7eb">
        <div style="font-size:15px;font-weight:600">Notification preferences</div>
        <div style="font-size:13px;color:#6b7280;margin-top:2px">Choose how you want to be notified</div>
      </div>
      <div style="padding:8px 0">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px">
          <div>
            <div style="font-size:14px;font-weight:500">Email summaries</div>
            <div style="font-size:12px;color:#6b7280">Weekly portfolio digest</div>
          </div>
          <ov-switch checked></ov-switch>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px">
          <div>
            <div style="font-size:14px;font-weight:500">Price alerts</div>
            <div style="font-size:12px;color:#6b7280">Notify on significant moves</div>
          </div>
          <ov-switch checked></ov-switch>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px">
          <div>
            <div style="font-size:14px;font-weight:500">Marketing emails</div>
            <div style="font-size:12px;color:#6b7280">Product updates and tips</div>
          </div>
          <ov-switch></ov-switch>
        </div>
      </div>
    </div>
  `,
};

export const CheckboxList: Story = {
  name: 'Real-world: Multi-select filter',
  render: () => html`
    <div style="max-width:240px;border:1px solid #e5e7eb;border-radius:12px;padding:16px">
      <div style="font-size:13px;font-weight:600;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280">Asset class</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <ov-checkbox checked>Equities</ov-checkbox>
        <ov-checkbox checked>Fixed Income</ov-checkbox>
        <ov-checkbox>Alternatives</ov-checkbox>
        <ov-checkbox>Real Estate</ov-checkbox>
        <ov-checkbox indeterminate>Cash & Equivalents</ov-checkbox>
      </div>
    </div>
  `,
};
