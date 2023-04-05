import { LoginPage } from '@/account/ui/pages/index.js'
import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators/index.js'
import { LoginPresenter } from '@/account/application/login-presenter.js'
import { makeFetchHTTPClient } from '@/common/main/factories/clients/index.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'
import { makeCheckTokenExistsPresenter } from './verify-token-factories.js'

export function makeLoginPage() {
  return new LoginPage(
    makeLoginPresenter(),
    makeCheckTokenExistsPresenter()
  )
}

export function makeLoginPresenter() {
  const loginPresenter = new LoginPresenter(
    makeFetchHTTPClient(),
    new LocalStorageCacheStore(),
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(
    new ValidationPresenterDecorator(
      loginPresenter,
      {
        email: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        }
      }
    )
  )
}
