import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { UiNotifier } from '@/common/ui/notifiers/index.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'
import { LogoutPresenter } from '@/account/application/logout-presenter.js'

export function setAccountStorePresenters() {
  const accountStore = new AccountStore()

  if (accountStore.logoutPresenter) return

  const localStorageCacheStore = new LocalStorageCacheStore()
  const logoutPresenter = new LogoutPresenter(
    localStorageCacheStore,
    accountStore
  )

  accountStore.logoutPresenter = new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    logoutPresenter
  )
}
