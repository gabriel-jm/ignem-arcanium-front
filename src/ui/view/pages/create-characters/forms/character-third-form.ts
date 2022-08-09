import { css, html } from 'lithen-tag-functions'
import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { itemTinyCard } from '@/ui/view/components/item'
import { Item } from '@/ui/protocols'
import { ItemsStore } from '@/ui/stores'

export const characterThirdFormStyles = css`
  .inventory-message {
    text-align: center;
    color: var(--sub-font-color);
    margin: 10px 0 20px 0;
    padding: 0 16px;
  }
  
  .inventory-size {
    text-align: right;
  }

  .inventory-size span {
    display: inline-block;
  }

  .inventory-size-message {
    font-size: 1.5rem;
    font-weight: bold;
    padding-right: 20px;
  }

  .size-in-use {
    font-size: 1.5rem;
    padding-right: 8px;
  }

  .max-size {
    color: var(--sub-font-color);
  }

  .inventory-empty-message {
    min-width: 100%;
    text-align: center;
    color: var(--sub-font-color);
  }

  [inventory], [items-list] {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 20px 0;
  }
`

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  const iconByType: Record<string, string> = {
    CONSUMABLE: '/bag.png',
    WEAPON: '/sword.png',
    SHIELD: '/shield.png',
    ARMOR: '/armor.png',
    POTION: '/potion.png'
  }
  const inventoryItems: Item[] = []
  let availableItems: Item[] = []
  let sizeInUse = 0

  function addToInventory(itemId: string | null) {
    const itemIndex = availableItems.findIndex(item => item.id === itemId)

    if (itemIndex !== -1) {
      const item = { ...availableItems[itemIndex] }
      sizeInUse += item.weight
      inventoryItems.push(item)
      availableItems.slice(itemIndex, 1)

      parent.select('.size-in-use')!.textContent = sizeInUse.toString()

      parent.select('.inventory-empty-message')?.remove()

      parent.select('[inventory]')?.append(html`
        <li
          tabindex="0"
          key-id="${item.id}"
          class="item-container ${item.rarity.toLowerCase()}"
        >
          <span class="name" title="${item.name}">
            <img src="${iconByType[item.type] ?? '/potion.png'}" />
            ${item.name}
          </span>
          <span>1</span>
        </li>
      `)
    }
  }

  function onClickItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    addToInventory(itemId)
    target.remove()
  }
  
  parent.once('init', () => {
    availableItems = new ItemsStore().items

    parent.select('[items-list]')?.append(
      ...availableItems.map(item => itemTinyCard({
        ...item,
        onClick: onClickItem
      }))
    )
  })

  return html`
    <p class="inventory-message">
      Select the items that your character is current holding
    </p>

    <p class="inventory-size">
      <span class="inventory-size-message">Inventory size</span>
      <span class="size-in-use">0</span>
      <span class="max-size">/ 200</span>
    </p>

    <h3>Your Inventory</h3>
    <ul inventory>
      <p class="inventory-empty-message">Your inventory is empty</p>
    </ul>

    <h3>Items List</h3>
    <ul items-list></ul>
  `
}
