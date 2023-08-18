import { successResponse } from '@/common/application/helpers/presenter-results.js'
import { Presenter } from '@/common/application/protocols/presenter.js'
import { HTTPServiceError } from '@/common/infra/errors/http-service-error.js'
import { HTTPClient } from '@/common/infra/protocols/index.js'

export class DeleteContentPresenter implements Presenter {
  constructor(
    private readonly httpClient: HTTPClient
  ) {}
  
  async handle(data: { id: string }) {
    const response = await this.httpClient.request({
      method: 'delete',
      path: `/contents/${data.id}`
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on deleting content')
    }

    return successResponse(null)
  }
}
