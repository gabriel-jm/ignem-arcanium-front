import '../../singles/wrapper'
import {
  AnyKindOfInventoryItem,
  InventoryAlchemicalItem,
  InventoryShieldOrArmor,
  InventoryWeapon
} from '@/ui/protocols'
import { itemIconByType } from '../item-icon-by-type'
import { itemCardStyles } from './item-card-styles'
import { html, raw } from 'lithen-tag-functions'

export type ItemDetailsProps = AnyKindOfInventoryItem

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
