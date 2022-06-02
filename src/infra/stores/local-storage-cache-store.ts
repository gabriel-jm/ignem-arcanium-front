import { CacheStore } from '@/domain/protocols/cache'

export class LocalStorageCacheStore implements CacheStore {
  get(key: string) {
    const jsonData = localStorage.getItem(`@ignem-arcanium:${key}`)

    try {
      const data = JSON.parse(String(jsonData))

      return data
    } catch {
      return null
    }
  }
  
  save(key: string, data: Record<string, unknown>): void {
    const jsonData = JSON.stringify(data)

    localStorage.setItem(`@ignem-arcanium:${key}`, jsonData)
  }

  remove(key: string): void {
    localStorage.removeItem(`@ignem-arcanium:${key}`)
  }
}
