import { RemoteCreateAccount } from '@/domain/use-cases'
import { FetchHTTPClient } from '@/infra/clients'
import { AccountService } from '@/infra/services'
import { LocalStorageCacheStore } from '@/infra/stores'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { CreateAccountPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { AccountStore } from '@/ui/stores'
import { IgnemCreateAccountPage } from '@/ui/view'
import { validatorComposite } from '@/validation/composites'

export function makeCreateAccountPage() {
  const httpClient = new FetchHTTPClient(import.meta.env.VITE_SERVER_URL)
  const accountService = new AccountService(httpClient)
  const localStorageCacheStore = new LocalStorageCacheStore()
  const accountUsecase = new RemoteCreateAccount(accountService, localStorageCacheStore)
  const presenter = new CreateAccountPresenter(accountUsecase)

  const uiNotifier = new UiNotifier()
  const accountStore = new AccountStore()
  
  const decoratedPresenter = new ErrorHandlingPresenterDecorator(
    uiNotifier,
    new ValidationPresenterDecorator(
      presenter,
      validatorComposite({
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
      })
    )
  )

  return new IgnemCreateAccountPage(
    decoratedPresenter,
    uiNotifier,
    accountStore
  )
}
