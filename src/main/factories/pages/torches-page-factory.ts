import { RemoteFindAllTorchRegistries } from '@/data/use-cases'
import { TorchRegistryService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { FindAllTorchRegistriesPresenter } from '@/presentation/presenters'
import { NotificationStore } from '@/ui/stores'
import { IgnemTorchesPage } from '@/ui/view'

export function makeTorchesPage() {
  const wsClient = makeWebSocketClient()
  const torchRegistryService = new TorchRegistryService(wsClient, wsClient)
  const remoteFindAllTorchRegistries = new RemoteFindAllTorchRegistries(torchRegistryService)
  const findAllTorchRegistriesPresenter = new FindAllTorchRegistriesPresenter(
    remoteFindAllTorchRegistries
  )

  const presenter = new ErrorHandlingPresenterDecorator(
    new NotificationStore(),
    findAllTorchRegistriesPresenter
  )

  const torchesPage = new IgnemTorchesPage(presenter)

  return torchesPage
}
