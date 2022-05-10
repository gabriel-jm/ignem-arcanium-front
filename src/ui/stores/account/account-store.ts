import { AccountData, SetAccountStore } from '@/ui/protocols/stores'

export class AccountStore implements SetAccountStore {
  static #instance: AccountStore
  #account: Record<'name', string> | null = null

  constructor() {
    if (!AccountStore.#instance) {
      AccountStore.#instance = this
    }

    return AccountStore.#instance
  }

  set account(value: AccountData) {
    this.#account = value
  }
}
