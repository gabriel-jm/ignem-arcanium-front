import { Item, ShieldOrArmor, Weapon } from '@/item/types/items.js'

export type FindAllCharactersServiceResult = {
  id: string
  name: string
  icon: string
  level: number
  gold: number
  characterPoints: number
  alignment: string
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  equipment: Record<string, Item> & {
    rightHand?: Weapon & { weaponId: string }
    armor?: ShieldOrArmor & { shieldId: string, armorId: string }
  }
  inventory: {
    id: string
    size: number
    spaceInUse: number
    items: Item[]
  }
}

export interface FindAllCharactersService {
  findAll(): Promise<FindAllCharactersServiceResult[]>
}
