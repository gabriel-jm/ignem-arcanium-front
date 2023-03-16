import { CacheStore } from '@/common/infra/protocols'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetAccountStore } from '@/presentation/protocols/stores'
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
