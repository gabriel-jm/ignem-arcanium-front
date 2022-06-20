import { Presenter } from '@/presentation/protocols'
import { AccountData, SetAccountStore } from '@/ui/protocols/stores'

export class AccountStore implements SetAccountStore {
  static #instance: AccountStore
  #account: Record<'name', string> | null = null
  #logoutPresenter: Presenter | null = null

  constructor() {
    if (!AccountStore.#instance) {
      AccountStore.#instance = this
    }

    return AccountStore.#instance
  }

  set account(value: AccountData | null) {
    this.#account = value
  }

  get account() {
    return this.#account
  }

  get logoutPresenter() {
    return this.#logoutPresenter as Presenter
  }

  set logoutPresenter(value: Presenter) {
    this.#logoutPresenter = value
  }

  logout() {
    this.#logoutPresenter?.handle()
  }
}
