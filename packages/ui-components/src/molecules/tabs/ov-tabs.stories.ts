import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-tabs.js';

const meta: Meta = {
  title: 'Molecules/Tabs',
  component: 'ov-tabs',
  argTypes: {
    appearance: { control: 'select', options: ['underline', 'pills'] },
    fill: { control: 'boolean' },
  },
  args: { appearance: 'underline', fill: false },
};

export default meta;
type Story = StoryObj;

const dashboardTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'holdings', label: 'Holdings', count: 24 },
  { key: 'transactions', label: 'Transactions', count: 128 },
  { key: 'analytics', label: 'Analytics' },
  { key: 'documents', label: 'Documents', disabled: true },
];

export const Underline: Story = {
  render: () => html`
    <ov-tabs .tabs=${dashboardTabs} active="overview"></ov-tabs>
  `,
};

export const Pills: Story = {
  render: () => html`
    <ov-tabs .tabs=${dashboardTabs} active="holdings" appearance="pills"></ov-tabs>
  `,
};

export const Filled: Story = {
  render: () => html`
    <div style="max-width:480px">
      <ov-tabs
        .tabs=${[
          { key: 'month', label: '1M' },
          { key: 'quarter', label: '3M' },
          { key: 'ytd', label: 'YTD' },
          { key: 'year', label: '1Y' },
          { key: 'max', label: 'MAX' },
        ]}
        active="quarter"
        appearance="pills"
        fill
      ></ov-tabs>
    </div>
  `,
};

export const WithContent: Story = {
  name: 'Real-world: Tab panel',
  render: () => html`
    <div style="max-width:600px">
      <ov-tabs
        .tabs=${[
          { key: 'positions', label: 'Positions', count: 12 },
          { key: 'orders', label: 'Open Orders', count: 3 },
          { key: 'history', label: 'Trade History' },
        ]}
        active="positions"
        @change=${(e: CustomEvent) => {
          const panel = document.querySelector('#tab-content');
          if (panel) panel.textContent = `Content for tab: ${e.detail.key}`;
        }}
      ></ov-tabs>
      <div id="tab-content" style="padding:20px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;font-size:14px;color:#374151">
        Content for tab: positions
      </div>
    </div>
  `,
};

export const DisabledTabs: Story = {
  render: () => html`
    <ov-tabs
      .tabs=${[
        { key: 'active', label: 'Active' },
        { key: 'pending', label: 'Pending' },
        { key: 'archived', label: 'Archived', disabled: true },
        { key: 'deleted', label: 'Deleted', disabled: true },
      ]}
      active="active"
    ></ov-tabs>
  `,
};
