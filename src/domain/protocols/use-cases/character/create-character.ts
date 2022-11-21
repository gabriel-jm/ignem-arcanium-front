export interface CreateCharacterParams {
  name: string
  icon: string
  level: number
  gold: number
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charism: number
  equipment: Partial<{
    rightHand: string
    leftHand: string
    armor: string
    accessory1: string
    accessory2: string
  }>
}

export type CreateCharacterResult = CreateCharacterParams & { id: string }

export interface CreateCharacter {
  create(params: CreateCharacterParams): Promise<CreateCharacterResult>
}
