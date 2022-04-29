import { RemoteCreateTorchRegistry } from '@/data/use-cases'
import { TorchRegistryService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { CreateTorchRegistryPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { validatorComposite } from '@/validation/composites'

export function makeCreateTorchRegistryPresenter() {
  const wsClient = makeWebSocketClient()
  const torchRegistryService = new TorchRegistryService(wsClient)
  const createTorchRegistry = new RemoteCreateTorchRegistry(torchRegistryService)

  const presenter = new CreateTorchRegistryPresenter(createTorchRegistry)

  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new ValidationPresenterDecorator(
      presenter,
      validatorComposite({
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
