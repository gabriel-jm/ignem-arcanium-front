import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { FetchHTTPClient } from '@/common/infra/clients/index.js'

export function makeFetchHTTPClient() {
  const localStorageCacheStore = new LocalStorageCacheStore()

  const httpClient = new FetchHTTPClient(
    import.meta.env.VITE_SERVER_URL,
    localStorageCacheStore
  )

  return httpClient
}
