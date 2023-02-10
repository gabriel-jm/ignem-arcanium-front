import { CacheStore } from '@/common/infra/protocols'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetAccountStore } from '@/presentation/protocols/stores'
import { AccountLoginService } from './protocols'

interface LoginPresenterParams {
  email: string
  password: string
}

export class LoginPresenter implements Presenter {
  constructor(
    private readonly accountLoginService: AccountLoginService,
    private readonly cacheStore: CacheStore,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle(data: LoginPresenterParams) {
    const accessCredentials = await this.accountLoginService.login({
      email: data.email,
      password: data.password
    })

    this.cacheStore.save('token', { token: accessCredentials.token })

    this.setAccountStore.account = {
      name: accessCredentials.name
    }

    return successResponse(null)
  }
}
