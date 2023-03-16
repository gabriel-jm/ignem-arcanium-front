import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { UiNotifier } from '@/common/ui/notifiers'
import { CreateAccountPage } from '@/account/ui/pages/create-account/create-account-page'
import { CreateAccountPresenter } from '@/account/application/create-account-presenter'
import { makeFetchHTTPClient } from '@/main/factories/clients'
import { AccountStore } from '@/account/ui/stores/account-store'

export function makeCreateAccountPage() {
  const presenter = new CreateAccountPresenter(
    makeFetchHTTPClient(),
    new LocalStorageCacheStore(),
    new AccountStore()
  )
  
  const decoratedPresenter = new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
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

  return new CreateAccountPage(
    decoratedPresenter
  )
}
