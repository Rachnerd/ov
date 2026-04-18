import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-textarea.js';

const meta: Meta = {
  title: 'Atoms/Textarea',
  component: 'ov-textarea',
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  args: {
    placeholder: 'Type your message here…',
    rows: 4,
    resize: 'vertical',
    disabled: false,
    readonly: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:400px">
      <ov-textarea
        placeholder=${args['placeholder']}
        rows=${args['rows']}
        resize=${args['resize']}
        ?disabled=${args['disabled']}
        ?readonly=${args['readonly']}
        ?invalid=${args['invalid']}
      ></ov-textarea>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="max-width:400px;display:flex;flex-direction:column;gap:12px">
      <ov-textarea placeholder="Normal"></ov-textarea>
      <ov-textarea value="This field is read-only and cannot be edited." readonly></ov-textarea>
      <ov-textarea placeholder="Disabled" disabled></ov-textarea>
      <ov-textarea value="This field has a validation error." invalid></ov-textarea>
    </div>
  `,
};

export const FeedbackForm: Story = {
  name: 'Real-world: Feedback form',
  render: () => html`
    <div style="max-width:480px;display:flex;flex-direction:column;gap:16px;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
      <div>
        <div style="font-size:18px;font-weight:600;margin-bottom:4px">Share your feedback</div>
        <div style="font-size:13px;color:#6b7280">Help us improve the platform</div>
      </div>
      <ov-textarea
        placeholder="What's working well? What could be better?"
        rows="5"
      ></ov-textarea>
      <div style="font-size:12px;color:#9ca3af;text-align:right">0 / 500</div>
    </div>
  `,
};
