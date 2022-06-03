import { InvalidTokenError } from '@/domain/error'
import { CacheStore } from '@/domain/protocols/cache'
import { TokenDecoder } from '@/domain/protocols/cryptography'
import { VerifyTokenService } from '@/domain/protocols/services'
import { VerifyToken, VerifyTokenResult } from '@/domain/protocols/use-cases'

export class RemoteVerifyToken implements VerifyToken {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly verifyTokenService: VerifyTokenService,
    private readonly tokenDecoder: TokenDecoder
  ) {}
  
  async verify(): Promise<VerifyTokenResult> {
    const tokenData = this.cacheStore.get<Record<'token', string>>('token')

    if (!tokenData) {
      throw new InvalidTokenError()
    }

    await this.verifyTokenService.verify(tokenData.token)

    const accountData = this.tokenDecoder.decode<Record<'id'|'name', string>>(
      tokenData.token
    )

    if (!accountData) {
      throw new InvalidTokenError()
    }

    return accountData
  }
}
