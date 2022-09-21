import { Item } from '@/domain/protocols/use-cases'
import { itemIconByType } from '@/ui/view/components/item'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

/**
 * @attr empty-message
 */
export class IgnemEquipmentSlot extends IgnemElement {
  #itemId: string | null = null

  get itemId() {
    return this.#itemId
  }

  setItem(item: Item | null) {
    if (!item) {
      this.#itemId = null
      const emptyMessage = this.getAttribute('empty-message') ?? 'None'
      this.select('.equip-slot').innerText = emptyMessage
      return
    }

    this.#itemId = item.id
    this.select('.equip-slot').replaceChildren(
      html`
        <div class="equip-item-display">
          <img alt="Item icon" src="${itemIconByType(item)}" />
          <p>${item.name}</p>
        </div>
      `
    )
  }

  styling() {
    return css`
      .equip-slot-container {
        background-color: var(--bright-black);
        box-sizing: border-box;
        padding: 10px;
        border: 2px solid transparent;
        border-radius: 4px;
        cursor: pointer;
      }

      :host(.selected) .equip-slot-container {
        border: 2px solid var(--container-border-color);
      }

      .equip-slot-title {
        font-weight: bold;
        font-size: 1.1rem;
        padding-bottom: 5px;
        text-indent: 3px;
      }

      .equip-slot {
        width: 230px;
        background-color: var(--black);
        padding: 6px 8px;
        border-radius: 4px;
      }

      .equip-item-display {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .equip-item-display img {
        width: 20px;
        filter: invert(0.8);
      }
    `
  }

  render() {
    const title = this.getAttribute('title')
    const emptyMessage = this.getAttribute('empty-message') ?? 'None'

    return html`
      <div class="equip-slot-container">
        <p class="equip-slot-title">${title}</p>
        <div class="equip-slot">${emptyMessage}</div>
      </div>
    `
  }
}

customElements.define('ignem-equip-slot', IgnemEquipmentSlot)
