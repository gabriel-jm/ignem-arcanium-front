import { CacheStore, HTTPClient } from '@/common/infra/protocols'
import { HTTPServiceError } from '@/infra/errors'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'
import { SetAccountStore } from '@/presentation/protocols/stores'

export interface CreateAccountPresenterParams {
  name: string
  email: string
  password: string
}

interface ServerCreateAccountData {
  name: string
  token: string
}

export class CreateAccountPresenter implements Presenter {
  constructor(
    private readonly httpClient: HTTPClient,
    private readonly cacheStore: CacheStore,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle<T = any>(params: CreateAccountPresenterParams): Promise<PresenterResult<T>> {
    const response = await this.httpClient.request<ServerCreateAccountData>({
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

    const accountData = response.body

    this.cacheStore.save('token', { token: accountData.token })

    this.setAccountStore.account = {
      name: accountData.name
    }

    return successResponse(null)
  }
}
