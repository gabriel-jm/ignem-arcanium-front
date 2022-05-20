import { RemoteVerifyToken } from '@/domain/use-cases'
import { FetchHTTPClient } from '@/infra/clients'
import { AccountService } from '@/infra/services'
import { LocalStorageCacheStore } from '@/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { VerifyTokenPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { LithenRouterAdapter } from '@/ui/routers'

export function makeVerifyTokenPresenter() {
  const httpClient = new FetchHTTPClient(import.meta.env.VITE_SERVER_URL)
  const accountService = new AccountService(httpClient)
  const localStorageCacheStore = new LocalStorageCacheStore()
  const verifyToken = new RemoteVerifyToken(localStorageCacheStore, accountService)

  const presenter = new VerifyTokenPresenter(verifyToken, new LithenRouterAdapter())

  return new ErrorHandlingPresenterDecorator(new UiNotifier(), presenter)
}
