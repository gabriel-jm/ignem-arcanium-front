import { HTTPServiceError } from '@/common/infra/errors/index.js'
import { HTTPClient } from '@/common/infra/protocols/index.js'
import { successResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { AnyKindOfItem } from '../types/items.js'
import { SetItemsStore } from './protocols/set-items-store.js'

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
