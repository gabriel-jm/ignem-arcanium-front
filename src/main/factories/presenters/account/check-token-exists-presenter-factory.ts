import { LocalCheckTokenExists } from '@/domain/use-cases'
import { LocalStorageCacheStore } from '@/common/infra/stores'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { CheckTokenExistsPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'

export function makeCheckTokenExistsPresenter() {
  const localStorageCacheStore = new LocalStorageCacheStore()
  const checkTokenExists = new LocalCheckTokenExists(localStorageCacheStore)
  const checkTokenExistsPresenter = new CheckTokenExistsPresenter(
    checkTokenExists
  )

  const uiNotifier = new UiNotifier()

  const decoratedCheckTokenPresenter = new ErrorHandlingPresenterDecorator(
    uiNotifier,
    checkTokenExistsPresenter
  )

  return decoratedCheckTokenPresenter
}
