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

  it('should return an ok response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual({
      ok: true,
      data: null,
      validationErrors: null
    })
  })
})
