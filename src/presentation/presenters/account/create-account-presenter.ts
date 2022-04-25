import { CreateAccount } from '@/domain/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'

export interface CreateAccountPresenterParams {
  name: string
  email: string
  password: string
}

export class CreateAccountPresenter implements Presenter {
  constructor(private readonly createAccount: CreateAccount) {}
  
  async handle<T = any>(data: CreateAccountPresenterParams): Promise<PresenterResult<T>> {
    const accountId = await this.createAccount.create({
      name: data.name,
      email: data.email,
      password: data.password
    })

    return successResponse(accountId)
  }
}
