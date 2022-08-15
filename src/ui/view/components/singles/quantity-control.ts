import { trashIcon } from '@/ui/view/components/icons'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

export interface IgnemQuantityControlElement extends IgnemElement {
  quantity: number
}

/**
 * @event -increment
 * @event -decrement
 * 
 * @prop {Number} quantity
 */
export class IgnemQuantityControl extends IgnemElement {
  #quantity = 1

  get quantity() {
    return this.#quantity
  }

  set quantity(value: number) {
    this.#quantity = Math.max(1, value)
    
    if (this.#quantity === 1) {
      this.select('[minus]')!.innerHTML = trashIcon().toString()
    } else {
      this.select('[minus]')!.innerHTML = '&minus;'
    }

    this.select('[quantity]')!.textContent = this.#quantity.toString()
  }

  styling() {
    return css`
      .quantity-control-container {
        padding: 6px 10px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        margin-bottom: 18px;
        background-color: var(--black);
      }

      .quantity-control-container button {
        width: 30px;
        font-size: 1.1rem;
        font-weight: bold;
        background-color: transparent;
        padding: 6px;
        border: 0;
        border-radius: 2px;
        color: var(--font-color);
        cursor: pointer;
      }

      .quantity-control-container button:hover {
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
    const incrementQuantity = () => {
      this.quantity += 1

      this.dispatchEvent(new CustomEvent('increment', {
        detail: { quantity: this.#quantity }
      }))
    }

    const decrementQuantity = () => {
      this.quantity -= 1

      this.dispatchEvent(new CustomEvent('decrement', {
        detail: { quantity: this.#quantity }
      }))
    }

    return html`
      <div class="quantity-control-container">
        <span>Quantity</span>
        <div class="quantity-controls">
          <button
            minus
            type="button"
            on-click=${decrementQuantity}
          >
            ${trashIcon()}
          </button>
          <span quantity>1</span>
          <button
            plus
            type="button"
            on-click=${incrementQuantity}
          >
            &plus;
          </button>
        </div>
      </div>
    `
  }
}

customElements.define('ignem-quantity-control', IgnemQuantityControl)
