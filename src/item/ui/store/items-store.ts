import { AnyKindOfItem } from '@/item/types/items'
import { SetItemsStore, SetItemsStoreParams } from '@/presentation/protocols/stores'

export class ItemsStore implements SetItemsStore {
  static #instance: ItemsStore
  #items: AnyKindOfItem[] = []
  
  constructor() {
    if (!ItemsStore.#instance) {
      ItemsStore.#instance = this
    }

    return ItemsStore.#instance
  }

  get items() {
    return this.#items
  }

  set items(value: SetItemsStoreParams) {
    this.#items = value
  }
}
