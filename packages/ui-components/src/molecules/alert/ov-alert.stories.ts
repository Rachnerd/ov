import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-alert.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/link/ov-link.js';

const meta: Meta = {
  title: 'Molecules/Alert',
  component: 'ov-alert',
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant: 'info',
    title: 'Heads up',
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:560px">
      <ov-alert
        variant=${args['variant']}
        title=${args['title']}
        ?dismissible=${args['dismissible']}
      >
        This is an informational message to keep you in the loop.
      </ov-alert>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="max-width:560px;display:flex;flex-direction:column;gap:12px">
      <ov-alert variant="info" title="Portfolio rebalanced">
        Your portfolio was automatically rebalanced to match your target allocation.
      </ov-alert>
      <ov-alert variant="success" title="Trade executed">
        Your buy order for 50 shares of MSFT was filled at $382.14.
      </ov-alert>
      <ov-alert variant="warning" title="Margin call approaching">
        Your margin usage is at 78%. Consider reducing exposure to avoid a margin call.
      </ov-alert>
      <ov-alert variant="danger" title="Authentication failed">
        Too many failed login attempts. Your account has been temporarily locked.
      </ov-alert>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () => html`
    <div style="max-width:560px;display:flex;flex-direction:column;gap:12px">
      <ov-alert variant="info" title="New feature available" dismissible>
        We've launched AI-powered insights for your portfolio. Try it now in the Reports tab.
      </ov-alert>
      <ov-alert variant="warning" title="Profile incomplete" dismissible>
        Complete your investor profile to unlock personalized recommendations.
      </ov-alert>
    </div>
  `,
};

export const WithActions: Story = {
  render: () => html`
    <div style="max-width:560px;display:flex;flex-direction:column;gap:12px">
      <ov-alert variant="warning" title="Session expiring soon">
        Your session will expire in 5 minutes. Save your work to avoid losing changes.
        <div slot="actions">
          <ov-button variant="secondary" size="sm">Stay signed in</ov-button>
          <ov-link href="#">Sign out</ov-link>
        </div>
      </ov-alert>
      <ov-alert variant="info" title="Upgrade your plan">
        You've used 80% of your report quota. Upgrade to Pro for unlimited reports.
        <div slot="actions">
          <ov-button variant="primary" size="sm">View plans</ov-button>
        </div>
      </ov-alert>
    </div>
  `,
};

export const NoTitle: Story = {
  render: () => html`
    <div style="max-width:560px;display:flex;flex-direction:column;gap:12px">
      <ov-alert variant="success">Changes saved successfully.</ov-alert>
      <ov-alert variant="danger">Unable to connect to the data provider. Please try again.</ov-alert>
    </div>
  `,
};
