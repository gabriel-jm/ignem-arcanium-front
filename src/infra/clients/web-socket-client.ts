import { WsServiceError, WebSocketConnectionFailedError } from '@/infra/errors'
import {
  CreateConnectionClient,
  MessageOnceListener,
  SendMessageClient,
  SendMessageClientParams,
  SendMessageClientResult,
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
  SendMessageClient
  & CreateConnectionClient
)

export class WebSocketClient implements WebSocketConnectionClient {
  static #instance: WebSocketClient | null = null
  static #serverUrl: string
  #connection!: WebSocket
  #connectionId: string | null = null
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
  
  async #once(eventName: string, listener: MessageOnceListener<any>) {
    !this.#connection && await this.createConnection()

    this.#events.once[eventName] = listener
  }

  async createConnection() {
    if (this.#connection) return

    const connection = await this.#connectionAttempt(WebSocketClient.#serverUrl)

    if (!connection) {
      throw new WebSocketConnectionFailedError()
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
    
    return new Promise<void>((resolve) => {
      this.#once('accept-connection', messageData => {
        const headers = messageData.headers as { connectionId: string }
        this.#connectionId = headers.connectionId

        resolve()
      })
    })
  }

  async sendMessage<T = unknown>(params: SendMessageClientParams): Promise<SendMessageClientResult<T>> {
    !this.#connection && await this.createConnection()

    return new Promise(async (resolve, reject) => {
      try {
        await this.#once(
          params.responseEvent,
          payload => {
            if (payload.statusCode < 400) {
              return resolve(payload)
            }
  
            reject(
              new WsServiceError(
                payload,
                params.errorMessage ?? 'Internal error, please try again later'
              )
            )
          }
        )
  
        const message = JSON.stringify({
          event: params.event,
          headers: {
            connectionId: this.#connectionId,
            ...params.headers
          },
          data: params.data ?? null
        })
    
        this.#connection.send(message)
      } catch(error) {
        reject(error)
      }
    })
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
