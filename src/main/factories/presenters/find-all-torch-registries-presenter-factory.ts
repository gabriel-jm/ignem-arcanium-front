import { RemoteFindAllTorchRegistries } from '@/data/use-cases'
import { TorchRegistryService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { FindAllTorchRegistriesPresenter } from '@/presentation/presenters'
import { NotificationStore } from '@/ui/stores'

export function makeFindAllTorchRegistriesPresenter() {
  const wsClient = makeWebSocketClient()
  const torchRegistryService = new TorchRegistryService(wsClient, wsClient)
  const remoteFindAllTorchRegistries = new RemoteFindAllTorchRegistries(torchRegistryService)
  const findAllTorchRegistriesPresenter = new FindAllTorchRegistriesPresenter(
    remoteFindAllTorchRegistries
  )

  return new ErrorHandlingPresenterDecorator(
    new NotificationStore(),
    findAllTorchRegistriesPresenter
  )
}
