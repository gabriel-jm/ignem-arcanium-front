import { CacheStore } from '@/common/infra/protocols/index.js'
import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { SetAccountStore } from '@/presentation/protocols/stores/index.js'
import { router } from '@/main/config/routes.js'

export class LogoutPresenter implements Presenter {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly setAccountStore: SetAccountStore
  ) {}

  async handle() {
    this.cacheStore.remove('token')

    this.setAccountStore.account = null

    router.navigate('/login')

    return successResponse(null)
  }
}
