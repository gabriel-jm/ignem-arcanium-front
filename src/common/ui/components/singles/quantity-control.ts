import { minusIcon, plusIcon } from '@/common/ui/components/icons/index.js'
import { IgnemElement } from '@/common/ui/ignem-element.js'
import { css, html } from 'lithen-fns'

/**
 * @event -increment
 * @event -decrement
 */
export class IgnemQuantityControl extends IgnemElement {
  #quantity = 1

  constructor() {
    super({ preventRender: true })
    this.applyRender()
  }

  $(query: string) {
    return this.root.querySelector(query)
  }

  getQuantity() {
    return this.#quantity
  }

  setQuantity(value: number) {
    this.#quantity = value < 1 ? 1 : value

    this.$('[quantity]')!.textContent = this.#quantity.toString()
  }

  incrementQuantity = () => {
    this.setQuantity(this.getQuantity() + 1)

    this.dispatchEvent(new CustomEvent('increment', {
      detail: { quantity: this.#quantity }
    }))
  }

  decrementQuantity = () => {
    this.setQuantity(this.getQuantity() - 1)

    this.dispatchEvent(new CustomEvent('decrement', {
      detail: { quantity: this.#quantity }
    }))
  }

  styling() {
    return css`
      .quantity-controls button {
        width: 22px;
        background-color: transparent;
        padding: 4px;
        border: 0;
        border-radius: 2px;
        color: var(--font-color);
        cursor: pointer;
      }

      .quantity-controls button:hover {
        background-color: var(--black-800);
      }

      .quantity-controls {
        display: flex;
        min-width: 100px;
        justify-content: space-between;
        align-items: center;
      }
    `
  }

  render() {
    const initialQuantity = this.getAttribute('quantity') ?? '1'

    return html`
      <div class="quantity-controls">
        <button
          minus
          type="button"
          on-click=${this.decrementQuantity}
        >
          ${minusIcon()}
        </button>
        <span quantity>${initialQuantity}</span>
        <button
          plus
          type="button"
          on-click=${this.incrementQuantity}
        >
          ${plusIcon()}
        </button>
      </div>
    `
  }
}

customElements.define('ignem-quantity-control', IgnemQuantityControl)
