import { ListAllDefaultItemsService } from '@/domain/protocols/services'
import { ListAllDefaultItems, ListAllDefaultItemsResult } from '@/domain/protocols/use-cases'

export class RemoteListAllDefaultItems implements ListAllDefaultItems {
  constructor(private readonly listAllDefaultItemsService: ListAllDefaultItemsService) {}

  async listAll(): Promise<ListAllDefaultItemsResult> {
    const defaultItems = await this.listAllDefaultItemsService.listAllDefault()

    return defaultItems
  }
}
