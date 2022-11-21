import { CreateCharacterService } from '@/domain/protocols/services'
import { CreateCharacter, CreateCharacterParams, CreateCharacterResult } from '@/domain/protocols/use-cases'

export class RemoteCreateCharacter implements CreateCharacter {
  constructor(private readonly createCharacterService: CreateCharacterService) {}
  
  async create(params: CreateCharacterParams): Promise<CreateCharacterResult> {
    const characterData = {
      name: params.name,
      level: params.level,
      gold: params.gold,
      hp: params.hp,
      mp: params.mp,
      icon: params.icon,
      strength: params.strength,
      dexterity: params.dexterity,
      constitution: params.constitution,
      intelligence: params.intelligence,
      wisdom: params.wisdom,
      charism: params.charism,
      equipment: params.equipment
    }
    
    const creationResult = await this.createCharacterService.create(characterData)

    return {
      ...creationResult,
      ...characterData
    }
  }
}
