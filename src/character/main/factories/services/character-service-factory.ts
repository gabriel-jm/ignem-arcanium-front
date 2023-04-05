import { CharacterService } from '@/character/infra/character-service.js'
import { makeFetchHTTPClient } from '@/common/main/factories/clients/index.js'

export function makeCharacterService() {
  return new CharacterService(makeFetchHTTPClient())
}