import { LocalAccountLogout } from '@/domain/use-cases'
import { LocalStorageCacheStore } from '@/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { LogoutPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { LithenRouterAdapter } from '@/ui/routers'
import { AccountStore } from '@/ui/stores'

export function setAccountStorePresenters() {
  const accountStore = new AccountStore()

  if (accountStore.logoutPresenter) return

  const localStorageCacheStore = new LocalStorageCacheStore()
  const localAccountLogout = new LocalAccountLogout(localStorageCacheStore)
  const logoutPresenter = new LogoutPresenter(
    localAccountLogout,
    accountStore,
    new LithenRouterAdapter()
  )

  accountStore.logoutPresenter = new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    logoutPresenter
  )
}
