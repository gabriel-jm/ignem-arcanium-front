export interface AccountLoginServiceParams {
  email: string
  password: string
}

export interface AccountLoginServiceResult {
  name: string
  token: string
}

export interface AccountLoginService {
  login(params: AccountLoginServiceParams): Promise<AccountLoginServiceResult>
}
