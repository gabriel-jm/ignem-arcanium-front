import { AccountLoginService } from '@/domain/protocols/services'
import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/protocols/use-cases'

export class RemoteAccountLogin implements AccountLogin {
  constructor(private readonly accountLoginService: AccountLoginService) {}

  async login(params: AccountLoginParams): Promise<AccountLoginResult> {
    const accessCredentials = await this.accountLoginService.login({
      email: params.email,
      password: params.password
    })

    return { name: accessCredentials.name }
  }
}
