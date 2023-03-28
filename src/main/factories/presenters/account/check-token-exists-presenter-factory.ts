import { LocalCheckTokenExists } from '@/domain/use-cases/index.js'
import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'
import { CheckTokenExistsPresenter } from '@/presentation/presenters/index.js'
import { UiNotifier } from '@/common/ui/components/notification/index.js'

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
