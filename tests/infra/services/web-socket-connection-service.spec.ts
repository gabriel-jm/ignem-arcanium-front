import { WebSocketConnectionService } from '@/infra/services'
import { mockCreateConnectionClient } from '@/tests/helpers'

function makeSut() {
  const createConnectionClientSpy = mockCreateConnectionClient()
  const sut = new WebSocketConnectionService(createConnectionClientSpy)

  return {
    sut,
    createConnectionClientSpy
  }
}

describe('WebSocketConnectionService', () => {
  it('should call CreateConnectionClient with correct values', async () => {
    const { sut, createConnectionClientSpy } = makeSut()

    await sut.create()

    expect(createConnectionClientSpy.create).toHaveBeenCalledWith()
  })
})
