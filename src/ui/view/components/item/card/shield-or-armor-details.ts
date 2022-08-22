import { InventoryShieldOrArmor } from '@/ui/protocols'
import { itemProperty } from './item-card'
import { html } from 'lithen-tag-functions'
import { damageFormater } from '@/ui/view/components/singles'

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
    .map(([type, damage]) => damageFormater({ type, damage }))

  return html`
    <p>
      <span class="property-name">Damage Reduction</span>
      ${damageList}
    </p>
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
