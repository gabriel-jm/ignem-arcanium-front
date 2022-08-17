import { css, html } from 'lithen-tag-functions'
import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { itemCard, itemTinyCard } from '@/ui/view/components/item'
import { ItemsStore } from '@/ui/stores'
import { InventoryItem } from '@/ui/protocols'
import { Item } from '@/domain/protocols/use-cases'
import { IgnemQuantityControlElement } from '@/ui/view/components'

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
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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

  .hide {
    display: none;
  }

  @media screen and (max-width: 750px) {
    .inventory-items {
      flex: 1;
    }
  }

  @media screen and (max-width: 425px) {
    .inventory-container {
      display: block;
    }
    
    .inventory-items {
      padding-bottom: 50px;
    }

    .item-info-container {
      width: 100%;
      position: fixed;
      left: 0;
      top: 90%;
      background-color: var(--black);
      padding: 6px;
      border-radius: 8px;
      box-shadow: 0 0 3px 2px #1117;
    }

    .inventory-size {
      text-align: center;
    }

    .item-info {
      background-color: var(--body-bg-color);
      padding: 4px 8px;
    }
  }
`

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  let inventoryItems: InventoryItem[] = []
  let availableItems: Item[] = []
  let sizeInUse = 0
  let lastSelectedItemId = ''

  function onFocusInventoryItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    const item = inventoryItems.find(item => item.id === itemId)

    if (!item) return

    lastSelectedItemId = item.id
    parent.select('[item-info]')?.replaceChildren(itemCard(item))
  }

  function incrementQuantity() {
    const item = inventoryItems.find(
      item => item.id === lastSelectedItemId
    )

    if (!item) return

    sizeInUse += item.weight
    item.quantity += 1
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()
  }

  function decrementQuantity() {
    const item = inventoryItems.find(
      item => item.id === lastSelectedItemId
    )

    if (!item) return

    sizeInUse -= item.weight
    item.quantity -= 1
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()

    if (item.quantity < 1) {
      parent.select(`[inventory] [key-id="${item.id}"]`)?.remove()
      parent.select('[item-info]')?.replaceChildren(html`
        <p class="select-item-message">
          Select an item to show its details
        </p>
      `)

      inventoryItems = inventoryItems.filter(invItem => invItem.id !== item.id)
      lastSelectedItemId = ''
      return
    }
  }

  function findItem(itemId: string | null) {
    const itemInInventory = inventoryItems.find(item => item.id === itemId)

    if (itemInInventory) {
      parent
        .select<any>(`[inventory] [key-id="${itemId}"]`)!
        .incrementQuantity()      
    } else {
      const itemIndex = availableItems.findIndex(item => item.id === itemId)

      const item = {
        ...availableItems[itemIndex],
        quantity: 1
      }
      sizeInUse += item.weight

      const itemCard = itemTinyCard({
        ...item,
        onFocus: onFocusInventoryItem,
        onIncrement: incrementQuantity,
        onDecrement: decrementQuantity
      })
  
      parent.select('[inventory]')?.append(itemCard)

      inventoryItems.push(item)
    }
  }

  function addToInventory(itemId: string | null) {
    const itemExists = availableItems.some(item => item.id === itemId)

    if (!itemExists) return

    lastSelectedItemId = String(itemId)
    findItem(itemId)
    
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()
    parent.select('.inventory-empty-message')?.classList.add('hide')
  }

  function onClickItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    addToInventory(itemId)
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
        
        <div class="item-info">
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
