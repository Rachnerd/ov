import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-label.js';
import '../input/ov-input.js';

const meta: Meta = {
  title: 'Atoms/Label',
  component: 'ov-label',
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    required: { control: 'boolean' },
    for: { control: 'text' },
  },
  args: {
    size: 'md',
    required: false,
    for: '',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-label
      for=${args['for'] || ''}
      size=${args['size']}
      ?required=${args['required']}
      >Email address</ov-label
    >
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-label size="md">Medium label (default)</ov-label>
      <ov-label size="sm">Small label</ov-label>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-label>Basic label</ov-label>
      <ov-label required>Required field</ov-label>
      <ov-label>
        Password
        <span slot="hint">Min. 8 characters</span>
      </ov-label>
      <ov-label required>
        Full name
        <span slot="hint">As on your ID</span>
      </ov-label>
    </div>
  `,
};

export const WithHint: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:4px">
      <ov-label for="pw" required>
        Password
        <span slot="hint">Minimum 8 characters</span>
      </ov-label>
      <ov-input id="pw" type="password" placeholder="••••••••"></ov-input>
    </div>
  `,
};

export const FormField: Story = {
  name: 'Real-world: Form field pair',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
      <div style="display:flex;flex-direction:column;gap:6px">
        <ov-label for="email" required>Email address</ov-label>
        <ov-input
          id="email"
          type="email"
          placeholder="you@example.com"
        ></ov-input>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <ov-label for="pw" required>
          Password
          <span slot="hint">Min. 8 characters</span>
        </ov-label>
        <ov-input id="pw" type="password"></ov-input>
      </div>
    </div>
  `,
};
