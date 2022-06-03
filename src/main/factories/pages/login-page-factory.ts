import { UiNotifier } from '@/ui/notifiers'
import { IgnemLoginPage } from '@/ui/view'
import { makeCheckTokenExistsPresenter, makeLoginPresenter } from '@/main/factories/presenters'

export function makeLoginPage() {
  const uiNotifier = new UiNotifier()
  const loginPresenter = makeLoginPresenter()
  const checkTokenExistsPresenter = makeCheckTokenExistsPresenter()

  return new IgnemLoginPage(
    loginPresenter,
    checkTokenExistsPresenter,
    uiNotifier
  )
}
