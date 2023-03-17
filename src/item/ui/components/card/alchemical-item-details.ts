import { InventoryAlchemicalItem } from '@/ui/protocols/index.js'
import { itemProperty } from './item-card.js'
import { html } from 'lithen-fns'

export function alchemicalItemDetails(props: InventoryAlchemicalItem) {
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
