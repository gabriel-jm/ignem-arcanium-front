import { AlchemicalItem, Gem, ShieldOrArmor, Item, Weapon } from '@/item/types/items.js'

export interface InventoryItem extends Item {
  quantity: number
}

export interface InventoryWeapon extends Weapon {
  quantity: number
}

export interface InventoryShieldOrArmor extends ShieldOrArmor {
  quantity: number
}

export interface InventoryAlchemicalItem extends AlchemicalItem {
  quantity: number
}

export interface InventoryGem extends Gem {
  quantity: number
}

export type AnyKindOfInventoryItem = (
  | InventoryItem
  | InventoryWeapon
  | InventoryShieldOrArmor
  | InventoryAlchemicalItem
  | InventoryGem 
)
