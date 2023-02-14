import { Base64TokenDecoder } from '@/account/infra/cryptography'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { UiNotifier } from '@/common/ui/notifiers'
import { AccountStore } from '@/ui/stores'
import { VerifyTokenPresenter } from '@/account/application/verify-token-presenter'

export function makeVerifyTokenPresenter() {
  const presenter = new VerifyTokenPresenter(
    new LocalStorageCacheStore(),
    new Base64TokenDecoder(),
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(new UiNotifier(), presenter)
}
