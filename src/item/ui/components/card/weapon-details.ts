import { itemProperty } from './item-card.js'
import { html, el } from 'lithen-fns'
import { damageFormater, propertiesFormater } from '@/item/ui/components/formaters/index.js'
import { InventoryWeapon } from '@/item/types/inventory-items.js'

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
    <p>
      <span class="property-name">Properties</span>
      ${properties.length
        ? propertiesFormater(properties)
        : el/*html*/`<span>-</span>`
      }
    </p>
    
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
