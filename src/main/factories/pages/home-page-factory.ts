import { RemoteCreateConnection } from '@/data/use-cases'
import { WebSocketClient } from '@/infra/clients'
import { WebSocketConnectionService } from '@/infra/services'
import { HomePage } from '@/presentation/view'

export function makeHomePage() {
  WebSocketClient.serverUrl = import.meta.env.VITE_WS_SERVER_URL
  const wsClient = new WebSocketClient()
  const wsConnectionService = new WebSocketConnectionService(wsClient as WebSocketClient)
  const createConnection = new RemoteCreateConnection(wsConnectionService)
  const homePage = new HomePage(createConnection)

  return homePage
}
