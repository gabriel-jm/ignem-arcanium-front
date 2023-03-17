import { CacheStore } from '@/common/infra/protocols/index.js'
import { CheckTokenExists } from '@/domain/protocols/use-cases/index.js'

export class LocalCheckTokenExists implements CheckTokenExists {
  constructor(private readonly cacheStore: CacheStore) {}
  
  check(): boolean {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    return Boolean(tokenData?.token)
  }
}
