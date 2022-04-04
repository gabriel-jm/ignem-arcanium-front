import { ValidationPresenterDecorator } from '@/main/decorators'
import { validationErrorResponse } from '@/presentation/helpers'
import { mockPresenter, mockValidator } from '@/tests/helpers'

function makeSut() {
  const validatorSpy = mockValidator()
  const presenterSpy = mockPresenter()

  const sut = new ValidationPresenterDecorator(presenterSpy, validatorSpy)

  return {
    sut,
    validatorSpy,
    presenterSpy
  }
}

describe('ValidationPresenterDecorator', () => {
  const params = { value: 'data' }

  it('should call Validator with correct values', async () => {
    const { sut, validatorSpy } = makeSut()

    await sut.handle(params)

    expect(validatorSpy.validate).toHaveBeenCalledWith(params)
  })

  it('should return a validation error response if validator return errors', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.validate.mockReturnValueOnce({ field: 'Required field' })

    const response = await sut.handle()

    expect(response).toEqual(validationErrorResponse({
      field: 'Required field'
    }))
  })
  
  it('should call Presenter on success', async () => {
    const { sut, presenterSpy } = makeSut()

    await sut.handle(params)

    expect(presenterSpy.handle).toHaveBeenCalledWith(params)
  })
})
