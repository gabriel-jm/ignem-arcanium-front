import { CacheStore } from '@/domain/protocols/cache'
import { AccountLogout } from '@/domain/protocols/use-cases'

export class LocalAccountLogout implements AccountLogout {
  constructor(private readonly cacheStore: CacheStore) {}

  logout(): Promise<void> {
    this.cacheStore.remove('token')

    return Promise.resolve()
  }
}
