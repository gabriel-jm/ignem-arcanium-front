import {
  ErrorHandlingPresenterDecorator,
  ValidationPresenterDecorator
} from '@/main/decorators'
import { RemoteAccountLogin } from '@/domain/use-cases'
import { LocalStorageCacheStore } from '@/infra/stores'
import { GenericPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemLoginPage } from '@/ui/view'
import { validatorComposite } from '@/validation/composites'
import { AccountStore } from '@/ui/stores'
import { makeAccountService } from '@/main/factories/services'

export function makeLoginPage() {
  const accountService = makeAccountService()
  const localStorageCacheStore = new LocalStorageCacheStore()
  const loginUsecase = new RemoteAccountLogin(accountService, localStorageCacheStore)
  const presenter = new GenericPresenter(loginUsecase.login.bind(loginUsecase))

  const uiNotifier = new UiNotifier()
  const accountStore = new AccountStore()
  
  const decoratedPresenter = new ErrorHandlingPresenterDecorator(
    uiNotifier,
    new ValidationPresenterDecorator(
      presenter,
      validatorComposite({
        email: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        }
      })
    )
  )

  return new IgnemLoginPage(decoratedPresenter, accountStore, uiNotifier)
}
