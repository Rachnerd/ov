import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import '@ov/ui-components/molecules/office-card/ov-office-card';
import '@ov/ui-components/atoms/heading/ov-heading';

export interface OfficeItem {
  label: string;
  src:   string;
  href:  string;
}

/**
 * <ov-office-carousel>
 *
 * An animated carousel showing office city cards. Displays 3 cards at a time
 * with smooth scroll, dot navigation, and optional auto-play.
 *
 * @element ov-office-carousel
 *
 * @slot description - Optional descriptive text rendered below the heading.
 */
@customElement('ov-office-carousel')
export class OvOfficeCarousel extends LitElement {
  /** Section heading. */
  @property({ type: String }) heading = '';

  /** List of office items to display. */
  @property({ type: Array }) items: OfficeItem[] = [];

  /** Auto-play interval in ms. Set to 0 to disable. */
  @property({ type: Number, attribute: 'auto-play-ms' }) autoPlayMs = 4000;

  @state() private _current = 0;

  @query('.track') private _track!: HTMLElement;

  private _timer: ReturnType<typeof setInterval> | null = null;

  private get _visibleCount() { return 3; }

  private get _maxIndex() {
    return Math.max(0, this.items.length - this._visibleCount);
  }

  override connectedCallback() {
    super.connectedCallback();
    this._startAutoPlay();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoPlay();
  }

  private _startAutoPlay() {
    if (this.autoPlayMs <= 0) return;
    this._timer = setInterval(() => this._advance(), this.autoPlayMs);
  }

  private _stopAutoPlay() {
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  private _advance() {
    this._current = this._current >= this._maxIndex ? 0 : this._current + 1;
    this._scrollToCard(this._current);
  }

  private _goTo(index: number) {
    this._current = index;
    this._scrollToCard(index);
    this._stopAutoPlay();
    this._startAutoPlay();
  }

  private _scrollToCard(index: number) {
    if (!this._track) return;
    const card = this._track.children[index] as HTMLElement | undefined;
    if (card) {
      this._track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }
  }

  static override styles = [
    baseStyles,
    css`
      :host { display: block; }

      .wrapper {
        padding: var(--ov-space-16) var(--ov-space-8);
      }

      .meta {
        text-align: center;
        margin-bottom: var(--ov-space-10);
      }

      .meta ::slotted(*) {
        display: block;
        margin-top: var(--ov-space-4);
      }

      .viewport {
        overflow: hidden;
        container-type: inline-size;
      }

      .track {
        display: flex;
        gap: var(--ov-space-5);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .track::-webkit-scrollbar { display: none; }

      .track ov-office-card {
        flex: 0 0 calc((100cqi - var(--ov-space-5) * 2) / 3);
        scroll-snap-align: start;
      }

      .dots {
        display: flex;
        justify-content: center;
        gap: var(--ov-space-2);
        margin-top: var(--ov-space-8);
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        padding: 0;
        background: var(--color-border, #d1d5db);
        transition: background var(--ov-duration-fast, 150ms);
      }

      .dot[aria-current='true'] {
        background: var(--color-brand, #1b6ef3);
      }
    `,
  ];

  protected override render(): TemplateResult {
    const dots = this.items.map((_, i) => html`
      <button
        class="dot"
        aria-label="Go to slide ${i + 1}"
        aria-current=${i === this._current ? 'true' : 'false'}
        @click=${() => this._goTo(i)}
      ></button>
    `);

    return html`
      <div class="wrapper">
        <div class="meta">
          ${this.heading
            ? html`<ov-heading level="2">${this.heading}</ov-heading>`
            : nothing}
          <slot name="description"></slot>
        </div>

        <div class="viewport">
          <div class="track">
            ${this.items.map(item => html`
              <ov-office-card
                label=${item.label}
                src=${item.src}
                href=${item.href}
              ></ov-office-card>
            `)}
          </div>
        </div>

        ${this.items.length > this._visibleCount
          ? html`<div class="dots">${dots}</div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-office-carousel': OvOfficeCarousel;
  }
}
