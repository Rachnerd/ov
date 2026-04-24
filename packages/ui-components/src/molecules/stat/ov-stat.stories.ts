import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-stat.js';

const meta: Meta = {
  title: 'Molecules/Stat',
  component: 'ov-stat',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    sublabel: { control: 'text' },
    delta: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
  args: {
    label: 'Total revenue',
    value: '$84,200',
    sublabel: 'vs last month',
    delta: '+14.3%',
    trend: 'up',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-stat
      label=${args['label']}
      value=${args['value']}
      sublabel=${args['sublabel'] || ''}
      delta=${args['delta'] || ''}
      trend=${args['trend']}
    ></ov-stat>
  `,
};

export const Trends: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      <ov-stat
        label="Revenue"
        value="$84,200"
        delta="+14.3%"
        trend="up"
        sublabel="vs last month"
      ></ov-stat>
      <ov-stat
        label="Churn rate"
        value="2.1%"
        delta="-0.4%"
        trend="down"
        sublabel="vs last month"
      ></ov-stat>
      <ov-stat
        label="Active sessions"
        value="847"
        delta="0%"
        trend="neutral"
        sublabel="no change"
      ></ov-stat>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;flex-wrap:wrap">
      <ov-stat label="No delta" value="12,340"></ov-stat>
      <ov-stat label="Delta only" value="42%" delta="+5%" trend="up"></ov-stat>
      <ov-stat
        label="Full stat"
        value="$9,800"
        delta="-12%"
        trend="down"
        sublabel="this quarter"
      ></ov-stat>
    </div>
  `,
};

export const DashboardGrid: Story = {
  name: 'Real-world: Dashboard stats grid',
  render: () => html`
    <div
      style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:900px"
    >
      ${[
        {
          label: 'Total AUM',
          value: '$2.4B',
          delta: '+8.2%',
          trend: 'up',
          sublabel: 'vs last quarter',
        },
        {
          label: 'Active clients',
          value: '1,284',
          delta: '+32',
          trend: 'up',
          sublabel: 'this month',
        },
        {
          label: 'Avg. return',
          value: '14.3%',
          delta: '+2.1%',
          trend: 'up',
          sublabel: 'YTD',
        },
        {
          label: 'Attrition',
          value: '1.8%',
          delta: '-0.3%',
          trend: 'down',
          sublabel: 'vs last year',
        },
      ].map(
        (s) => html`
          <div style="padding:20px;border:1px solid #e5e7eb;border-radius:10px">
            <ov-stat
              label=${s.label}
              value=${s.value}
              delta=${s.delta}
              trend=${s.trend}
              sublabel=${s.sublabel}
            ></ov-stat>
          </div>
        `,
      )}
    </div>
  `,
};
