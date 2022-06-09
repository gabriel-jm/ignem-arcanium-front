import { FetchHTTPClient } from '@/infra/clients'
import { CharacterService } from '@/infra/services'
import { LocalStorageCacheStore } from '@/infra/stores'

export function makeCharacterService() {
  const httpClient = new FetchHTTPClient(import.meta.env.VITE_SERVER_URL)
  const localStorageCacheStore = new LocalStorageCacheStore()
  return new CharacterService(localStorageCacheStore, httpClient)
}