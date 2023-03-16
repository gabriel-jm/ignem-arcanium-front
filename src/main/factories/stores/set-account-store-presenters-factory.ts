import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { UiNotifier } from '@/common/ui/notifiers'
import { AccountStore } from '@/account/ui/stores/account-store'
import { LogoutPresenter } from '@/account/application/logout-presenter'

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
