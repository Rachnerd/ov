import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-input.js';
import '../icon/ov-icon.js';

const meta: Meta = {
  title: 'Atoms/Input',
  component: 'ov-input',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  args: {
    type: 'text',
    size: 'md',
    placeholder: 'Enter text…',
    disabled: false,
    readonly: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:360px">
      <ov-input
        type=${args['type']}
        size=${args['size']}
        placeholder=${args['placeholder']}
        value=${args['value'] ?? ''}
        ?disabled=${args['disabled']}
        ?readonly=${args['readonly']}
        ?invalid=${args['invalid']}
      ></ov-input>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="max-width:360px;display:flex;flex-direction:column;gap:12px">
      <ov-input size="sm" placeholder="Small input"></ov-input>
      <ov-input size="md" placeholder="Medium input"></ov-input>
      <ov-input size="lg" placeholder="Large input"></ov-input>
    </div>
  `,
};

export const WithPrefixSuffix: Story = {
  render: () => html`
    <div style="max-width:360px;display:flex;flex-direction:column;gap:12px">
      <ov-input placeholder="Search…">
        <ov-icon slot="prefix" name="search"></ov-icon>
      </ov-input>
      <ov-input type="email" placeholder="you@example.com">
        <ov-icon slot="prefix" name="mail"></ov-icon>
      </ov-input>
      <ov-input type="number" placeholder="0" value="42">
        <span slot="suffix" style="font-size:13px;color:#6b7280">kg</span>
      </ov-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="max-width:360px;display:flex;flex-direction:column;gap:12px">
      <ov-input placeholder="Normal state"></ov-input>
      <ov-input value="Read-only value" readonly></ov-input>
      <ov-input placeholder="Disabled input" disabled></ov-input>
      <ov-input value="Invalid value" invalid></ov-input>
    </div>
  `,
};

export const LoginForm: Story = {
  name: 'Real-world: Login form',
  render: () => html`
    <div
      style="max-width:360px;display:flex;flex-direction:column;gap:16px;padding:24px;border:1px solid #e5e7eb;border-radius:12px"
    >
      <div>
        <label
          style="display:block;font-size:13px;font-weight:500;margin-bottom:6px"
          >Email</label
        >
        <ov-input type="email" placeholder="you@company.com">
          <ov-icon slot="prefix" name="mail"></ov-icon>
        </ov-input>
      </div>
      <div>
        <label
          style="display:block;font-size:13px;font-weight:500;margin-bottom:6px"
          >Password</label
        >
        <ov-input type="password" placeholder="••••••••">
          <ov-icon slot="prefix" name="user"></ov-icon>
        </ov-input>
      </div>
    </div>
  `,
};
