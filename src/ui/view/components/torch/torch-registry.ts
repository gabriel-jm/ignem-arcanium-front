import { IgnemElement } from '@/ui/view'
import { css, html } from 'lithen-tag-functions'
import { torchLitIcon } from './torch-lit-icon'
import { torchOffIcon } from './torch-off-icon'

export class IgnemTorchRegistry extends IgnemElement {
  #id = this.getAttribute('id') || ''

  get id() {
    return this.#id
  }
  
  styling() {
    return css`
      .torch-card {
        --lit-color: #c09f34;
        --off-color: #333;

        display: flex;
        align-items: center;
        gap: 0 18px;
        padding: 12px 14px;
        border: 0;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: #1b1b1b;
        box-shadow: 0 0 0 3px var(--off-color),
          0 0 3px 1px #1114
        ;
        cursor: default;
        transition: 300ms all;
      }

      .torch-card.lit {
        box-shadow: 0 0 0 3px var(--lit-color),
          0 0 6px 2px #eed151c7
        ;
      }

      .torch-card > div {
        flex: 1;
      }

      .torch-owner {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .torch-owner > h3 {
        font-size: 1.8rem;
      }

      .torch-owner > p {
        font-size: 1.45rem;
        font-weight: bold;
      }

      .torch-charges {
        display: flex;
        height: 5px;
        justify-content: stretch;
        align-items: center;
        gap: 0 6px;
        padding: 8px 0 4px;
        box-sizing: content-box;
      }

      .charge-count {
        height: 100%;
        width: 100%;
        background-color: #121212;
        border-radius: 50px;
      }

      .charge-count.filled {
        background-color: var(--off-color);
      }

      .torch-card.lit .charge-count.filled {
        background-color: var(--lit-color);
      }

      .torch-icon {
        display: block;
        width: 4rem;
        fill: var(--off-color);
      }

      .torch-card.lit .torch-icon {
        fill: var(--lit-color);
      }
    `
  }

  render() {
    const isLit = this.getAttribute('is-lit')
    const isTorchLit = isLit === 'true'
    const torchCharge = Number(this.getAttribute('torch-charge'))
    const list = Array.from({ length: 6 }).map((_value, index) => html`
      <li
        class="charge-count ${index+1 <= torchCharge && 'filled'}"
      ></li>
    `)

    return html`
      <div class="torch-card ${isTorchLit && 'lit'}">
        ${isTorchLit
          ? torchLitIcon('torch-icon')
          : torchOffIcon('torch-icon')
        }
        <div>
          <div class="torch-owner">
            <h3 data-tooltip="Character name">${this.getAttribute('character-name')}</h3>
            <p data-tooltip="Torch count">${this.getAttribute('torch-count')}</p>
          </div>
          <ul data-tooltip="Torch charge" class="torch-charges">
            ${list}
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('ignem-torch-registry', IgnemTorchRegistry)
