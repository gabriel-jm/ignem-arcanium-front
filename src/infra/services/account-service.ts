import {
  AccountLoginService,
  AccountLoginServiceParams,
  AccountLoginServiceResult,
  CreateAccountService,
  CreateAccountServiceParams,
  CreateAccountServiceResult
} from '@/domain/protocols/services'
import { ServiceError } from '@/infra/errors'
import { HTTPClient } from '@/infra/protocols'

export class AccountService implements CreateAccountService, AccountLoginService {
  constructor(private readonly httpClient: HTTPClient) {}

  async login(params: AccountLoginServiceParams) {
    const response = await this.httpClient.request<AccountLoginServiceResult>({
      method: 'post',
      path: '/login',
      body: {
        email: params.email,
        password: params.password
      }
    })

    if (response.statusCode >= 400) {
      throw new ServiceError(
        response.body,
        'Error on login',
        true
      )
    }

    return response.body
  }
  
  async create(params: CreateAccountServiceParams): Promise<CreateAccountServiceResult> {
    const response = await this.httpClient.request<CreateAccountServiceResult>({
      method: 'post',
      path: '/accounts',
      body: {
        name: params.name,
        email: params.email,
        password: params.password
      }
    })

    if (response.statusCode >= 400) {
      throw new ServiceError(response.body, 'Internal error on creating an account')
    }

    return response.body
  }
}
