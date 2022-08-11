import { css, html } from 'lithen-tag-functions'
import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { itemIconByType, itemTinyCard } from '@/ui/view/components/item'
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
    gap: 20px;
  }

  .inventory-items {
    flex: 3;
  }

  .inventory-items h3 {
    font-size: 1.5rem;
    padding-bottom: 8px;
  }

  .item-info {
    flex: 1;
  }

  .item-info > p {
    color: var(--sub-font-color);
    text-align: center;
    border-radius: 4px;
    padding: 50px 0;
  }

  .inventory-empty-message {
    min-width: 100%;
    text-align: center;
    color: var(--sub-font-color);
  }

  [inventory] {
    margin-bottom: 24px;
  }

  [inventory], [items-list] {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(210px, calc(25% - 10px))
    );
    gap: 10px;
    padding: 20px 2px;
    height: 200px;
    overflow: auto;
  }

  [inventory] .item-container,
  [items-list] .item-container {
    flex: 1;
  }

  .item-details {
    padding: 12px;
    border-radius: 4px;
    background-color: var(--black);
  }

  .item-details.common {
    background-image: linear-gradient(
      145deg,
      var(--dark-common),
      var(--black) 30%
    );
  }

  .item-details.uncommon {
    background-image: linear-gradient(
      145deg,
      var(--dark-uncommon),
      var(--black) 30%
    );
  }

  .item-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .item-title img {
    width: 50px;
    filter: invert(0.8);
  }

  .item-title h3 {
    font-size: 1.5em;
  }

  .item-details .rarity {
    --color: var(--font-color);

    font-weight: bold;
    text-transform: capitalize;
    padding-top: 5px;
    padding-bottom: 10px;
    color: var(--color);
  }

  .item-details.common .rarity {
    --color: var(--bright-common);
  }

  .item-details.uncommon .rarity {
    --color: var(--bright-uncommon);
  }

  .item-details .property {
    padding-bottom: 8px;
  }

  .item-details .property span:first-of-type {
    display: block;
    font-size: 0.85rem;
    color: var(--sub-font-color);
  }

  .quantity-control-container {
    padding: 6px 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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
  const inventoryItems: Item[] = []
  let availableItems: Item[] = []
  let sizeInUse = 0

  function onClickInventoryItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    const item = inventoryItems.find(item => item.id === itemId)

    if (!item) return

    parent.select('.item-info')?.replaceChildren(html`
      <div class="quantity-control-container">
        <span>Quantity</span>
        <div class="quantity-controls">
          <button type="button">&minus;</button>
          <span>1</span>
          <button type="button">&plus;</button>
        </div>
      </div>
      <div class="item-details ${item.rarity.toLowerCase()}">
        <header class="item-title">
          <h3>${item.name}</h3>
          <img src="${itemIconByType(item.type)}" />
        </header>
        <p class="rarity">
          ${item.rarity.toLowerCase()}
        </p>
        <p class="property">
          <span>Weight</span>
          <span>${item.weight}</span>
        </p>
        <p class="property">
          <span>Price</span>
          <span>${item.price}</span>
        </p>
        <p class="property description">
          <span>Description</span>
          <span>${item.description}</span>
        </p>
      </div>
    `)
  }

  function addToInventory(itemId: string | null) {
    const itemIndex = availableItems.findIndex(item => item.id === itemId)

    if (itemIndex === -1) return

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
        on-click=${onClickInventoryItem}
        class="item-container ${item.rarity.toLowerCase()}"
      >
        <span class="name" title="${item.name}">
          <img src="${itemIconByType(item.type)}" />
          ${item.name}
        </span>
        <span>1</span>
      </li>
    `)
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

    <div class="inventory-container">
      <div class="inventory-items">
        <h3>Your Inventory</h3>
        <ul inventory>
          <p class="inventory-empty-message">Your inventory is empty</p>
        </ul>

        <h3>Items List</h3>
        <ul items-list></ul>
      </div>
      <div class="item-info">
        <p>Select an item to show its details</p>
      </div>
    </div>
  `
}
