import { RemoteCreateConnection } from '@/data/use-cases'
import { WebSocketClient } from '@/infra/clients'
import { WebSocketConnectionService } from '@/infra/services'
import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { CreateConnectionPresenter } from '@/presentation/presenters'
import { NotificationStore } from '@/ui/stores'
import { IgnemHomePage } from '@/ui/view'

export function makeHomePage() {
  WebSocketClient.serverUrl = import.meta.env.VITE_WS_SERVER_URL
  const wsClient = new WebSocketClient()
  const wsConnectionService = new WebSocketConnectionService(wsClient as WebSocketClient)
  const createConnection = new RemoteCreateConnection(wsConnectionService)
  const createConnectionPresenter = new CreateConnectionPresenter(createConnection)

  const homePage = new IgnemHomePage(
    new ErrorHandlingPresenterDecorator(
      new NotificationStore(),
      createConnectionPresenter
    )
  )

  return homePage
}
