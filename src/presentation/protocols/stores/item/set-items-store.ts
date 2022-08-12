import { AnyKindOfItem } from '@/domain/protocols/use-cases'

export type SetItemsStoreParams = AnyKindOfItem[]

export interface SetItemsStore {
  set items(value: SetItemsStoreParams)
}
