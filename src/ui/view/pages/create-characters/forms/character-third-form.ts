import { css, html } from 'lithen-tag-functions'
import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { itemDetails, itemIconByType, itemTinyCard } from '@/ui/view/components/item'
import { Item } from '@/ui/protocols'
import { ItemsStore } from '@/ui/stores'
import { InventoryItem } from '@/ui/protocols/inventory-item'

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
    padding-right: 18px;
  }

  .size-in-use {
    font-size: 1.5rem;
    padding-right: 8px;
  }

  .max-size {
    color: var(--sub-font-color);
  }

  .inventory-container {
    display: flex;
    margin-top: 24px;
    gap: 18px;
    overflow-x: hidden;
  }

  .inventory-items {
    flex: 3;
  }

  .inventory-items h3 {
    font-size: 1.5rem;
    padding-bottom: 8px;
  }

  .item-info-container {
    flex: 1;
  }

  .item-info-container .select-item-message {
    color: var(--sub-font-color);
    text-align: center;
    border-radius: 4px;
    padding: 50px 0;
  }

  [inventory] {
    margin-bottom: 24px;
  }

  [inventory], [items-list] {
    display: grid;
    background-color: var(--bright-black);
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 10px;
    padding: 10px;
    border-radius: 4px;
    align-content: flex-start;
    height: 220px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  [inventory] .item-container,
  [items-list] .item-container {
    flex: 1;
  }

  .inventory-empty-message {
    grid-column: span 5;
    text-align: center;
    padding-top: 30px;
    color: var(--sub-font-color);
    font-size: 1.1rem;
  }

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
    font-size: 1.1rem;
    font-weight: bold;
    background-color: transparent;
    padding: 6px;
    border: 0;
    color: var(--font-color);
    cursor: pointer;
  }

  .quantity-controls {
    display: flex;
    min-width: 100px;
    justify-content: space-between;
    align-items: center;
  }
`

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  const inventoryItems: InventoryItem[] = []
  let availableItems: Item[] = []
  let sizeInUse = 0
  let lastSelectedItemId = ''

  function onFocusInventoryItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    const item = inventoryItems.find(item => item.id === itemId)

    if (!item) return

    lastSelectedItemId = item.id
    parent.select('[quantity]')!.textContent = item.quantity.toString()
    parent.select('[item-info]')?.replaceChildren(itemDetails(item))
  }

  function updateInventoryAndItemQuantity(item: InventoryItem) {
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()

    const elementQuery = `[inventory] [key-id="${lastSelectedItemId}"] [item-quantity]`
    parent.select(elementQuery)!.textContent = item.quantity.toString()
    parent.select('[quantity]')!.textContent = item.quantity.toString()
  }

  function addToInventory(itemId: string | null) {
    const itemIndex = availableItems.findIndex(item => item.id === itemId)

    if (itemIndex === -1) return

    const item = {
      ...availableItems[itemIndex],
      quantity: 1
    }
    sizeInUse += item.weight
    
    inventoryItems.push(item)
    availableItems.slice(itemIndex, 1)

    parent.select('.size-in-use')!.textContent = sizeInUse.toString()
    parent.select('.inventory-empty-message')?.remove()
    parent.select('[inventory]')?.append(html`
      <li
        tabindex="0"
        key-id="${item.id}"
        on-focus=${onFocusInventoryItem}
        class="item-container ${item.rarity.toLowerCase()}"
      >
        <span class="name" title="${item.name}">
          <img src="${itemIconByType(item.type)}" />
          ${item.name}
        </span>
        <span item-quantity>${item.quantity}</span>
      </li>
    `)
  }

  function onClickItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    addToInventory(itemId)
    target.remove()
  }

  function incrementQuantity() {
    const item = inventoryItems.find(
      item => item.id === lastSelectedItemId
    )

    if (!item) return

    sizeInUse += item.weight
    item.quantity += 1
    updateInventoryAndItemQuantity(item)
  }

  function decrementQuantity() {
    const item = inventoryItems.find(
      item => item.id === lastSelectedItemId
    )

    if (!item) return

    sizeInUse -= item.weight
    item.quantity -= 1
    updateInventoryAndItemQuantity(item)
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

    <div class="inventory-container">
      <div class="inventory-items">
        <h3>Your Inventory</h3>
        <ul inventory>
          <p class="inventory-empty-message">
            Your inventory is empty
          </p>
        </ul>

        <h3>Items List</h3>
        <ul items-list></ul>
      </div>
      
      <div class="item-info-container">
        <p class="inventory-size">
          <span class="inventory-size-message">Inventory size</span>
          <span class="size-in-use">0</span>
          <span class="max-size">/ 200</span>
        </p>
        
        <div>
          <div class="quantity-control-container">
            <span>Quantity</span>
            <div class="quantity-controls">
              <button type="button" on-click=${decrementQuantity}>
                &minus;
              </button>
              <span quantity>0</span>
              <button type="button" on-click=${incrementQuantity}>
                &plus;
              </button>
            </div>
          </div>

          <div item-info>
            <p class="select-item-message">
              Select an item to show its details
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}
