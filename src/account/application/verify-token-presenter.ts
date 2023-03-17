import { router } from 'lithen-router'
import { CacheStore } from '@/common/infra/protocols/index.js'
import { InvalidTokenError } from '@/domain/error/index.js'
import { successResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { SetAccountStore } from '@/presentation/protocols/stores/index.js'
import { TokenDecoder } from './token-decoder.js'

export class VerifyTokenPresenter implements Presenter {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly tokenDecoder: TokenDecoder,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle() {
    try {
      const tokenData = this.cacheStore.get<Record<'token', string>>('token')

      if (!tokenData) {
        throw new InvalidTokenError()
      }

      const accountData = this.tokenDecoder.decode<Record<'id'|'name', string>>(
        tokenData.token
      )

      if (!accountData) {
        throw new InvalidTokenError()
      }

      this.setAccountStore.account = {
        name: accountData.name
      }

      return successResponse(null)
    } catch(error) {
      router.goTo('/login')

      throw error
    }
  }
}
