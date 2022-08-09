import { Item } from '@/ui/protocols'
import { css, html } from 'lithen-tag-functions'

export interface ItemTinyCardProps extends Item {
  onClick: Function
}

const iconByType: Record<string, string> = {
  CONSUMABLE: '/bag.png',
  WEAPON: '/sword.png',
  SHIELD: '/shield.png',
  ARMOR: '/armor.png',
  POTION: '/potion.png'
}

export const itemTinyCardStyles = css`
  .item-container {
    max-width: 208px;
    min-width: 208px;
    min-height: 56px;
    max-height: 56px;
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

  .item-container * {
    pointer-events: none;
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

export function itemTinyCard(props: ItemTinyCardProps) {
  const { id, rarity, name, type, weight, onClick } = props

  return html`
    <li
      tabindex="0"
      key-id="${id}"
      class="item-container ${rarity.toLowerCase()}"
      on-click=${onClick}
    >
      <span class="name" title="${name}">
        <img src="${iconByType[type] ?? '/potion.png'}" />
        ${name}
      </span>
      <span class="weight">
        Weight <br /> ${weight}
      </span>
    </li>
  `
}
