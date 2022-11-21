import { Item } from '@/domain/protocols/use-cases'
import { closeIcon } from '@/ui/view/components/icons'
import { itemIconByType } from '@/ui/view/components/item'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

const rarities = ['common', 'uncommon']

const borderImageByRarity = rarities.map(rarity => css`
  .equip-slot.${rarity} {
    border-image-source: linear-gradient(
      to bottom right,
      var(--bright-${rarity}),
      var(--black) 35%
    );
  }
`)

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
    
    const equipSlot = this.select('.equip-slot')
    equipSlot.className = `equip-slot ${item.rarity.toLowerCase()}`
    equipSlot.replaceChildren(
      html`
        <div class="equip-item-display">
          <div class="equip-item-name">
            <img alt="Item icon" src="${itemIconByType(item)}" />
            <p>${item.name}</p>
          </div>
          <div on-click=${this.removeItem.bind(this)}>
            ${closeIcon()}
          </div>
        </div>
      `
    )
  }

  removeItem() {
    const emptyMessage = this.getAttribute('empty-message') ?? 'None'
    const equipSlot = this.select('.equip-slot')
    equipSlot.className = 'equip-slot'
    equipSlot.replaceChildren(new Text(emptyMessage))
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
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 8px 8px;
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
          to top left,
          var(--black),
          var(--black)
        );
        border-radius: 4px;
      }

      ${borderImageByRarity}

      .equip-item-display {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .equip-item-name {
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
