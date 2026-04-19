import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-toast.js';

const meta: Meta = {
  title: 'Molecules/Toast',
  component: 'ov-toast',
  argTypes: {
    variant:  { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title:    { control: 'text' },
    message:  { control: 'text' },
    duration: { control: 'number' },
  },
  args: {
    variant: 'info',
    title: 'Notification',
    message: 'Something happened that you should know about.',
    duration: 0,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const el = html`
      <ov-toast
        id="story-toast"
        toast-id="demo"
        variant=${args['variant']}
        title=${args['title']}
        message=${args['message']}
        duration=${args['duration']}
      ></ov-toast>
    `;
    setTimeout(() => {
      document.getElementById('story-toast')?.['show']?.();
    }, 100);
    return el;
  },
};

export const Variants: Story = {
  render: () => {
    const tpl = html`
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px">
        <ov-toast id="t-info"    variant="info"    title="Info"    message="A new version is available." duration="0"></ov-toast>
        <ov-toast id="t-success" variant="success" title="Saved"   message="Your changes have been saved." duration="0"></ov-toast>
        <ov-toast id="t-warning" variant="warning" title="Warning" message="Your session expires in 5 minutes." duration="0"></ov-toast>
        <ov-toast id="t-danger"  variant="danger"  title="Error"   message="Connection failed. Please retry." duration="0"></ov-toast>
      </div>
    `;
    setTimeout(() => {
      ['t-info', 't-success', 't-warning', 't-danger'].forEach((id) => {
        document.getElementById(id)?.['show']?.();
      });
    }, 100);
    return tpl;
  },
};

export const States: Story = {
  render: () => {
    const tpl = html`
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px">
        <ov-toast id="s-title-only" variant="success" title="Done" duration="0"></ov-toast>
        <ov-toast id="s-msg-only"   variant="info"    message="Background sync completed." duration="0"></ov-toast>
        <ov-toast id="s-both"       variant="warning" title="Storage low" message="Less than 100 MB remaining." duration="0"></ov-toast>
      </div>
    `;
    setTimeout(() => {
      ['s-title-only', 's-msg-only', 's-both'].forEach((id) => {
        document.getElementById(id)?.['show']?.();
      });
    }, 100);
    return tpl;
  },
};

export const ToastStack: Story = {
  name: 'Real-world: Notification stack',
  render: () => {
    const tpl = html`
      <div style="position:relative;height:200px;max-width:400px">
        <div style="position:absolute;bottom:0;right:0;display:flex;flex-direction:column;gap:8px;width:100%">
          <ov-toast id="stack-1" variant="success" title="File uploaded" message="report-q1.pdf was uploaded successfully." duration="0"></ov-toast>
          <ov-toast id="stack-2" variant="info"    title="Sync complete" message="Your portfolio was synced with the latest market data." duration="0"></ov-toast>
        </div>
      </div>
    `;
    setTimeout(() => {
      ['stack-1', 'stack-2'].forEach((id) => {
        document.getElementById(id)?.['show']?.();
      });
    }, 100);
    return tpl;
  },
};
