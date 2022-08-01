import { ListAllDefaultItems } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { SetItemsStore } from '@/presentation/protocols/stores'

export class ListAllDefaultItemsPresenter implements Presenter {
  constructor(
    private readonly listAllDefaultItems: ListAllDefaultItems,
    private readonly setItemsStore: SetItemsStore
  ) {}

  async handle() {
    const items = await this.listAllDefaultItems.listAll()

    this.setItemsStore.items = items

    return successResponse(null)
  }
}
