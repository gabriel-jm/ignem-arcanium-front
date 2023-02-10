import { CacheStore } from '@/common/infra/protocols'
import { CreateAccountService } from '@/domain/protocols/services'
import { CreateAccount, CreateAccountParams, CreateAccountResult } from '@/domain/protocols/use-cases'

export class RemoteCreateAccount implements CreateAccount {
  constructor(
    private readonly createAccountService: CreateAccountService,
    private readonly cacheStore: CacheStore
  ) {}

  async create(params: CreateAccountParams): Promise<CreateAccountResult> {
    const creationResult = await this.createAccountService.create({
      name: params.name,
      email: params.email,
      password: params.password
    })

    this.cacheStore.save('token', { token: creationResult.token })

    return { name: creationResult.name }
  }
}
