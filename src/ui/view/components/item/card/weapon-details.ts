import { InventoryWeapon } from '@/ui/protocols'
import { itemProperty } from './item-card'
import { html, raw } from 'lithen-tag-functions'

export function weaponDetails(props: InventoryWeapon) {
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
