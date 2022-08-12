import { AnyKindOfInventoryItem, InventoryAlchemicalItem, InventoryShieldOrArmor, InventoryWeapon } from '@/ui/protocols'
import { itemIconByType } from '@/ui/view/components'
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

  .item-details.common .rarity {
    --color: var(--bright-common);
  }

  .item-details.uncommon .rarity {
    --color: var(--bright-uncommon);
  }

  .item-details p:not(.description) {
    padding-bottom: 16px;
  }

  .item-details .properties {
    display: flex;
    flex-wrap: wrap;
  }

  .item-details .properties > p {
    min-width: 50%;
  }

  .item-details .property-name {
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

const itemProperty = (name: string, value: any) => raw`
  <p>
    <span class="property-name">${name}</span>
    <span>${value}</span>
  </p>
`

function weaponDetails(props: InventoryWeapon) {
  const {
    damage,
    initiativeModifier,
    distance,
    weight,
    price,
    properties
  } = props

  const damageList = Object
    .entries(damage)
    .map(([field, value]) => raw`<span>${value} (${field})</span>`)

  return html`
    ${itemProperty('Damage', damageList)}
    ${itemProperty(
      'Properties',
      properties.length
        ? properties.join(', ').toLowerCase()
        : '-'
    )}
    
    <div class="properties">
      ${itemProperty('Initiative Modifier', initiativeModifier || '0')}
      ${Boolean(distance) && itemProperty('Distance', `${distance} meters`)}
      ${[
        itemProperty('Weight', weight),
        itemProperty('Price', price)
      ]}
    </div>
  `
}

function shieldOrArmorDetails(props: InventoryShieldOrArmor) {
  const {
    damageReduction,
    initiativeModifier,
    weight,
    price,
    properties
  } = props

  const damageList = Object
    .entries(damageReduction)
    .map(([field, value]) => raw`<span>${value} (${field})</span>`)

  return html`
    ${itemProperty('Damage Reduction', damageList)}
    ${itemProperty(
      'Properties',
      properties.length
        ? properties.join(', ').toLowerCase()
        : '-'
    )}
    
    <div class="properties">
      ${[
        itemProperty('Initiative Modifier', initiativeModifier || '0'),
        itemProperty('Weight', weight),
        itemProperty('Price', price)
      ]}
    </div>
  `
}

function alchemicalItemDetails(props: InventoryAlchemicalItem) {
  const { brewTime, brewPrice, weight, price, effects } = props
  
  return html`
    <div class="properties">
      ${[
        itemProperty('Brew Time', brewTime),
        itemProperty('Brew Price', brewPrice),
        itemProperty('Weight', weight),
        itemProperty('Price', price)
      ]}
    </div>

    ${itemProperty('Effects', effects)}
  `
}

function detailsByItemTypes(item: ItemDetailsProps) {
  if (item.type === 'WEAPON') {
    return weaponDetails(item as InventoryWeapon)
  }

  if (['POTION', 'OIL', 'OINTMENT'].includes(item.type)) {
    return alchemicalItemDetails(item as InventoryAlchemicalItem)
  }

  if (['SHIELD', 'ARMOR'].includes(item.type)) {
    return shieldOrArmorDetails(item as InventoryShieldOrArmor)
  }

  return html`
    <div class="properties">
      ${[
        itemProperty('Weight', item.weight),
        itemProperty('Price', item.price)
      ]}
    </div>
  `
}

export function itemDetails(props: ItemDetailsProps) {
  const { name, description } = props
  const rarity = props.rarity.toLowerCase()

  return html`
    <div class="item-details ${rarity}">
      <header class="item-title">
        <h3>${name}</h3>
        <img alt="Item Icon" src="${itemIconByType(props)}" />
      </header>
      
      <p class="rarity">${rarity}</p>
      
      ${detailsByItemTypes(props)}

      <p class="description">
        <span class="property-name">Description</span>
        <span>${description}</span>
      </p>
    </div>
  `
}
