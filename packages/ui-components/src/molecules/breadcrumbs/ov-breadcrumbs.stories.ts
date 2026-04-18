import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-breadcrumbs.js';

const meta: Meta = {
  title: 'Molecules/Breadcrumbs',
  component: 'ov-breadcrumbs',
};

export default meta;
type Story = StoryObj;

export const Simple: Story = {
  render: () => html`
    <ov-breadcrumbs
      .items=${[
        { label: 'Dashboard', href: '/' },
        { label: 'Portfolios', href: '/portfolios' },
        { label: 'Growth Fund' },
      ]}
    ></ov-breadcrumbs>
  `,
};

export const Deep: Story = {
  render: () => html`
    <ov-breadcrumbs
      .items=${[
        { label: 'Dashboard', href: '/' },
        { label: 'Clients', href: '/clients' },
        { label: 'Acme Corp', href: '/clients/acme' },
        { label: 'Portfolios', href: '/clients/acme/portfolios' },
        { label: 'Growth Fund', href: '/clients/acme/portfolios/growth' },
        { label: 'Q1 Report' },
      ]}
    ></ov-breadcrumbs>
  `,
};

export const Truncated: Story = {
  render: () => html`
    <ov-breadcrumbs
      .items=${[
        { label: 'Dashboard', href: '/' },
        { label: 'Clients', href: '/clients' },
        { label: 'Acme Corp', href: '/clients/acme' },
        { label: 'Portfolios', href: '/clients/acme/portfolios' },
        { label: 'Growth Fund', href: '/clients/acme/portfolios/growth' },
        { label: 'Q1 Report' },
      ]}
      max="3"
    ></ov-breadcrumbs>
  `,
};

export const SingleLevel: Story = {
  render: () => html`
    <ov-breadcrumbs
      .items=${[
        { label: 'Dashboard', href: '/' },
        { label: 'Settings' },
      ]}
    ></ov-breadcrumbs>
  `,
};
