import { FetchHTTPClient } from '@/infra/clients'
import { LocalStorageCacheStore } from '@/infra/stores'

export function makeFetchHTTPClient() {
  const localStorageCacheStore = new LocalStorageCacheStore()

  const httpClient = new FetchHTTPClient(
    import.meta.env.VITE_SERVER_URL,
    localStorageCacheStore
  )

  return httpClient
}
