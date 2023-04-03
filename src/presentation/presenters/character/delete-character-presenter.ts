import { HTTPServiceError } from '@/common/infra/errors/index.js'
import { HTTPClient } from '@/common/infra/protocols/index.js'
import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter, PresenterResult } from '@/common/application/protocols/index.js'

export class DeleteCharacterPresenter implements Presenter {
  constructor(private readonly httpClient: HTTPClient) {}

  async handle<T = any>(data: { characterId: string }): Promise<PresenterResult<T>> {
    const response = await this.httpClient.request({
      method: 'delete',
      path: `/characters/${data.characterId}`
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on deleting the character')
    }

    return successResponse(null)
  }
}
