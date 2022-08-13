import { InventoryShieldOrArmor } from '@/ui/protocols'
import { itemProperty } from './item-card'
import { html, raw } from 'lithen-tag-functions'

export function shieldOrArmorDetails(props: InventoryShieldOrArmor) {
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
