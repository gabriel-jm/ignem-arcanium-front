import { CacheStore } from '@/domain/protocols/cache'

export class LocalStorageCacheStore implements CacheStore {
  save(key: string, data: Record<string, unknown>): void {
    const jsonData = JSON.stringify(data)

    localStorage.setItem(`@ignem-arcanium:${key}`, jsonData)
  }
}
