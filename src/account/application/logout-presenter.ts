import { CacheStore } from '@/common/infra/protocols/index.js'
import { successResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { SetAccountStore } from '@/presentation/protocols/stores/index.js'
import { router } from 'lithen-router'

export class LogoutPresenter implements Presenter {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly setAccountStore: SetAccountStore
  ) {}

  async handle() {
    this.cacheStore.remove('token')

    this.setAccountStore.account = null

    router.goTo('/login')

    return successResponse(null)
  }
}
