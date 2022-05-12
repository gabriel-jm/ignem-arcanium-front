export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export interface CreateAccountResult {
  name: string
}

export interface CreateAccount {
  create(params: CreateAccountParams): Promise<CreateAccountResult>
}
