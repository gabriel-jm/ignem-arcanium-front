export interface CacheStore {
  save(key: string, data: Record<string, unknown>): void
}
