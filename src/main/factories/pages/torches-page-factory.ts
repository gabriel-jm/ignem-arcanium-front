import {
  makeCreateTorchRegistryPresenter,
  makeFindAllTorchRegistriesPresenter
} from '@/main/factories/presenters'
import { NotificationStore } from '@/ui/stores'
import { IgnemTorchesPage } from '@/ui/view'

export function makeTorchesPage() {
  const findAllTorchRegistriesPresenter = makeFindAllTorchRegistriesPresenter()
  const createTorchRegistryPresenter = makeCreateTorchRegistryPresenter()

  const torchesPage = new IgnemTorchesPage(
    findAllTorchRegistriesPresenter,
    createTorchRegistryPresenter,
    new NotificationStore()
  )

  return torchesPage
}
