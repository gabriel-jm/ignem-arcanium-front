import { ListAllDefaultItemsResult } from '@/domain/protocols/use-cases'

export type ListAllDefaultItemsServiceResult = ListAllDefaultItemsResult

export interface ListAllDefaultItemsService {
  listAllDefault(): Promise<ListAllDefaultItemsServiceResult>
}
