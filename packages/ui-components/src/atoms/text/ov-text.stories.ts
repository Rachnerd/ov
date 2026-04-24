import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-text.js';

const meta: Meta = {
  title: 'Atoms/Text',
  component: 'ov-text',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['body', 'body-sm', 'lead', 'caption', 'eyebrow', 'code'],
    },
    tone: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'tertiary',
        'muted',
        'brand',
        'accent',
        'success',
        'warning',
        'danger',
        'inverse',
      ],
    },
    weight: {
      control: { type: 'select' },
      options: ['', 'light', 'regular', 'medium', 'semibold', 'bold'],
    },
    as: {
      control: { type: 'select' },
      options: ['span', 'p', 'div', 'small', 'strong', 'em'],
    },
  },
  args: { variant: 'body', tone: 'primary', weight: '', as: 'span' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-text
      variant=${args['variant']}
      tone=${args['tone']}
      weight=${args['weight']}
      as=${args['as']}
    >
      The portfolio's diversification strategy proved resilient against market
      volatility.
    </ov-text>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:var(--ov-space-4);max-width:600px"
    >
      <ov-text variant="lead" as="p"
        >Lead — Larger introductory paragraph text that draws the reader in with
        a bit more breathing room.</ov-text
      >
      <ov-text variant="body" as="p"
        >Body — Standard paragraph text used for most content throughout the
        interface. Comfortable to read at length.</ov-text
      >
      <ov-text variant="body-sm" as="p"
        >Body SM — Slightly smaller body copy for secondary content
        areas.</ov-text
      >
      <ov-text variant="eyebrow">Eyebrow Label</ov-text>
      <ov-text variant="caption" as="p"
        >Caption — Small supplementary text, timestamps, footnotes, and helper
        annotations.</ov-text
      >
      <ov-text variant="code">const value = portfolio.totalReturn;</ov-text>
    </div>
  `,
};

export const Tones: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--ov-space-2)">
      <ov-text tone="primary" as="p">Primary</ov-text>
      <ov-text tone="secondary" as="p">Secondary</ov-text>
      <ov-text tone="tertiary" as="p">Tertiary</ov-text>
      <ov-text tone="muted" as="p">Muted</ov-text>
      <ov-text tone="brand" as="p">Brand</ov-text>
      <ov-text tone="accent" as="p">Accent</ov-text>
      <ov-text tone="success" as="p">Success</ov-text>
      <ov-text tone="warning" as="p">Warning</ov-text>
      <ov-text tone="danger" as="p">Danger</ov-text>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:var(--ov-space-3)">
      <ov-text variant="body" weight="light" as="p">Light weight</ov-text>
      <ov-text variant="body" weight="regular" as="p">Regular weight</ov-text>
      <ov-text variant="body" weight="medium" as="p">Medium weight</ov-text>
      <ov-text variant="body" weight="semibold" as="p">Semibold weight</ov-text>
      <ov-text variant="body" weight="bold" as="p">Bold weight</ov-text>
    </div>
  `,
};

export const RealWorldArticle: Story = {
  name: 'Real-world: Article metadata',
  render: () => html`
    <article style="max-width:640px">
      <ov-text variant="eyebrow">Market Update</ov-text>
      <ov-text variant="lead" as="p" style="margin-top:var(--ov-space-3)">
        Strong results across all asset classes drove a 14.3% return this
        quarter, outperforming the benchmark by 3.1 percentage points.
      </ov-text>
      <ov-text variant="body" as="p" style="margin-top:var(--ov-space-4)">
        The portfolio's diversification strategy proved resilient against market
        volatility, with fixed-income holdings providing stability while equity
        positions captured upside momentum.
      </ov-text>
      <ov-text
        variant="caption"
        tone="secondary"
        as="p"
        style="margin-top:var(--ov-space-3)"
      >
        Published April 18, 2026 · 4 min read
      </ov-text>
    </article>
  `,
};
