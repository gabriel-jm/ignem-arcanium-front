import { InventoryWeapon } from '@/item/types/inventory-items.js'
import { AnyKindOfItem } from '@/item/types/items.js'

export function itemIconByType(item: AnyKindOfItem) {
  const distance = (item as InventoryWeapon).distance
  const { type } = item

  if (distance > 0 && type === 'weapon') return '/bow-and-arrow.png'

  const iconByType: Record<string, string> = {
    consumable: '/bag.png',
    weapon: '/sword.png',
    shield: '/shield.png',
    armor: '/armor.png',
    alchemicalItem: '/potion.png'
  }

  return iconByType[type] ?? '/bag.png'
}
