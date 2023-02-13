import { UiNotifier } from '@/common/ui/notifiers'
import { makeCheckTokenExistsPresenter } from '@/main/factories/presenters'
import { LoginPage } from '@/account/ui/pages'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { AccountStore } from '@/ui/stores'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { LoginPresenter } from '@/account/application/login-presenter'
import { makeFetchHTTPClient } from '@/main/factories/clients'

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
