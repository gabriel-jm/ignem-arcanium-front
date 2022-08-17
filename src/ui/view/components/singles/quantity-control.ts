import { minusIcon, plusIcon } from '@/ui/view/components/icons'
import { IgnemElement } from '@/ui/view/ignem-element'
import { SelectedElement } from 'lithen-super-element'
import { css, html } from 'lithen-tag-functions'

export interface IgnemQuantityControlElement extends IgnemElement {
  setQuantity(value: number): void
  incrementQuantity(): void
}

/**
 * @event -increment
 * @event -decrement
 * 
 * @prop {Number} quantity
 */
class IgnemQuantityControl extends IgnemElement {
  #quantity = 1

  constructor() {
    super({ preventRenderApplying: true })
    this.applyRender()
    console.log('quantity-control', this.select('[quantity]'))
  }

  init() {
    this.select('[minus]')?.on('click', this.decrementQuantity)
    this.select('[plus]')?.on('click', this.incrementQuantity)
  }

  getQuantity() {
    return this.#quantity
  }

  setQuantity(value: number) {
    this.#quantity = Math.max(1, value)

    this.select('[quantity]')!.textContent = this.#quantity.toString()
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
        background-color: var(--bright-black);
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
