import { AnyKindOfItem } from '@/item/types/items'

export type SetItemsStoreParams = AnyKindOfItem[]

export interface SetItemsStore {
  set items(value: SetItemsStoreParams)
}
