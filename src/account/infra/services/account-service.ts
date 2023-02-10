import {
  AccountLoginService,
  AccountLoginServiceParams,
  AccountLoginServiceResult
} from '@/account/application/protocols'
import { HTTPClient } from '@/common/infra/protocols'
import {
  CreateAccountService,
  CreateAccountServiceParams,
  CreateAccountServiceResult
} from '@/domain/protocols/services'
import { HTTPServiceError } from '@/infra/errors'

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
      throw new HTTPServiceError(response, 'Error on login')
    }

    return response.body as AccountLoginServiceResult
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
      throw new HTTPServiceError(response, 'Internal error on creating an account')
    }

    return response.body
  }

  async verify(token: string) {
    const response = await this.httpClient.request({
      method: 'post',
      path: '/verify',
      body: { token }
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Sorry we could not authenticate your user')
    }
  }
}
