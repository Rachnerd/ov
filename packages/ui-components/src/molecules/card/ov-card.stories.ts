import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-card.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/badge/ov-badge.js';
import '../../atoms/avatar/ov-avatar.js';
import '../../atoms/heading/ov-heading.js';
import '../../atoms/text/ov-text.js';

const meta: Meta = {
  title: 'Molecules/Card',
  component: 'ov-card',
  argTypes: {
    variant: { control: 'select', options: ['default', 'brand', 'inverse', 'inverse-brand'] },
    interactive: { control: 'boolean' },
    borderless: { control: 'boolean' },
    flush: { control: 'boolean' },
  },
  args: { variant: 'default', interactive: false, borderless: false, flush: false },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width:360px">
      <ov-card
        variant=${args['variant']}
        ?interactive=${args['interactive']}
        ?borderless=${args['borderless']}
        ?flush=${args['flush']}
      >
        <div slot="header">
          <ov-heading level="3">Portfolio Overview</ov-heading>
        </div>
        <ov-text variant="body-sm" as="p">
          Track your investments, monitor performance, and stay informed about market movements.
        </ov-text>
        <div slot="footer">
          <ov-button variant="primary" size="sm">Open dashboard</ov-button>
        </div>
      </ov-card>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:720px">
      <ov-card variant="default">
        <div slot="header"><ov-heading level="4">Default</ov-heading></div>
        <ov-text variant="body-sm" as="p">White surface, charcoal text. The standard workhorse.</ov-text>
      </ov-card>
      <ov-card variant="brand">
        <div slot="header"><ov-heading level="4">Brand</ov-heading></div>
        <ov-text variant="body-sm" as="p">Blue background for featured content and CTAs.</ov-text>
      </ov-card>
      <ov-card variant="inverse">
        <div slot="header"><ov-heading level="4">Inverse</ov-heading></div>
        <ov-text variant="body-sm" as="p">Charcoal surface for dark sections and sidebars.</ov-text>
      </ov-card>
      <ov-card variant="inverse-brand">
        <div slot="header"><ov-heading level="4">Inverse Brand</ov-heading></div>
        <ov-text variant="body-sm" as="p">Brand blue text on charcoal — high contrast accent.</ov-text>
      </ov-card>
    </div>
  `,
};

export const InteractiveCards: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:720px">
      <ov-card interactive>
        <div slot="header">
          <ov-badge variant="success" size="sm">+12.4%</ov-badge>
          <ov-heading level="4" style="margin-top:8px">Technology</ov-heading>
        </div>
        <ov-text variant="body-sm" tone="secondary" as="p">$148,320 · 32% of portfolio</ov-text>
      </ov-card>
      <ov-card interactive>
        <div slot="header">
          <ov-badge variant="info" size="sm">+3.1%</ov-badge>
          <ov-heading level="4" style="margin-top:8px">Fixed Income</ov-heading>
        </div>
        <ov-text variant="body-sm" tone="secondary" as="p">$87,500 · 19% of portfolio</ov-text>
      </ov-card>
      <ov-card interactive>
        <div slot="header">
          <ov-badge variant="danger" size="sm">-2.8%</ov-badge>
          <ov-heading level="4" style="margin-top:8px">Energy</ov-heading>
        </div>
        <ov-text variant="body-sm" tone="secondary" as="p">$41,200 · 9% of portfolio</ov-text>
      </ov-card>
    </div>
  `,
};

export const StatCard: Story = {
  name: 'Real-world: Stat card',
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:640px">
      <ov-card>
        <ov-text variant="eyebrow" as="p">Total value</ov-text>
        <ov-heading level="2" size="display-2" style="margin-top:4px">$463,218</ov-heading>
        <ov-text variant="body-sm" tone="success" as="p" style="margin-top:4px">↑ 14.3% this quarter</ov-text>
      </ov-card>
      <ov-card>
        <ov-text variant="eyebrow" as="p">Annual return</ov-text>
        <ov-heading level="2" size="display-2" style="margin-top:4px">18.7%</ov-heading>
        <ov-text variant="body-sm" tone="secondary" as="p" style="margin-top:4px">vs 15.4% benchmark</ov-text>
      </ov-card>
      <ov-card variant="brand">
        <ov-text variant="eyebrow" as="p">Risk score</ov-text>
        <ov-heading level="2" size="display-2" style="margin-top:4px">6 / 10</ov-heading>
        <ov-text variant="body-sm" as="p" style="margin-top:4px">Moderate growth</ov-text>
      </ov-card>
    </div>
  `,
};

export const ProfileCard: Story = {
  name: 'Real-world: Profile card',
  render: () => html`
    <div style="max-width:300px">
      <ov-card>
        <div slot="header" style="display:flex;align-items:center;gap:12px">
          <ov-avatar name="Sarah Kim" size="lg" tone="accent"></ov-avatar>
          <div>
            <ov-heading level="4">Sarah Kim</ov-heading>
            <ov-text variant="body-sm" tone="secondary">Senior Portfolio Manager</ov-text>
          </div>
        </div>
        <ov-text variant="body-sm" as="p" tone="secondary">
          Specializing in ESG and emerging market equities with 12 years of experience.
        </ov-text>
        <div slot="footer">
          <ov-button variant="primary" size="sm">
            <ov-icon slot="start" name="mail"></ov-icon>
            Contact
          </ov-button>
          <ov-button variant="ghost" size="sm">View profile</ov-button>
        </div>
      </ov-card>
    </div>
  `,
};
