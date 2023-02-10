import { LocalStorageCacheStore } from '@/common/infra/stores'
import { FetchHTTPClient } from '@/common/infra/clients'

export function makeFetchHTTPClient() {
  const localStorageCacheStore = new LocalStorageCacheStore()

  const httpClient = new FetchHTTPClient(
    import.meta.env.VITE_SERVER_URL,
    localStorageCacheStore
  )

  return httpClient
}
