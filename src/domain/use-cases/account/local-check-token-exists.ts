import { CacheStore } from '@/domain/protocols/cache'
import { CheckTokenExists } from '@/domain/protocols/use-cases'

export class LocalCheckTokenExists implements CheckTokenExists {
  constructor(private readonly cacheStore: CacheStore) {}
  
  check(): boolean {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    return Boolean(tokenData?.token)
  }
}
