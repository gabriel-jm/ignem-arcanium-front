import { Base64TokenDecoder } from '@/account/infra/cryptography/index.js'
import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { VerifyTokenPresenter } from '@/account/application/verify-token-presenter.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'
import { CheckTokenExistsPresenter } from '@/account/application/check-token-exists-presenter.js'

export function makeVerifyTokenPresenter() {
  const presenter = new VerifyTokenPresenter(
    new LocalStorageCacheStore(),
    new Base64TokenDecoder(),
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(presenter)
}

export function makeCheckTokenExistsPresenter() {
  const checkTokenExistsPresenter = new CheckTokenExistsPresenter(
    new LocalStorageCacheStore()
  )

  const decoratedCheckTokenPresenter = new ErrorHandlingPresenterDecorator(
    checkTokenExistsPresenter
  )

  return decoratedCheckTokenPresenter
}
