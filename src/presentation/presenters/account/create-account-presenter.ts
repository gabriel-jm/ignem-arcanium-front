import { CreateAccount } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'
import { SetAccountStore } from '@/ui/protocols/stores'

export interface CreateAccountPresenterParams {
  name: string
  email: string
  password: string
}

export class CreateAccountPresenter implements Presenter {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle<T = any>(data: CreateAccountPresenterParams): Promise<PresenterResult<T>> {
    const accountData = await this.createAccount.create({
      name: data.name,
      email: data.email,
      password: data.password
    })

    this.setAccountStore.account = {
      name: accountData.name
    }

    return successResponse(accountData)
  }
}
