import { html, el } from 'lithen-fns'
import {
  InventoryAlchemicalItem,
  InventoryShieldOrArmor,
  InventoryWeapon
} from '@/ui/protocols/index.js'
import { itemIconByType } from '../item-icon-by-type.js'
import { itemCardStyles } from './item-card-styles.js'
import { weaponDetails } from './weapon-details.js'
import { shieldOrArmorDetails } from './shield-or-armor-details.js'
import { alchemicalItemDetails } from './alchemical-item-details.js'
import { AnyKindOfItem } from '@/item/types/items.js'

export type ItemDetailsProps = AnyKindOfItem

export const itemProperty = (name: string, value: any) => el/*html*/`
  <p>
    <span class="property-name">${name}</span>
    <span>${value}</span>
  </p>
`

export function itemCard(props: ItemDetailsProps) {
  const { name, description } = props
  const rarity = props.rarity.toLowerCase()

  return html`
    <ignem-wrapper
      class="item-card"
      key-id="${props.id}"
      css="${itemCardStyles}"
    >
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
    </ignem-wrapper>
  `
}

function detailsByItemTypes(item: ItemDetailsProps) {
  if (item.type === 'weapon') {
    return weaponDetails(item as InventoryWeapon)
  }

  if (['shield', 'armor'].includes(item.type)) {
    return shieldOrArmorDetails(item as InventoryShieldOrArmor)
  }

  if (item.type === 'alchemicalItem') {
    return alchemicalItemDetails(item as InventoryAlchemicalItem)
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
