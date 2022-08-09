import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { css, html } from 'lithen-tag-functions'
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
    padding-right: 30px;
  }

  .size-in-use {
    font-size: 1.5rem;
    padding-right: 8px;
  }

  .max-size {
    color: var(--sub-font-color);
  }

  [inventory] {
    padding: 20px 0;
  }

  .inventory-empty-message {
    text-align: center;
    color: var(--sub-font-color);
  }

  [items-list] {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px 0;
  }

  .item-container {
    max-width: 210px;
    min-width: 210px;
    min-height: 56px;
    background-color: var(--black);
    padding: 8px 10px;
    border-radius: 4px;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .item-container:focus {
    outline: 2px solid var(--outline-white);
  }

  .item-container img {
    width: 30px;
    filter: invert(0.8);
  }

  .item-container.common {
    background-image: linear-gradient(
      145deg,
      #3a3a3a,
      var(--black) 35%
    );
  }

  .item-container.uncommon {
    background-image: linear-gradient(
      145deg,
      #2a3a2a,
      var(--black) 35%
    );
  }

  .item-container .name {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    gap: 8px;
  }

  .item-container .weight {
    color: var(--sub-font-color);
    font-size: 0.7rem;
    text-align: center;
    line-height: 1.6;
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
  
  parent.once('init', () => {
    const itemStore = new ItemsStore()

    parent.select('[items-list]')?.append(
      ...itemStore.items.map(item => html`
        <li
          tabindex="0"
          key-id="${item.id}"
          class="item-container ${item.rarity.toLowerCase()}"
        >
          <span class="name" title="${item.name}">
            <img src="${iconByType[item.type] ?? '/potion.png'}" />
            ${item.name}
          </span>
          <span class="weight">
            Weight <br /> ${item.weight}
          </span>
        </li>
      `)
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
