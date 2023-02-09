import { HTTPServiceError } from '@/infra/errors'
import { HTTPClient } from '@/infra/protocols'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'

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
