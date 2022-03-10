import { RemoteCreateConnection } from '@/data/use-cases'
import { mockCreateConnectionService } from '@/tests/helpers'

function makeSut() {
  const createConnectionServiceSpy = mockCreateConnectionService()
  const sut = new RemoteCreateConnection(createConnectionServiceSpy)

  return {
    sut,
    createConnectionServiceSpy
  }
}

describe('RemoteCreateConnection', () => {
  it('should call CreateConnectionService with correct values', async () => {
    const { sut, createConnectionServiceSpy } = makeSut()

    await sut.create()

    expect(createConnectionServiceSpy.create).toHaveBeenCalledWith()
  })

  it('should return the connection id on success', async () => {
    const { sut, createConnectionServiceSpy } = makeSut()

    const response = await sut.create()

    expect(response).toBe(createConnectionServiceSpy.result)
  })
})
