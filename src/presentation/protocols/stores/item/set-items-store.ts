import { Item } from '@/domain/protocols/use-cases'

export type SetItemsStoreParams = Item[]

export interface SetItemsStore {
  set items(value: SetItemsStoreParams)
}
