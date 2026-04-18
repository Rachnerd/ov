import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-icon.js';

const meta: Meta = {
  title: 'Atoms/Icon',
  component: 'ov-icon',
  argTypes: {
    name: {
      control: 'select',
      options: [
        'check', 'x', 'arrow-right', 'arrow-left', 'search', 'mail',
        'info', 'warning', 'sun', 'moon', 'plus', 'user',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { name: 'check', size: 'md' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-icon name=${args['name']} size=${args['size']}></ov-icon>
  `,
};

export const AllIcons: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:16px">
      ${['check', 'x', 'arrow-right', 'arrow-left', 'search', 'mail', 'info', 'warning', 'sun', 'moon', 'plus', 'user'].map(
        (name) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;border:1px solid #e5e7eb;border-radius:8px">
            <ov-icon name=${name} size="lg"></ov-icon>
            <span style="font-size:11px;color:#6b7280;font-family:monospace">${name}</span>
          </div>
        `
      )}
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:flex-end">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <ov-icon name="user" size="sm"></ov-icon>
        <span style="font-size:11px;color:#6b7280">sm</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <ov-icon name="user" size="md"></ov-icon>
        <span style="font-size:11px;color:#6b7280">md</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <ov-icon name="user" size="lg"></ov-icon>
        <span style="font-size:11px;color:#6b7280">lg</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <ov-icon name="user" size="xl"></ov-icon>
        <span style="font-size:11px;color:#6b7280">xl</span>
      </div>
    </div>
  `,
};

export const InheritColor: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center">
      <span style="color:var(--color-brand,#3D7DC9)"><ov-icon name="check" size="lg"></ov-icon></span>
      <span style="color:var(--color-danger,#e53e3e)"><ov-icon name="x" size="lg"></ov-icon></span>
      <span style="color:var(--color-warning,#d97706)"><ov-icon name="warning" size="lg"></ov-icon></span>
      <span style="color:var(--color-success,#16a34a)"><ov-icon name="info" size="lg"></ov-icon></span>
    </div>
  `,
};

export const Spinner: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center">
      <ov-spinner size="sm" tone="brand"></ov-spinner>
      <ov-spinner size="md" tone="brand"></ov-spinner>
      <ov-spinner size="lg" tone="brand"></ov-spinner>
      <ov-spinner size="xl" tone="neutral"></ov-spinner>
      <div style="background:#1D252D;padding:8px;border-radius:8px">
        <ov-spinner size="md" tone="inverse"></ov-spinner>
      </div>
    </div>
  `,
};
