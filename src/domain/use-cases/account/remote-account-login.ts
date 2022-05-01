import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/protocols/use-cases'

export class RemoteAccountLogin implements AccountLogin {
  login(params: AccountLoginParams): Promise<AccountLoginResult> {
    throw new Error('Method not implemented.')
  }
}
