import { LitElement, html, css, nothing, type TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { baseStyles } from '../../shared-styles.js';
import '@ov/ui-components/atoms/heading/ov-heading';

/**
 * <ov-carousel>
 *
 * A generic animated carousel. Place any card elements in the default slot —
 * the carousel handles layout, smooth scroll, dot navigation, and auto-play.
 *
 * @element ov-carousel
 *
 * @slot           - The card items to display (any element).
 * @slot description - Optional descriptive text rendered below the heading.
 */
@customElement('ov-carousel')
export class OvCarousel extends LitElement {
  /** Optional section heading. */
  @property({ type: String }) heading = '';

  /** Number of items visible at once. */
  @property({ type: Number, attribute: 'visible-count' }) visibleCount = 3;

  /** Auto-play interval in ms. Set to 0 to disable. */
  @property({ type: Number, attribute: 'auto-play-ms' }) autoPlayMs = 4000;

  @state() private _current = 0;
  @state() private _itemCount = 0;

  @query('.track') private _track!: HTMLElement;

  private _timer: ReturnType<typeof setInterval> | null = null;

  private get _maxIndex() {
    return Math.max(0, this._itemCount - this.visibleCount);
  }

  override connectedCallback() {
    super.connectedCallback();
    this._startAutoPlay();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoPlay();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('visibleCount')) {
      this.style.setProperty('--_vis', String(this.visibleCount));
    }
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
    this._scrollToIndex(this._current);
  }

  private _goTo(index: number) {
    this._current = index;
    this._scrollToIndex(index);
    this._stopAutoPlay();
    this._startAutoPlay();
  }

  private _scrollToIndex(index: number) {
    if (!this._track) return;
    const slot = this._track.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    const items = slot.assignedElements() as HTMLElement[];
    const target = items[index] as HTMLElement | undefined;
    if (!target) return;
    // offsetLeft is relative to the light-DOM offsetParent, which crosses the
    // shadow boundary and gives wrong values. getBoundingClientRect() uses the
    // actual rendered position so it works correctly for slotted elements.
    const left = this._track.scrollLeft
      + target.getBoundingClientRect().left
      - this._track.getBoundingClientRect().left;
    this._track.scrollTo({ left: left, behavior: 'smooth' });
  }

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._itemCount = slot.assignedElements().length;
    this.style.setProperty('--_vis', String(this.visibleCount));
  }

  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        --_vis: 3;
      }

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

      .track {
        display: flex;
        gap: var(--ov-space-5);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .track::-webkit-scrollbar { display: none; }

      ::slotted(*) {
        flex: 0 0 calc(
          (100% - var(--ov-space-5) * (var(--_vis) - 1)) / var(--_vis)
        );
        scroll-snap-align: start;
        min-width: 0;
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
    // Number of distinct scroll positions = items - visible + 1.
    // This is always <= _itemCount, so dots stay in sync with what's visible.
    const dotCount = Math.max(0, this._itemCount - this.visibleCount + 1);
    const showDots = dotCount > 1;

    return html`
      <div class="wrapper">
        <div class="meta">
          ${this.heading
            ? html`<ov-heading level="2">${this.heading}</ov-heading>`
            : nothing}
          <slot name="description"></slot>
        </div>

        <div class="track">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>

        ${showDots ? html`
          <div class="dots">
            ${Array.from({ length: dotCount }, (_, i) => html`
              <button
                class="dot"
                aria-label="Go to slide ${i + 1}"
                aria-current=${i === this._current ? 'true' : 'false'}
                @click=${() => this._goTo(i)}
              ></button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ov-carousel': OvCarousel;
  }
}
