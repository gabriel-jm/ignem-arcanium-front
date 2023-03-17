import { InventoryShieldOrArmor } from '@/ui/protocols/index.js'
import { itemProperty } from './item-card.js'
import { html, el } from 'lithen-fns'
import { damageFormater, propertiesFormater } from '@/item/ui/components/formaters/index.js'

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
      ${damageList.length ? damageList : '0'}
    </p>
    <p>
      <span class="property-name">Properties</span>
      ${properties.length
        ? propertiesFormater(properties)
        : el/*html*/`<span>-</span>`
      }
    </p>
    
    <div class="properties">
      ${[
        itemProperty('Initiative Modifier', initiativeModifier || '0'),
        itemProperty('Weight', weight),
        itemProperty('Price', price)
      ]}
    </div>
  `
}
