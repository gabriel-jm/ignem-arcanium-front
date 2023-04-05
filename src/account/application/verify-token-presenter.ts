import { router } from '@/main/config/routes.js'
import { CacheStore } from '@/common/infra/protocols/index.js'
import { InvalidTokenError } from '@/account/application/error/index.js'
import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { TokenDecoder } from './protocols/token-decoder.js'
import { SetAccountStore } from './protocols/set-account-store.js'

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
      router.navigate('/login')

      throw error
    }
  }
}
