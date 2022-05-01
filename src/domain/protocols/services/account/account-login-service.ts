import { AccountLoginParams } from '@/domain/protocols/use-cases'

export type AccountLoginServiceParams = AccountLoginParams

export interface AccountLoginServiceResult {
  name: string
  token: string
}

export interface AccountLoginService {
  login(params: AccountLoginServiceParams): Promise<AccountLoginServiceResult>
}
