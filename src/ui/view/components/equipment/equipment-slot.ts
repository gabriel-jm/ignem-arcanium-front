import { Item } from '@/item/types/items.js'
import { equipmentItemCard } from '@/ui/view/components/equipment/equipment-item-card.js'
import { IgnemElement } from '@/ui/view/ignem-element.js'
import { css, html } from 'lithen-fns'

/**
 * @attr empty-message
 */
export class IgnemEquipmentSlot extends IgnemElement {
  #itemId: string | null = null

  get itemId() {
    return this.#itemId
  }

  setItem(item: Item | null) {
    if (item) {
      this.#itemId = item.itemId ?? item.id
    }
    
    this.select('[item-card]').replaceChildren(
      equipmentItemCard({ item, onDelete: this.removeItem.bind(this) })
    )
  }

  removeItem() {
    this.#itemId = null
    this.select('[item-card]').replaceChildren(
      equipmentItemCard()
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
    `
  }

  render() {
    const title = this.getAttribute('title')

    return html`
      <div class="equip-slot-container">
        <p class="equip-slot-title">${title}</p>
        <div item-card>
          ${equipmentItemCard()}
        </div>
      </div>
    `
  }
}

customElements.define('ignem-equip-slot', IgnemEquipmentSlot)
