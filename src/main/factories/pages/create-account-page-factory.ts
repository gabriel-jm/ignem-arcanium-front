import { RemoteCreateAccount } from '@/domain/use-cases'
import { FetchHTTPClient } from '@/infra/clients'
import { AccountService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { CreateAccountPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemCreateAccountPage } from '@/ui/view'
import { validatorComposite } from '@/validation/composites'

export function makeCreateAccountPage() {
  const httpClient = new FetchHTTPClient(import.meta.env.VITE_SERVER_URL)
  const accountService = new AccountService(httpClient)
  const accountUsecase = new RemoteCreateAccount(accountService)
  const presenter = new CreateAccountPresenter(accountUsecase)

  const uiNotifier = new UiNotifier()
  
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

  return new IgnemCreateAccountPage(decoratedPresenter, uiNotifier)
}
