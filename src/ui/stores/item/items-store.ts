import { SetItemsStore, SetItemsStoreParams } from '@/presentation/protocols/stores'
import { Item } from '@/ui/protocols'

export class ItemsStore implements SetItemsStore {
  static #instance: ItemsStore
  #items: Item[] = []
  
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
