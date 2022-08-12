import { AnyKindOfItem } from '@/domain/protocols/use-cases'
import { InventoryWeapon } from '@/ui/protocols'

export function itemIconByType(item: AnyKindOfItem) {
  const distance = (item as InventoryWeapon).distance
  const { type } = item

  if (distance > 0 && type === 'WEAPON') return '/bow-and-arrow.png'

  const iconByType: Record<string, string> = {
    CONSUMABLE: '/bag.png',
    WEAPON: '/sword.png',
    SHIELD: '/shield.png',
    ARMOR: '/armor.png',
    POTION: '/potion.png',
    OIL: '/oil.png',
    OINTMENT: '/ointment.png'
  }

  return iconByType[type] ?? '/bag.png'
}
