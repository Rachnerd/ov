import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-empty-state.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/icon/ov-icon.js';

const meta: Meta = {
  title: 'Molecules/EmptyState',
  component: 'ov-empty-state',
  argTypes: {
    heading:     { control: 'text' },
    description: { control: 'text' },
    icon:        { control: 'text' },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    heading: 'No results found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
    icon: 'search',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-empty-state
      heading=${args['heading']}
      description=${args['description']}
      icon=${args['icon'] || ''}
      size=${args['size']}
    ></ov-empty-state>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">
      <div style="border:1px dashed #e5e7eb;border-radius:8px;padding:8px">
        <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;text-align:center">sm</p>
        <ov-empty-state size="sm" heading="Nothing here" description="This list is currently empty."></ov-empty-state>
      </div>
      <div style="border:1px dashed #e5e7eb;border-radius:8px;padding:8px">
        <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;text-align:center">md</p>
        <ov-empty-state size="md" heading="No results" description="Try adjusting your search."></ov-empty-state>
      </div>
      <div style="border:1px dashed #e5e7eb;border-radius:8px;padding:8px">
        <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;text-align:center">lg</p>
        <ov-empty-state size="lg" heading="Welcome aboard!" description="Let's get started by creating your first item."></ov-empty-state>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:40px">
      <ov-empty-state heading="Default icon" description="Uses the built-in dashed box."></ov-empty-state>
      <ov-empty-state icon="search" heading="Built-in icon" description="Using the icon prop."></ov-empty-state>
      <ov-empty-state icon="mail" heading="With action">
        <ov-button slot="actions" variant="primary">
          <ov-icon slot="start" name="plus"></ov-icon>
          Create first item
        </ov-button>
      </ov-empty-state>
    </div>
  `,
};

export const EmptyInbox: Story = {
  name: 'Real-world: Empty inbox',
  render: () => html`
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:48px 24px">
      <ov-empty-state
        size="lg"
        icon="mail"
        heading="Your inbox is empty"
        description="When clients send you messages, they'll show up here."
      >
        <ov-button slot="actions" variant="primary">Invite a client</ov-button>
        <ov-button slot="actions" variant="ghost">Learn more</ov-button>
      </ov-empty-state>
    </div>
  `,
};
