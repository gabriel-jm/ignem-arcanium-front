export interface CacheStore {
  get<T = unknown>(key: string): T
  save(key: string, data: Record<string, unknown>): void
}
