import '../../singles/wrapper'
import { html, raw } from 'lithen-tag-functions'
import {
  AnyKindOfInventoryItem,
  InventoryAlchemicalItem,
  InventoryShieldOrArmor,
  InventoryWeapon
} from '@/ui/protocols'
import { itemIconByType } from '../item-icon-by-type'
import { itemCardStyles } from './item-card-styles'
import { weaponDetails } from './weapon-details'
import { shieldOrArmorDetails } from './shield-or-armor-details'
import { alchemicalItemDetails } from './alchemical-item-details'

export type ItemDetailsProps = AnyKindOfInventoryItem

export const itemProperty = (name: string, value: any) => raw`
  <p>
    <span class="property-name">${name}</span>
    <span>${value}</span>
  </p>
`

export function itemCard(props: ItemDetailsProps) {
  const { name, description } = props
  const rarity = props.rarity.toLowerCase()

  return html`
    <ignem-wrapper class="item-card" css="${itemCardStyles}">
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
  if (item.type === 'WEAPON') {
    return weaponDetails(item as InventoryWeapon)
  }

  if (['SHIELD', 'ARMOR'].includes(item.type)) {
    return shieldOrArmorDetails(item as InventoryShieldOrArmor)
  }

  if (['POTION', 'OIL', 'OINTMENT'].includes(item.type)) {
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
