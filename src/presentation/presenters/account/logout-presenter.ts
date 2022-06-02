import { AccountLogout } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter, Router } from '@/presentation/protocols'
import { SetAccountStore } from '@/ui/protocols/stores'

export class LogoutPresenter implements Presenter {
  constructor(
    private readonly accountLogout: AccountLogout,
    private readonly setAccountStore: SetAccountStore,
    private readonly router: Router
  ) {}

  async handle() {
    await this.accountLogout.logout()

    this.setAccountStore.account = null

    this.router.navigate('/login')

    return successResponse(null)
  }
}
