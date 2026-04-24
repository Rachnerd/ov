import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-field.js';
import '../../atoms/input/ov-input.js';
import '../../atoms/textarea/ov-textarea.js';
import '../../atoms/label/ov-label.js';

const meta: Meta = {
  title: 'Molecules/Field',
  component: 'ov-field',
  argTypes: {
    label: { control: 'text' },
    status: {
      control: 'select',
      options: ['idle', 'success', 'error', 'warning'],
    },
    message: { control: 'text' },
    required: { control: 'boolean' },
    inline: { control: 'boolean' },
  },
  args: {
    label: 'Email address',
    status: 'idle',
    message: '',
    required: false,
    inline: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:400px">
      <ov-field
        label=${args['label']}
        status=${args['status']}
        message=${args['message']}
        ?required=${args['required']}
        ?inline=${args['inline']}
        for="demo-input"
      >
        <ov-input id="demo-input" placeholder="you@company.com"></ov-input>
        <span slot="help">We'll never share your email.</span>
      </ov-field>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="max-width:400px;display:flex;flex-direction:column;gap:20px">
      <ov-field label="Username" status="idle" for="f1">
        <ov-input id="f1" placeholder="Enter username"></ov-input>
        <span slot="help">3–20 characters, letters and numbers only.</span>
      </ov-field>

      <ov-field label="Email" status="success" message="Looks good!" for="f2">
        <ov-input id="f2" value="user@company.com" type="email"></ov-input>
      </ov-field>

      <ov-field
        label="Password"
        status="warning"
        message="Weak password — try adding symbols."
        for="f3"
      >
        <ov-input id="f3" type="password" value="password123"></ov-input>
      </ov-field>

      <ov-field
        label="Confirm email"
        status="error"
        message="Email addresses do not match."
        for="f4"
      >
        <ov-input id="f4" type="email" value="different@email.com"></ov-input>
      </ov-field>
    </div>
  `,
};

export const Required: Story = {
  render: () => html`
    <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
      <ov-field label="Full name" required for="fn">
        <ov-input id="fn" placeholder="Jane Smith"></ov-input>
      </ov-field>
      <ov-field label="Company" required for="co">
        <ov-input id="co" placeholder="Acme Corp"></ov-input>
      </ov-field>
      <ov-field label="Notes" for="notes">
        <ov-textarea id="notes" placeholder="Optional notes…"></ov-textarea>
      </ov-field>
    </div>
  `,
};

export const InlineLayout: Story = {
  render: () => html`
    <div style="max-width:500px;display:flex;flex-direction:column;gap:12px">
      <ov-field label="Display name" inline for="dn">
        <ov-input id="dn" value="Rachel Heimbach"></ov-input>
      </ov-field>
      <ov-field label="Email" inline for="em">
        <ov-input id="em" type="email" value="rachel@openvalue.com"></ov-input>
      </ov-field>
      <ov-field label="Phone" inline for="ph">
        <ov-input id="ph" type="tel" placeholder="+1 (555) 000-0000"></ov-input>
      </ov-field>
    </div>
  `,
};

export const CompleteForm: Story = {
  name: 'Real-world: Registration form',
  render: () => html`
    <div
      style="max-width:440px;padding:32px;border:1px solid #e5e7eb;border-radius:16px"
    >
      <div style="margin-bottom:24px">
        <div style="font-size:22px;font-weight:700;margin-bottom:4px">
          Create your account
        </div>
        <div style="font-size:14px;color:#6b7280">
          Start your 14-day free trial
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <ov-field label="Full name" required for="reg-name">
          <ov-input id="reg-name" placeholder="Jane Smith"></ov-input>
        </ov-field>
        <ov-field
          label="Work email"
          required
          status="error"
          message="Please enter a valid work email."
          for="reg-email"
        >
          <ov-input
            id="reg-email"
            type="email"
            value="jane@gmail.com"
          ></ov-input>
        </ov-field>
        <ov-field label="Company" required for="reg-company">
          <ov-input id="reg-company" placeholder="Your company name"></ov-input>
        </ov-field>
        <ov-field label="Password" required for="reg-pw">
          <ov-input id="reg-pw" type="password"></ov-input>
          <span slot="help"
            >At least 8 characters with a number and symbol.</span
          >
        </ov-field>
      </div>
    </div>
  `,
};
