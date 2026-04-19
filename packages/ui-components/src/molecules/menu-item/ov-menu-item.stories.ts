import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-menu-item.js';
import '../../atoms/icon/ov-icon.js';
import '../../atoms/badge/ov-badge.js';

const meta: Meta = {
  title: 'Molecules/MenuItem',
  component: 'ov-menu-item',
  argTypes: {
    label:       { control: 'text' },
    description: { control: 'text' },
    disabled:    { control: 'boolean' },
    selected:    { control: 'boolean' },
    separator:   { control: 'boolean' },
  },
  args: {
    label: 'Edit profile',
    description: '',
    disabled: false,
    selected: false,
    separator: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:240px;padding:4px;border:1px solid #e5e7eb;border-radius:8px">
      <ov-menu-item
        label=${args['label']}
        description=${args['description'] || ''}
        ?disabled=${args['disabled']}
        ?selected=${args['selected']}
        ?separator=${args['separator']}
      ></ov-menu-item>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <div style="max-width:240px;padding:4px;border:1px solid #e5e7eb;border-radius:8px">
      <ov-menu-item label="Dashboard" selected>
        <ov-icon slot="icon" name="info"></ov-icon>
      </ov-menu-item>
      <ov-menu-item label="Profile">
        <ov-icon slot="icon" name="user"></ov-icon>
      </ov-menu-item>
      <ov-menu-item label="Search">
        <ov-icon slot="icon" name="search"></ov-icon>
        <kbd slot="shortcut">⌘</kbd>
        <kbd slot="shortcut">K</kbd>
      </ov-menu-item>
      <ov-menu-item separator></ov-menu-item>
      <ov-menu-item label="Sign out" disabled></ov-menu-item>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="max-width:240px;padding:4px;border:1px solid #e5e7eb;border-radius:8px">
      <ov-menu-item label="Default item"></ov-menu-item>
      <ov-menu-item label="Selected item" selected></ov-menu-item>
      <ov-menu-item label="Disabled item" disabled></ov-menu-item>
      <ov-menu-item separator></ov-menu-item>
      <ov-menu-item label="With description" description="Short helper text below"></ov-menu-item>
    </div>
  `,
};

export const DropdownMenu: Story = {
  name: 'Real-world: User dropdown menu',
  render: () => html`
    <div style="max-width:220px;padding:4px;border:1px solid #e5e7eb;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.1)">
      <ov-menu-item label="My profile" description="View and edit your account">
        <ov-icon slot="icon" name="user"></ov-icon>
      </ov-menu-item>
      <ov-menu-item label="Settings">
        <ov-icon slot="icon" name="info"></ov-icon>
      </ov-menu-item>
      <ov-menu-item label="Search everything">
        <ov-icon slot="icon" name="search"></ov-icon>
        <kbd slot="shortcut">⌘</kbd>
        <kbd slot="shortcut">K</kbd>
      </ov-menu-item>
      <ov-menu-item separator></ov-menu-item>
      <ov-menu-item label="Sign out">
        <ov-icon slot="icon" name="arrow-right"></ov-icon>
      </ov-menu-item>
    </div>
  `,
};
