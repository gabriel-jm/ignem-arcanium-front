import { UiNotifier } from '@/ui/notifiers'
import { makeCheckTokenExistsPresenter, makeLoginPresenter } from '@/main/factories/presenters'
import { LoginPage } from '@/account/ui/pages'

export function makeLoginPage() {
  const uiNotifier = new UiNotifier()
  const loginPresenter = makeLoginPresenter()
  const checkTokenExistsPresenter = makeCheckTokenExistsPresenter()

  return new LoginPage(
    loginPresenter,
    checkTokenExistsPresenter,
    uiNotifier
  )
}
