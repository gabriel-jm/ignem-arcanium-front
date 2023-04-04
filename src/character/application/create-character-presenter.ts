import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter, PresenterResult } from '@/common/application/protocols/index.js'
import { CreateCharacterService } from './protocols/create-character-service.js'

export interface CreateCharacterParams {
  name: string
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

export class CreateCharacterPresenter implements Presenter {
  constructor(private readonly createCharacterService: CreateCharacterService) {}
  
  async handle<T = any>(data: CreateCharacterParams): Promise<PresenterResult<T>> {
    const characterData = {
      name: data.name,
      level: data.level,
      gold: data.gold,
      icon: '/mage.svg',
      characterPoints: 0,
      alignment: data.alignment,
      ...data.description && { description: data.description },
      strength: data.strength,
      dexterity: data.dexterity,
      constitution: data.constitution,
      intelligence: data.intelligence,
      wisdom: data.wisdom,
      charisma: data.charisma,
      equipment: data.equipment,
      inventoryItems: data.inventoryItems
    }

    const creationResult = await this.createCharacterService.create(characterData)

    return successResponse({
      ...creationResult,
      ...characterData
    })
  }
}
