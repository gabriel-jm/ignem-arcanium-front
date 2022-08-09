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

  [items-list] {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    padding: 10px 0;
  }

  .item-container {
    max-width: 200px;
    min-width: 200px;
    background-color: var(--black);
    padding: 8px 10px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item-container img {
    width: 30px;
    filter: invert(0.8);
  }

  .item-container.common {
    background-image: linear-gradient(
      145deg,
      #2a2a2a,
      var(--black) 35%
    );
  }

  .item-container .name {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-container .rarity {
    color: var(--sub-font-color);
    font-size: 0.7rem;
    justify-item: flex-end;
  }
`

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  parent.once('init', () => {
    const itemStore = new ItemsStore()
    // const [item] = itemStore.items

    parent.select('[items-list]')?.append(
      ...itemStore.items.map(item => html`
        <li
          key-id="${item.id}"
          class="item-container ${item.rarity.toLowerCase()}"
        >
          <span class="name">
            <img src="/potion.png" /> ${item.name}
          </span>
          <span class="rarity">Weight ${(item as any).weight}</span>
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

    <ul items-list></ul>
  `
}
