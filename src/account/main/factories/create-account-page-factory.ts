import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators/index.js'
import { UiNotifier } from '@/common/ui/components/notification/index.js'
import { CreateAccountPage } from '@/account/ui/pages/create-account/create-account-page.js'
import { CreateAccountPresenter } from '@/account/application/create-account-presenter.js'
import { makeFetchHTTPClient } from '@/main/factories/clients/index.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'

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
