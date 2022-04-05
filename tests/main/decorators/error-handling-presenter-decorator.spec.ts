import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { failureResponse } from '@/presentation/helpers'
import { mockPresenter, mockWarningNotifier } from '@/tests/helpers'

function makeSut() {
  const presenterSpy = mockPresenter()
  const notifierSpy = mockWarningNotifier()
  const sut = new ErrorHandlingPresenterDecorator(notifierSpy, presenterSpy)

  return {
    sut,
    presenterSpy,
    notifierSpy
  }
}

describe('ErrorHandlingPresenterDecorator', () => {
  it('should call NotificationStore with correct values when some error occurs', async () => {
    const { sut, presenterSpy, notifierSpy } = makeSut()
    const error = new Error('Error message')
    presenterSpy.handle.mockRejectedValueOnce(error)

    await sut.handle({})

    expect(notifierSpy.notifyWarning).toHaveBeenCalledWith('Error', error.message)
  })

  it('should call NotificationStore with default message when error does not have one', async () => {
    const { sut, presenterSpy, notifierSpy } = makeSut()
    const error = new Error()
    error.message = ''
    presenterSpy.handle.mockRejectedValueOnce(error)

    await sut.handle({})

    expect(notifierSpy.notifyWarning).toHaveBeenCalledWith('Error', 'Internal error. Try again later!')
  })

  it('should return a failue response on error catch', async () => {
    const { sut, presenterSpy } = makeSut()
    const error = new Error('Error message')
    presenterSpy.handle.mockRejectedValueOnce(error)

    const response = await sut.handle({})

    expect(response).toEqual(failureResponse({
      errorMessage: error.message
    }))
  })

  it('should return the Presenter response on success', async () => {
    const { sut, presenterSpy } = makeSut()

    const response = await sut.handle({})

    expect(response).toEqual(presenterSpy.result)
  })
})
