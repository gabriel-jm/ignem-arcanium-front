import { WebSocketClient } from '@/infra/clients'
import { WebSocketConnectionFailedError } from '@/infra/errors'
import { mockNativeWebSocket } from '@/tests/helpers'

const [WebSocketSpy, fakeWebSocketInstance] = mockNativeWebSocket()

let onMessageCallback: Function

function fakeWebSocketSuccessBehavior(eventName: string, cb: Function) {
  if (eventName === 'open') {
    cb()
  }

  if (eventName === 'message') {
    onMessageCallback = cb

    setTimeout(() => {
      cb({
        data: JSON.stringify({
          event: 'accept-connection',
          headers: { connectionId: 'any_connection_id' },
          data: null
        })
      })
    }, 200)
  }
}

function fakeWebSocketErrorBehavior(eventName: string, cb: Function) {
  if (eventName === 'error') {
    cb()
  }
}

describe('WebSocketClient', () => {
  describe('constructor()', () => {
    it('should return the same instance on every constructor call', () => {
      const instance1 = new WebSocketClient()
      const instance2 = new WebSocketClient()
      const instance3 = new WebSocketClient()
  
      expect(instance1).toBe(instance2)
      expect(instance1).toBe(instance3)
      expect(instance2).toBe(instance3)
    })
  })

  describe('createConnection()', () => {
    it('should throw a WebSocketConnectionFailedError if native WebSocket emits error event', async () => {
      fakeWebSocketInstance.addEventListener.mockImplementation(fakeWebSocketErrorBehavior)
      const sut = new WebSocketClient()

      const promise = sut.createConnection()

      await expect(promise).rejects.toThrowError(new WebSocketConnectionFailedError())
    })

    it('should call native WebSocket methods with correct values', async () => {
      fakeWebSocketInstance.addEventListener.mockImplementation(fakeWebSocketSuccessBehavior)

      WebSocketClient.serverUrl = 'any_server_url'
      const sut = new WebSocketClient()

      await sut.createConnection()

      expect(WebSocketSpy).toHaveBeenCalledWith('any_server_url')
      expect(fakeWebSocketInstance.addEventListener).toHaveBeenCalledWith(
        'open',
        expect.any(Function)
      )
      expect(fakeWebSocketInstance.addEventListener).toHaveBeenCalledWith(
        'error',
        expect.any(Function)
      )
      expect(fakeWebSocketInstance.addEventListener).toHaveBeenCalledWith(
        'message',
        expect.any(Function)
      )
    })
  })

  describe('send()', () => {
    it('should call send method from native WebSocket correctly when only the event is provided', () => {
      const sut = new WebSocketClient()
      setTimeout(() => {
        onMessageCallback({
          data: JSON.stringify({
            event: 'accept-connection',
            headers: { connectionId: 'any_connection_id' },
            data: null
          })
        })
      }, 200)

      sut.send({
        event: 'any_event'
      })

      expect(fakeWebSocketInstance.send).toHaveBeenCalledWith(JSON.stringify({
        event: 'any_event',
        headers: {
          connectionId: 'any_connection_id'
        },
        data: null
      }))
    })

    it('should call send method from native WebSocket with specific passed values', () => {
      const sut = new WebSocketClient()

      sut.send({
        event: 'any_event',
        headers: { field: 'any_value' },
        data: { message: 'any_message' }
      })

      expect(fakeWebSocketInstance.send).toHaveBeenCalledWith(JSON.stringify({
        event: 'any_event',
        headers: { connectionId: 'any_connection_id', field: 'any_value' },
        data: { message: 'any_message' }
      }))
    })
  })
})
