import { successResponse } from '@/presentation/helpers'
import { CreateConnectionPresenter } from '@/presentation/presenters'
import { mockCreateConnection } from '@/tests/helpers'

function makeSut() {
  const createConnectionSpy = mockCreateConnection()
  const sut = new CreateConnectionPresenter(createConnectionSpy)

  return {
    sut,
    createConnectionSpy
  }
}

describe('CreateConnectionPresenter', () => {
  it('should call CreateConnection use case with correct values', async () => {
    const { sut, createConnectionSpy } = makeSut()

    await sut.handle()

    expect(createConnectionSpy.create).toHaveBeenCalledWith()
  })

  it('should return an ok response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(successResponse(null))
  })
})
