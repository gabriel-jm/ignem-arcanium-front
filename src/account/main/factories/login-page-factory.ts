import { UiNotifier } from '@/common/ui/components/notification/index.js'
import { makeCheckTokenExistsPresenter } from '@/main/factories/presenters/index.js'
import { LoginPage } from '@/account/ui/pages/index.js'
import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators/index.js'
import { LoginPresenter } from '@/account/application/login-presenter.js'
import { makeFetchHTTPClient } from '@/main/factories/clients/index.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'

export function makeLoginPage() {
  return new LoginPage(
    makeLoginPresenter(),
    makeCheckTokenExistsPresenter(),
    new UiNotifier()
  )
}

export function makeLoginPresenter() {
  const loginPresenter = new LoginPresenter(
    makeFetchHTTPClient(),
    new LocalStorageCacheStore(),
    new AccountStore()
  )

  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
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
