import { CharacterService } from '@/infra/services/index.js'
import { makeFetchHTTPClient } from '@/main/factories/clients/index.js'

export function makeCharacterService() {
  const httpClient = makeFetchHTTPClient()
  return new CharacterService(httpClient)
}