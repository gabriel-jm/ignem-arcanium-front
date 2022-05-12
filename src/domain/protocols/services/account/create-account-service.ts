export interface CreateAccountServiceParams {
  name: string
  email: string
  password: string
}

export interface CreateAccountServiceResult {
  name: string
  token: string
}

export interface CreateAccountService {
  create(params: CreateAccountServiceParams): Promise<CreateAccountServiceResult>
}
