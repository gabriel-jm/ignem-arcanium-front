import { AccountLogin } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetAccountStore } from '@/ui/protocols/stores'

interface LoginPresenterParams {
  email: string
  password: string
}

export class LoginPresenter implements Presenter {
  constructor(
    private readonly accountLogin: AccountLogin,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle(data: LoginPresenterParams) {
    const accountData = await this.accountLogin.login({
      email: data.email,
      password: data.password
    })

    this.setAccountStore.account = {
      name: accountData.name
    }

    return successResponse(null)
  }
}
