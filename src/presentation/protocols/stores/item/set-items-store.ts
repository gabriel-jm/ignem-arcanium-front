import { Item } from '@/ui/protocols'

export type SetItemsStoreParams = Item[]

export interface SetItemsStore {
  set items(value: SetItemsStoreParams)
}
