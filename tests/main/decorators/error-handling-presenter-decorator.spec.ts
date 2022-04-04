import { ErrorHandlingPresenterDecorator } from '@/main/decorators'
import { mockPresenter, mockWarningNotificationStore } from '@/tests/helpers'

function makeSut() {
  const presenterSpy = mockPresenter()
  const notifierSpy = mockWarningNotificationStore()
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

    expect(notifierSpy.warn).toHaveBeenCalledWith('Error', error.message)
  })
})
