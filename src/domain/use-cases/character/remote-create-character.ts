import { CreateCharacterService } from '@/domain/protocols/services/index.js'
import { CreateCharacter, CreateCharacterParams, CreateCharacterResult } from '@/domain/protocols/use-cases/index.js'

export class RemoteCreateCharacter implements CreateCharacter {
  constructor(private readonly createCharacterService: CreateCharacterService) {}
  
  async create(params: CreateCharacterParams): Promise<CreateCharacterResult> {
    const characterData = {
      name: params.name,
      level: params.level,
      gold: params.gold,
      icon: params.icon,
      alignment: params.alignment,
      ...params.description && { description: params.description },
      characterPoints: params.characterPoints,
      strength: params.strength,
      dexterity: params.dexterity,
      constitution: params.constitution,
      intelligence: params.intelligence,
      wisdom: params.wisdom,
      charisma: params.charisma,
      equipment: params.equipment,
      inventoryItems: params.inventoryItems
    }

    const creationResult = await this.createCharacterService.create(characterData)

    return {
      ...creationResult,
      ...characterData
    }
  }
}
