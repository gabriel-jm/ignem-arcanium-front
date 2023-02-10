import { RemoteCreateAccount } from '@/domain/use-cases'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { CreateAccountPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { AccountStore } from '@/ui/stores'
import { IgnemCreateAccountPage } from '@/ui/view'
import { makeAccountService } from '@/account/main/factories'

export function makeCreateAccountPage() {
  const accountService = makeAccountService()
  const localStorageCacheStore = new LocalStorageCacheStore()
  const accountUsecase = new RemoteCreateAccount(accountService, localStorageCacheStore)
  const presenter = new CreateAccountPresenter(accountUsecase, new AccountStore())

  const uiNotifier = new UiNotifier()
  
  const decoratedPresenter = new ErrorHandlingPresenterDecorator(
    uiNotifier,
    new ValidationPresenterDecorator(
      presenter,
      {
        name: {
          type: 'string',
          required: true
        },
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

  return new IgnemCreateAccountPage(
    decoratedPresenter,
    uiNotifier
  )
}
