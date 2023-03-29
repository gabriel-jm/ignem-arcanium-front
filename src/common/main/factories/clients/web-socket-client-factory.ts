import { WebSocketClient } from '@/common/infra/clients/index.js'

WebSocketClient.serverUrl = import.meta.env.VITE_WS_SERVER_URL

export const makeWebSocketClient = () => new WebSocketClient()
