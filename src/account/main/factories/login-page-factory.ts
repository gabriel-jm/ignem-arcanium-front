import { UiNotifier } from '@/ui/notifiers'
import { makeCheckTokenExistsPresenter } from '@/main/factories/presenters'
import { LoginPage } from '@/account/ui/pages'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { AccountStore } from '@/ui/stores'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { LoginPresenter } from '@/account/application/login-presenter'
import { makeFetchHTTPClient } from '@/main/factories/clients'
import { AccountService } from '@/account/infra/services/account-service'

export function makeLoginPage() {
  const uiNotifier = new UiNotifier()
  const loginPresenter = makeLoginPresenter()
  const checkTokenExistsPresenter = makeCheckTokenExistsPresenter()

  return new LoginPage(
    loginPresenter,
    checkTokenExistsPresenter,
    uiNotifier
  )
}

export function makeLoginPresenter() {
  const accountService = makeAccountService()
  const localStorageCacheStore = new LocalStorageCacheStore()
  const loginPresenter = new LoginPresenter(
    accountService,
    localStorageCacheStore,
    new AccountStore()
  )

  const uiNotifier = new UiNotifier()

  const decoratedLoginPresenter = new ErrorHandlingPresenterDecorator(
    uiNotifier,
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

  return decoratedLoginPresenter
}

export function makeAccountService() {
  const httpClient = makeFetchHTTPClient()
  return new AccountService(httpClient)
}
