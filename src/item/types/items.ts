export interface Item {
  id: string
  itemId?: string
  name: string
  type: string
  description: string
  rarity: string
  weight: number
  price: number
}

export interface Weapon extends Item {
  damage: Record<string, string>
  properties: string[]
  initiativeModifier: number
  distance: number
}

export interface ShieldOrArmor extends Item {
  damageReduction: Record<string, string>
  properties: string[]
  initiativeModifier: number
}

export interface AlchemicalItem extends Item {
  brewPrice: number
  brewTime: number
  effects: string
}

export interface Gem extends Item {
  magicTier: number
}

export type AnyKindOfItem = Item | Weapon | ShieldOrArmor | AlchemicalItem | Gem
