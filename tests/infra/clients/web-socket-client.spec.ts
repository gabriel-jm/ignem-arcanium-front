import { WebSocketClient } from '@/infra/clients'
import { mockNativeWebSocket } from '@/tests/helpers'

function makeSut() {
  const [WebSocketSpy, fakeWebSocketInstance] = mockNativeWebSocket()
  const sut = WebSocketClient

  return {
    sut,
    WebSocketSpy,
    fakeWebSocketInstance
  }
}

describe('WebSocketClient', () => {
  it('should call native WebSocket with correct values', async () => {
    const { sut, WebSocketSpy, fakeWebSocketInstance } = makeSut()

    sut.serverUrl = 'any_server_url'
    sut.getInstance()

    expect(WebSocketSpy).toHaveBeenCalledWith('any_server_url')
    expect(fakeWebSocketInstance.addEventListener).toHaveBeenCalledWith(
      'open',
      expect.any(Function)
    )
    expect(fakeWebSocketInstance.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function)
    )
  })

  it('should return the same instance on every getInstance call', async () => {
    const { sut } = makeSut()
    const instance1 = sut.getInstance()
    const instance2 = sut.getInstance()

    expect(instance1).toBe(instance2)
  })

  it('should call once with correct values on create method', async () => {
    const { sut } = makeSut()
    const instance = sut.getInstance()
    const onceSpy = vi.spyOn(instance, 'once')
    onceSpy.mockImplementation((_eventName, listener) => {
      listener({
        event: 'any_event_name',
        statusCode: 200,
        headers: {},
        data: null
      })
    })

    await instance.create()

    expect(onceSpy).toHaveBeenCalledWith('accept-connection', expect.any(Function))
  })
})
