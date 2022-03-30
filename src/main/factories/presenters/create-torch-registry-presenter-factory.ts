import { RemoteCreateTorchRegistry } from '@/data/use-cases'
import { TorchRegistryService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { CreateTorchRegistryPresenter } from '@/presentation/presenters'
import { NotificationStore } from '@/ui/stores'
import { ValidatorComposite } from '@/validation/composites'

export function makeCreateTorchRegistryPresenter() {
  const wsClient = makeWebSocketClient()
  const torchRegistryService = new TorchRegistryService(wsClient, wsClient)
  const createTorchRegistry = new RemoteCreateTorchRegistry(torchRegistryService)

  const presenter = new CreateTorchRegistryPresenter(createTorchRegistry)

  return new ErrorHandlingPresenterDecorator(
    new NotificationStore(),
    new ValidationPresenterDecorator(
      presenter,
      new ValidatorComposite({
        characterName: {
          required: true,
          type: 'string'
        },
        torchCount: {
          required: true,
          type: 'number'
        },
        torchCharge: {
          required: true,
          type: 'number',
          valueInBetween: [0, 6]
        }
      })
    )
  )
}
