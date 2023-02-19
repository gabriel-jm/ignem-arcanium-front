import { HTTPClient } from '@/common/infra/protocols'
import { ListAllDefaultItemsService, ListAllDefaultItemsServiceResult } from '@/domain/protocols/services'
import { HTTPServiceError } from '@/infra/errors'

export class ItemService implements ListAllDefaultItemsService {
  constructor(private readonly httpClient: HTTPClient) {}

  async listAllDefault() {
    const response = await this.httpClient.request<ListAllDefaultItemsServiceResult>({
      method: 'get',
      path: '/items'
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on searching default items')
    }

    return response.body
  }
}
