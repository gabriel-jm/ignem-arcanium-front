import { CheckTokenExistsPresenter } from '@/account/application/check-token-exists-presenter.js'
import { LocalStorageCacheStore } from '@/common/infra/stores/index.js'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators/index.js'

export function makeCheckTokenExistsPresenter() {
  const checkTokenExistsPresenter = new CheckTokenExistsPresenter(
    new LocalStorageCacheStore()
  )

  const decoratedCheckTokenPresenter = new ErrorHandlingPresenterDecorator(
    checkTokenExistsPresenter
  )

  return decoratedCheckTokenPresenter
}
