import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-link.js';

const meta: Meta = {
  title: 'Atoms/Link',
  component: 'ov-link',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'brand', 'inverse'],
    },
    underline: { control: 'select', options: ['hover', 'always', 'none'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { variant: 'default', underline: 'hover', size: 'md' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <ov-link
      href="#"
      variant=${args['variant']}
      underline=${args['underline']}
      size=${args['size']}
    >
      View portfolio details
    </ov-link>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <ov-link href="#" variant="default">Default link</ov-link>
      <ov-link href="#" variant="brand">Brand link</ov-link>
      <ov-link href="#" variant="subtle">Subtle link</ov-link>
      <div style="background:#1D252D;padding:12px;border-radius:8px">
        <ov-link href="#" variant="inverse">Inverse link on dark</ov-link>
      </div>
    </div>
  `,
};

export const InlineProse: Story = {
  name: 'Real-world: Inline prose',
  render: () => html`
    <p style="max-width:520px;font-size:14px;line-height:1.6;color:#374151">
      Your portfolio is performing well this quarter.
      <ov-link href="#">View the full report</ov-link> to see asset-class
      breakdowns, or <ov-link href="#">schedule a review</ov-link> with your
      advisor.
      <ov-link href="#" variant="subtle" style="margin-left:4px"
        >Learn more about our methodology →</ov-link
      >
    </p>
  `,
};
