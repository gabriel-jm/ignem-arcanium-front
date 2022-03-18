import { RemoteFindAllTorchRegistries } from '@/data/use-cases'
import { TorchRegistryService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { FindAllTorchRegistriesPresenter } from '@/presentation/presenters'
import { Presenter } from '@/presentation/protocols'
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
    <Presenter>{
      handle() {
        return Promise.resolve({
          ok: true,
          data: [{
            id: 'any_id',
            characterName: 'Warrior',
            torchCount: 1,
            torchCharge: 3,
            isLit: 'true'
          }, {
            id: 'any_id',
            characterName: 'Warrior',
            torchCount: 1,
            torchCharge: 3,
            isLit: 'true'
          }]
        })
      }
    }
  )

  const torchesPage = new IgnemTorchesPage(presenter)

  return torchesPage
}
