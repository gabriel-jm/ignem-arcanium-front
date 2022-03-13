import {
  AddMessageListenerOnceClient,
  CreateConnectionClient,
  CreateConnectionClientResult,
  MessageOnceListener,
  SendMessageClient,
  SendMessageStoreParams
} from '@/infra/protocols'

interface WebSocketClientEventHandlerParams {
  event: string
  statusCode: number
  headers: Record<string, unknown>
  data: unknown
}

interface WebSocketClientEvents {
  once: Record<string, undefined | ((params: WebSocketClientEventHandlerParams) => void)>
}

type WebSocketConnectionClient = (
  AddMessageListenerOnceClient
  & SendMessageClient
  & CreateConnectionClient
)

export class WebSocketClient implements WebSocketConnectionClient {
  static #instance: WebSocketClient | null = null
  static #serverUrl: string
  #connection!: WebSocket
  #events: WebSocketClientEvents = {
    once: {}
  }

  constructor() {
    if (!WebSocketClient.#instance) {
      WebSocketClient.#instance = this
    }

    return WebSocketClient.#instance
  }

  static set serverUrl(value: string) {
    WebSocketClient.#serverUrl = value
  }
  
  once(eventName: string, listener: MessageOnceListener): void {
    this.#events.once[eventName] = listener
  }

  async createConnection(): Promise<CreateConnectionClientResult> {
    if (!this.#connection) {
      const connection = await this.#connectionAttempt(WebSocketClient.#serverUrl)

      if (!connection) {
        throw new Error('Cannot stablish a connection with the server')
      }

      connection.addEventListener('message', receivedMessage => {
        const messageData = JSON.parse(receivedMessage.data)
        
        const eventName = String(messageData.event)
  
        if (eventName in this.#events.once) {
          this.#events.once[eventName]?.(messageData)
          this.#events.once[eventName] = undefined
        }
      })

      this.#connection = connection
    }
    
    return new Promise((resolve) => {
      this.once('accept-connection', messageData => {
        resolve(messageData.headers as  { connectionId: string })
      })
    })
  }

  send(params: SendMessageStoreParams): void {
    const message = JSON.stringify({
      event: params.event,
      headers: params.headers ?? {},
      data: params.data ?? null
    })

    this.#connection.send(message)
  }

  #connectionAttempt(serverUrl: string) {
    return new Promise<WebSocket | null>((resolve) => {
      const connection = new WebSocket(serverUrl)

      connection.addEventListener('open', () => {
        console.log('Web Socket Connection Stablished!')
        resolve(connection)
      })

      connection.addEventListener('error', () => {
        resolve(null)
      })
    })
  }
}
