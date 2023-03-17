import { HTTPClient } from '@/common/infra/protocols/index.js'
import { HTTPServiceError } from '@/infra/errors/index.js'
import { successResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { SetItemsStore } from '@/presentation/protocols/stores/index.js'
import { AnyKindOfItem } from '../types/items.js'

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
