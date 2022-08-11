import { AnyKindOfInventoryItem, InventoryAlchemicalItem } from '@/ui/protocols'
import { itemIconByType } from '@/ui/view/components/item/item-tiny-card'
import { css, html, raw } from 'lithen-tag-functions'

export type ItemDetailsProps = AnyKindOfInventoryItem

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

  .item-details .properties {
    display: flex;
    flex-wrap: wrap;
  }

  .item-details.common .rarity {
    --color: var(--bright-common);
  }

  .item-details.uncommon .rarity {
    --color: var(--bright-uncommon);
  }

  .item-details .property {
    min-width: 50%;
    padding-bottom: 16px;
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

const fieldsByItemType: Record<
  string,
  Record<'properties'|'descriptions', Function>
> = {
  'potion,oil,ointment': {
    properties: (item: InventoryAlchemicalItem) => raw`
      <p class="property">
        <span>Brew Time</span>
        <span>${item.brewTime}</span>
      </p>
      <p class="property">
        <span>Brew Price</span>
        <span>${item.brewPrice}</span>
      </p>
    `,
    descriptions: (item: InventoryAlchemicalItem) => raw`
      <p class="property">
        <span>Effects</span>
        <span>${item.effects}</span>
      </p>
    `
  },
}

export function itemDetails(props: ItemDetailsProps) {
  const { name, type, weight, price, description } = props
  const rarity = props.rarity.toLowerCase()

  const fieldAndFn = Object
    .entries(fieldsByItemType)
    .find(([field]) => field.split(',').includes(type.toLowerCase()))

  const additionalFields = fieldAndFn?.[1]

  return html`
    <div class="item-details ${rarity}">
      <header class="item-title">
        <h3>${name}</h3>
        <img alt="Item Icon" src="${itemIconByType(type)}" />
      </header>
      
      <p class="rarity">
        ${rarity}
      </p>
      
      <div class="properties">
        <p class="property">
          <span>Weight</span>
          <span>${weight}</span>
        </p>
        <p class="property">
          <span>Price</span>
          <span>${price}</span>
        </p>
        ${additionalFields?.properties(props)}
      </div>

      ${additionalFields?.descriptions(props)}

      <p class="property description">
        <span>Description</span>
        <span>${description}</span>
      </p>
    </div>
  `
}
