import { InventoryWeapon } from '@/ui/protocols'
import { itemProperty } from './item-card'
import { html } from 'lithen-tag-functions'
import { damageFormater } from '@/ui/view/components/singles'

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
    .map(([type, damage]) => damageFormater({ type, damage }))

  return html`
    <p>
      <span class="property-name">Damage</span>
      ${damageList}
    </p>
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
