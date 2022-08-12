import { Item } from '@/domain/protocols/use-cases'
import { itemIconByType } from './item-icon-by-type'
import { css, html } from 'lithen-tag-functions'

export interface ItemTinyCardProps extends Item {
  onClick: Function
}

export const itemTinyCardStyles = css`
  .item-container {
    min-width: 210px;
    min-height: 56px;
    max-height: 56px;
    background-color: var(--black);
    padding: 6px 8px;
    border-radius: 4px;
    display: flex;
    gap: 6px;
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
    width: 34px;
    filter: invert(0.8);
  }

  .item-container.common {
    background-image: linear-gradient(
      145deg,
      var(--dark-common),
      var(--black) 35%
    );
  }

  .item-container.uncommon {
    background-image: linear-gradient(
      145deg,
      var(--dark-uncommon),
      var(--black) 35%
    );
  }

  .item-container .name {
    max-height: 52px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
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
      title="${name}"
      tabindex="0"
      key-id="${id}"
      class="item-container ${rarity.toLowerCase()}"
      on-click=${onClick}
    >
      <span class="name">
        <img src="${itemIconByType(props)}" />
        ${name}
      </span>
      <span class="weight">
        Weight <br /> ${weight}
      </span>
    </li>
  `
}
