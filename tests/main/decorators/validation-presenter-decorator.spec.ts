import { ValidationPresenterDecorator } from '@/main/decorators'
import { validationErrorResponse } from '@/presentation/helpers'
import { mockPresenter } from '@/tests/helpers'
import * as validatorFacadeAll from '@/validation/facades'

function makeSut(validationSchema = {}) {
  const validatorSpy = vi.fn<any>(() => null)
  const validatorFacadeSpy = vi.spyOn(validatorFacadeAll, 'validatorFacade')
  validatorFacadeSpy.mockReturnValue(validatorSpy)
  
  const presenterSpy = mockPresenter()

  const sut = new ValidationPresenterDecorator(presenterSpy, validationSchema)

  return {
    sut,
    validationSchema,
    validatorSpy,
    validatorFacadeSpy,
    presenterSpy
  }
}

describe('ValidationPresenterDecorator', () => {
  const params = { value: 'data' }

  it('should call validatorFacade with correct values', async () => {
    const { sut, validatorFacadeSpy, validationSchema, validatorSpy } = makeSut()

    await sut.handle(params)

    expect(validatorFacadeSpy).toHaveBeenCalledWith(validationSchema)
    expect(validatorSpy).toHaveBeenCalledWith(params)
  })

  it('should return a validation error response if validator return errors', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.mockReturnValueOnce({ field: 'Required field' })

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
