import { RemoteVerifyToken } from '@/domain/use-cases'
import { LocalStorageCacheStore } from '@/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeAccountService } from '@/main/factories/services'
import { VerifyTokenPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { LithenRouterAdapter } from '@/ui/routers'

export function makeVerifyTokenPresenter() {
  const accountService = makeAccountService()
  const localStorageCacheStore = new LocalStorageCacheStore()
  const verifyToken = new RemoteVerifyToken(localStorageCacheStore, accountService)

  const presenter = new VerifyTokenPresenter(verifyToken, new LithenRouterAdapter())

  return new ErrorHandlingPresenterDecorator(new UiNotifier(), presenter)
}
