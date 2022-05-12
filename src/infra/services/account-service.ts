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
    const response = await this.httpClient.request<AccountLoginServiceResult | { error: { details: string[] } }>({
      method: 'post',
      path: '/login',
      body: {
        email: params.email,
        password: params.password
      }
    })

    if (response.statusCode >= 400) {
      const isServerError = response.statusCode >= 500

      const errorResponse = response.body as { error: { details: string[] } };

      throw new ServiceError(
        response.body,
        errorResponse.error.details[0] ?? 'Error on login',
        !isServerError
      )
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
      throw new ServiceError(response.body, 'Internal error on creating an account')
    }

    return response.body
  }
}
