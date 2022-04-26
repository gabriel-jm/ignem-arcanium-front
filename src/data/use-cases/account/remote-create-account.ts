import { CreateAccountService } from '@/data/protocols'
import { CreateAccount, CreateAccountParams, CreateAccountResult } from '@/domain/use-cases'

export class RemoteCreateAccount implements CreateAccount {
  constructor(private readonly createAccountService: CreateAccountService) {}

  async create(params: CreateAccountParams): Promise<CreateAccountResult> {
    const creationResult = await this.createAccountService.create({
      name: params.name,
      email: params.email,
      password: params.password
    })

    return { accountId: creationResult.accountId }
  }
}
