import { RemoteCreateConnection } from '@/domain/use-cases'
import { WebSocketClient } from '@/infra/clients'
import { WebSocketConnectionService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { makeWebSocketClient } from '@/main/factories/clients'
import { CreateConnectionPresenter } from '@/presentation/presenters'
import { UiNotifier } from '@/ui/notifiers'
import { IgnemHomePage } from '@/ui/view'

export function makeHomePage() {
  const wsClient = makeWebSocketClient()
  const wsConnectionService = new WebSocketConnectionService(wsClient as WebSocketClient)
  const createConnection = new RemoteCreateConnection(wsConnectionService)
  const createConnectionPresenter = new CreateConnectionPresenter(createConnection)

  const homePage = new IgnemHomePage(
    new ErrorHandlingPresenterDecorator(
      new UiNotifier(),
      createConnectionPresenter
    )
  )

  return homePage
}
