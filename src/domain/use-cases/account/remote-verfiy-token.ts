import { InvalidTokenError } from '@/domain/error'
import { CacheStore } from '@/domain/protocols/cache'
import { VerifyTokenService } from '@/domain/protocols/services'
import { VerifyToken } from '@/domain/protocols/use-cases'

export class RemoteVerifyToken implements VerifyToken {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly verifyTokenService: VerifyTokenService
  ) {}
  
  async verify(): Promise<void> {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    if (!tokenData) {
      throw new InvalidTokenError()
    }

    await this.verifyTokenService.verify(tokenData.token)
  }
}
