import { VerifyTokenPresenter } from '@/presentation/presenters'
import { RemoteVerifyToken } from '@/domain/use-cases'
import { Base64TokenDecoder } from '@/account/infra/cryptography'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { UiNotifier } from '@/common/ui/notifiers'
import { AccountStore } from '@/ui/stores'

export function makeVerifyTokenPresenter() {
  const localStorageCacheStore = new LocalStorageCacheStore()
  const base64TokenDecoder = new Base64TokenDecoder()
  const verifyToken = new RemoteVerifyToken(
    localStorageCacheStore,
    base64TokenDecoder
  )

  const presenter = new VerifyTokenPresenter(
    verifyToken,
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(new UiNotifier(), presenter)
}
