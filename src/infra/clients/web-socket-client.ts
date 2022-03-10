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
  #connection: WebSocket
  #events: WebSocketClientEvents = {
    once: {}
  }

  private constructor() {
    this.#connection = new WebSocket(WebSocketClient.#serverUrl)

    this.#connection.addEventListener('open', () => {
      console.log('Web Socket Connection Stablished!')
    })

    this.#connection.addEventListener('message', receivedMessage => {
      const messageData = JSON.parse(receivedMessage.data)

      const eventName = String(messageData.event)

      if (eventName in this.#events.once) {
        this.#events.once[eventName]?.(messageData)
        this.#events.once[eventName] = undefined
      }
    })
  }
  
  static getInstance() {
    if (!WebSocketClient.#instance) {
      WebSocketClient.#instance = new WebSocketClient()
    }

    return WebSocketClient.#instance
  }

  static set serverUrl(value: string) {
    WebSocketClient.#serverUrl = value
  }
  
  once(eventName: string, listener: MessageOnceListener): void {
    this.#events.once[eventName] = listener
  }

  create(): Promise<CreateConnectionClientResult> {
    return new Promise((resolve) => {
      this.once('accept-connection', messageData => {
        resolve(messageData.data as  { connectionId: string })
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
}
