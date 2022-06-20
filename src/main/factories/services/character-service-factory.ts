import { CharacterService } from '@/infra/services'
import { makeFetchHTTPClient } from '@/main/factories/clients'

export function makeCharacterService() {
  const httpClient = makeFetchHTTPClient()
  return new CharacterService(httpClient)
}