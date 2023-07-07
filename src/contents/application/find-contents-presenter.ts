import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter, PresenterResult } from '@/common/application/protocols/index.js'
import { HTTPServiceError } from '@/common/infra/errors/index.js'
import { HTTPClient } from '@/common/infra/protocols/index.js'

export class FindContentsPresenter implements Presenter {
  constructor(private readonly httpClient: HTTPClient) {}

  async handle<T = any>(): Promise<PresenterResult<T>> {
    const response = await this.httpClient.request({
      method: 'get',
      path: '/contents'
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on finding contents')
    }

    return successResponse(response.body)
  }
}
