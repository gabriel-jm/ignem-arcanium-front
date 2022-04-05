import {
  makeCreateTorchRegistryPresenter,
  makeFindAllTorchRegistriesPresenter
} from '@/main/factories/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemTorchesPage } from '@/ui/view'

export function makeTorchesPage() {
  const findAllTorchRegistriesPresenter = makeFindAllTorchRegistriesPresenter()
  const createTorchRegistryPresenter = makeCreateTorchRegistryPresenter()

  const torchesPage = new IgnemTorchesPage(
    findAllTorchRegistriesPresenter,
    createTorchRegistryPresenter,
    new UiNotifier()
  )

  return torchesPage
}
