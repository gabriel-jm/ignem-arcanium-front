import { CacheStore, HTTPClient } from '@/common/infra/protocols'
import { HTTPServiceError } from '@/infra/errors'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetAccountStore } from '@/presentation/protocols/stores'

interface LoginPresenterParams {
  email: string
  password: string
}

interface ServerLoginData {
  name: string
  token: string
}

export class LoginPresenter implements Presenter {
  constructor(
    private readonly httpClient: HTTPClient,
    private readonly cacheStore: CacheStore,
    private readonly setAccountStore: SetAccountStore
  ) {}
  
  async handle(params: LoginPresenterParams) {
    const response = await this.httpClient.request<ServerLoginData>({
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

    const accessCredentials = response.body

    this.cacheStore.save('token', { token: accessCredentials.token })

    this.setAccountStore.account = {
      name: accessCredentials.name
    }

    return successResponse(null)
  }
}
