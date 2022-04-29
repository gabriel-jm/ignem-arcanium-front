import { RemoteUpdateTorchRegistry } from '@/data/use-cases'
import { TorchRegistryService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator, ValidationPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { UpdateTorchRegistryPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { validatorComposite } from '@/validation/composites'

export function makeUpdateTorchRegistryPresenter() {
  const wsClient = makeWebSocketClient()
  const torchRegistryService = new TorchRegistryService(wsClient)
  const remoteUpdateTorchRegistry = new RemoteUpdateTorchRegistry(torchRegistryService)
  const updateTorchRegistryPresenter = new UpdateTorchRegistryPresenter(remoteUpdateTorchRegistry)
  
  return new ErrorHandlingPresenterDecorator(
    new UiNotifier(),
    new ValidationPresenterDecorator(
      updateTorchRegistryPresenter,
      validatorComposite({
        id: {
          type: 'string',
          required: true
        },
        torchCharge: {
          type: ['string', 'number']
        },
        isLit: {
          type: 'boolean'
        }
      })
    )
  )
}
