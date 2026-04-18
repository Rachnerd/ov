import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ov-input-group.js';
import '../../atoms/input/ov-input.js';
import '../../atoms/button/ov-button.js';
import '../../atoms/icon/ov-icon.js';

const meta: Meta = {
  title: 'Molecules/InputGroup',
  component: 'ov-input-group',
};

export default meta;
type Story = StoryObj;

export const SearchBar: Story = {
  render: () => html`
    <div style="max-width:440px">
      <ov-input-group attach="end">
        <ov-input placeholder="Search portfolios, clients, reports…"></ov-input>
        <ov-button slot="end" variant="primary">
          <ov-icon name="search"></ov-icon>
        </ov-button>
      </ov-input-group>
    </div>
  `,
};

export const UrlInput: Story = {
  render: () => html`
    <div style="max-width:480px">
      <ov-input-group attach="both">
        <span slot="start">https://</span>
        <ov-input placeholder="your-domain.com"></ov-input>
        <ov-button slot="end" variant="secondary">Copy</ov-button>
      </ov-input-group>
    </div>
  `,
};

export const CurrencyInput: Story = {
  render: () => html`
    <div style="max-width:280px">
      <ov-input-group attach="start">
        <span slot="start">USD $</span>
        <ov-input type="number" placeholder="0.00"></ov-input>
      </ov-input-group>
    </div>
  `,
};

export const PromoCode: Story = {
  name: 'Real-world: Promo code',
  render: () => html`
    <div style="max-width:380px;display:flex;flex-direction:column;gap:8px">
      <label style="font-size:13px;font-weight:500">Referral code</label>
      <ov-input-group attach="end">
        <ov-input placeholder="OPENVALUE2024"></ov-input>
        <ov-button slot="end" variant="accent">Apply</ov-button>
      </ov-input-group>
    </div>
  `,
};

export const NewsletterSignup: Story = {
  name: 'Real-world: Email capture',
  render: () => html`
    <div style="max-width:480px;padding:32px;background:#1D252D;border-radius:12px">
      <div style="color:white;font-size:18px;font-weight:600;margin-bottom:4px">Stay ahead of the market</div>
      <div style="color:#9ca3af;font-size:13px;margin-bottom:16px">Weekly insights delivered to your inbox</div>
      <ov-input-group attach="end">
        <ov-input type="email" placeholder="your@email.com"></ov-input>
        <ov-button slot="end" variant="accent">Subscribe</ov-button>
      </ov-input-group>
    </div>
  `,
};
