import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-avatar-divider.js';

const meta: Meta = {
  title: 'Atoms/Avatar & Divider',
  component: 'ov-avatar',
};

export default meta;
type Story = StoryObj;

export const Initials: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-avatar size="xs" name="Anna Berg"></ov-avatar>
      <ov-avatar size="sm" name="Tom Chen"></ov-avatar>
      <ov-avatar size="md" name="Sarah Kim"></ov-avatar>
      <ov-avatar size="lg" name="David Park"></ov-avatar>
      <ov-avatar size="xl" name="Maria Lopez"></ov-avatar>
    </div>
  `,
};

export const Tones: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-avatar name="Brand User" tone="brand"></ov-avatar>
      <ov-avatar name="Accent User" tone="accent"></ov-avatar>
      <ov-avatar name="Neutral User" tone="neutral"></ov-avatar>
    </div>
  `,
};

export const Shapes: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center">
      <ov-avatar name="Circle" shape="circle" size="lg"></ov-avatar>
      <ov-avatar name="Square" shape="square" size="lg"></ov-avatar>
    </div>
  `,
};

export const AvatarStack: Story = {
  name: 'Real-world: Avatar stack',
  render: () => html`
    <div style="display:flex;align-items:center">
      <div style="display:flex">
        <ov-avatar name="Alice W" tone="brand" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
        <ov-avatar name="Bob M" tone="accent" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
        <ov-avatar name="Carol S" tone="neutral" style="margin-right:-8px;border:2px solid white;border-radius:50%"></ov-avatar>
        <ov-avatar initials="+4" tone="neutral" style="border:2px solid white;border-radius:50%"></ov-avatar>
      </div>
      <span style="margin-left:12px;font-size:13px;color:#6b7280">8 team members</span>
    </div>
  `,
};

export const Dividers: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
      <div>
        <p style="margin:0 0 12px;font-size:13px">Default divider</p>
        <ov-divider></ov-divider>
      </div>
      <div>
        <p style="margin:0 0 12px;font-size:13px">With label</p>
        <ov-divider>OR</ov-divider>
      </div>
      <div>
        <p style="margin:0 0 12px;font-size:13px">Subtle</p>
        <ov-divider variant="subtle"></ov-divider>
      </div>
      <div>
        <p style="margin:0 0 12px;font-size:13px">Strong</p>
        <ov-divider variant="strong"></ov-divider>
      </div>
    </div>
  `,
};

export const VerticalDivider: Story = {
  render: () => html`
    <div style="display:flex;align-items:center;height:40px">
      <span style="font-size:14px">Dashboard</span>
      <ov-divider orientation="vertical"></ov-divider>
      <span style="font-size:14px">Reports</span>
      <ov-divider orientation="vertical"></ov-divider>
      <span style="font-size:14px">Settings</span>
    </div>
  `,
};

export const UserProfile: Story = {
  name: 'Real-world: User profile row',
  render: () => html`
    <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;max-width:320px">
      <ov-avatar name="Rachel Heimbach" size="md" tone="brand"></ov-avatar>
      <div>
        <div style="font-size:14px;font-weight:600">Rachel Heimbach</div>
        <div style="font-size:12px;color:#6b7280">Portfolio Manager</div>
      </div>
    </div>
  `,
};
