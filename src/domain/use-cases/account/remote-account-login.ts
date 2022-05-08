import { CacheStore } from '@/domain/protocols/cache'
import { AccountLoginService } from '@/domain/protocols/services'
import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/protocols/use-cases'

export class RemoteAccountLogin implements AccountLogin {
  constructor(
    private readonly accountLoginService: AccountLoginService,
    private readonly cacheStore: CacheStore
  ) {}

  async login(params: AccountLoginParams): Promise<AccountLoginResult> {
    const accessCredentials = await this.accountLoginService.login({
      email: params.email,
      password: params.password
    })

    this.cacheStore.save('token', { token: accessCredentials.token })

    return { name: accessCredentials.name }
  }
}
