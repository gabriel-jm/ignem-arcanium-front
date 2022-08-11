import { Item } from '@/ui/protocols'
import { itemIconByType } from '@/ui/view/components/item/item-tiny-card'
import { css, html } from 'lithen-tag-functions'

export interface ItemDetailsProps extends Item {}

export const itemDetailsStyles = css`
  .item-details {
    padding: 12px;
    border-radius: 4px;
    background-color: var(--black);
    animation: show 120ms backwards ease-in-out;
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

  @keyframes show {
    from {
      opacity: 0;
      transform: translateX(15px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

export function itemDetails(props: ItemDetailsProps) {
  const { name, type, weight, price, description } = props
  const rarity = props.rarity.toLowerCase()

  return html`
    <div class="item-details ${rarity}">
      <header class="item-title">
        <h3>${name}</h3>
        <img alt="Item Icon" src="${itemIconByType(type)}" />
      </header>
      <p class="rarity">
        ${rarity}
      </p>
      <p class="property">
        <span>Weight</span>
        <span>${weight}</span>
      </p>
      <p class="property">
        <span>Price</span>
        <span>${price}</span>
      </p>
      <p class="property description">
        <span>Description</span>
        <span>${description}</span>
      </p>
    </div>
  `
}
