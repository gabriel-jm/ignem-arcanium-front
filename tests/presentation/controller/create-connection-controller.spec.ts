import { CreateConnectionController } from '@/presentation/controllers'
import { mockCreateConnection } from '@/tests/helpers'

function makeSut() {
  const createConnectionSpy = mockCreateConnection()
  const sut = new CreateConnectionController(createConnectionSpy)

  return {
    sut,
    createConnectionSpy
  }
}

describe('CreateConnectionController', () => {
  it('should call CreateConnection use case with correct values', async () => {
    const { sut, createConnectionSpy } = makeSut()

    await sut.handle()

    expect(createConnectionSpy.create).toHaveBeenCalledWith()
  })
})
