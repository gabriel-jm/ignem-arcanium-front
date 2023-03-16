import { Base64TokenDecoder } from '@/account/infra/cryptography'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { UiNotifier } from '@/common/ui/notifiers'
import { VerifyTokenPresenter } from '@/account/application/verify-token-presenter'
import { AccountStore } from '@/account/ui/stores/account-store'

export function makeVerifyTokenPresenter() {
  const presenter = new VerifyTokenPresenter(
    new LocalStorageCacheStore(),
    new Base64TokenDecoder(),
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(new UiNotifier(), presenter)
}
