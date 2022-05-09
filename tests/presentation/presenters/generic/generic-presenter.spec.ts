import { successResponse } from '@/presentation/helpers'
import { GenericPresenter } from '@/presentation/presenters'

function makeSut() {
  const fakeUsecaseFunction = vi.fn(() => Promise.resolve({ data: 1 }))
  const sut = new GenericPresenter(fakeUsecaseFunction)

  return {
    sut,
    fakeUsecaseFunction
  }
}

describe('GenericPresenter', () => {
  it('should call usecase function with correct values', async () => {
    const { sut, fakeUsecaseFunction } = makeSut()

    await sut.handle({ hello: 'world' })

    expect(fakeUsecaseFunction).toHaveBeenCalledWith({ hello: 'world' })
  })

  it('should return a successResponse with returned usecase value', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ hello: 'world' })

    expect(response).toEqual(successResponse({
      data: 1
    }))
  })
})
