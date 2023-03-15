import { HTTPClient } from '@/common/infra/protocols'
import { HTTPServiceError } from '@/infra/errors'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetItemsStore } from '@/presentation/protocols/stores'
import { AnyKindOfItem } from '../types/items'

export class ListAllDefaultItemsPresenter implements Presenter {
  constructor(
    private readonly httpClient: HTTPClient,
    private readonly setItemsStore: SetItemsStore
  ) {}

  async handle() {
    const response = await this.httpClient.request<AnyKindOfItem[]>({
      method: 'get',
      path: '/items'
    })

    if (response.statusCode >= 400) {
      throw new HTTPServiceError(response, 'Internal error on searching default items')
    }

    const items = response.body

    this.setItemsStore.items = items

    return successResponse(null)
  }
}
