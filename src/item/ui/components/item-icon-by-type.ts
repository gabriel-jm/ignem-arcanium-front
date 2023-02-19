import { AnyKindOfItem } from '@/domain/protocols/use-cases'
import { InventoryWeapon } from '@/ui/protocols'

export function itemIconByType(item: AnyKindOfItem) {
  const distance = (item as InventoryWeapon).distance
  const { type } = item

  if (distance > 0 && type === 'weapon') return '/bow-and-arrow.png'

  const iconByType: Record<string, string> = {
    consumable: '/bag.png',
    weapon: '/sword.png',
    shield: '/shield.png',
    armor: '/armor.png',
    alchemicalItem: '/potion.png',
    // OIL: '/oil.png',
    // OINTMENT: '/ointment.png'
  }

  return iconByType[type] ?? '/bag.png'
}
