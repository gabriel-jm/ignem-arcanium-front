export interface CacheStore {
  load<T = unknown>(key: string): T
}
