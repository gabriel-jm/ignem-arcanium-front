import { RemoteAccountLogin } from '@/domain/use-cases'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeAccountService } from '@/main/factories/services'
import { LoginPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { AccountStore } from '@/ui/stores'

export function makeLoginPresenter() {
  const accountService = makeAccountService()
  const localStorageCacheStore = new LocalStorageCacheStore()
  const loginUsecase = new RemoteAccountLogin(accountService, localStorageCacheStore)
  const loginPresenter = new LoginPresenter(loginUsecase, new AccountStore())

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
