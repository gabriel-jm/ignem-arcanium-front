import { Item, ShieldOrArmor, Weapon } from '@/domain/protocols/use-cases/item/list-all-default-items'

export interface FindAllCharactersResult {
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
  equipments: Record<string, Item> & {
    rightHand?: Omit<Weapon, 'id'> & { weaponId: string }
    armor?: Omit<ShieldOrArmor, 'id'> & { shieldId: string, armorId: string }
  }
}

export interface FindAllCharacters {
  findAll(): Promise<FindAllCharactersResult[]>
}
