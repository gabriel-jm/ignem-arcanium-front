import { Base64TokenDecoder } from '@/account/infra/cryptography/index.js'
import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { UiNotifier } from '@/common/ui/notifiers/index.js'
import { VerifyTokenPresenter } from '@/account/application/verify-token-presenter.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'

export function makeVerifyTokenPresenter() {
  const presenter = new VerifyTokenPresenter(
    new LocalStorageCacheStore(),
    new Base64TokenDecoder(),
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(new UiNotifier(), presenter)
}
