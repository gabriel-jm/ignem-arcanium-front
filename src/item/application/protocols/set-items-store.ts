import { AnyKindOfItem } from '@/item/types/items.js'

export type SetItemsStoreParams = AnyKindOfItem[]

export interface SetItemsStore {
  set items(value: SetItemsStoreParams)
}
