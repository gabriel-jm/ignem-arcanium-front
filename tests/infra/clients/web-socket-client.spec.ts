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
})
