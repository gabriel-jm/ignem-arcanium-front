export interface CreateCharacterParams {
  name: string
  icon: string
  level: number
  gold: number
  alignment: string
  description?: string
  characterPoints: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  equipment: Partial<{
    rightHand: string
    leftHand: string
    armor: string
    accessory1: string
    accessory2: string
  }>
  inventoryItems?: Array<{
    itemId: string
    quantity: number
  }>
}

export type CreateCharacterResult = CreateCharacterParams & { id: string }

export interface CreateCharacter {
  create(params: CreateCharacterParams): Promise<CreateCharacterResult>
}
