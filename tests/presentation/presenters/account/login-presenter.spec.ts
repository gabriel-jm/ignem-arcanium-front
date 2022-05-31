import { successResponse } from '@/presentation/helpers'
import { LoginPresenter } from '@/presentation/presenters'
import { mockAccountLogin, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const accountLoginSpy = mockAccountLogin()
  const setAccountStoreSpy = mockSetAccountStore()
  const sut = new LoginPresenter(accountLoginSpy, setAccountStoreSpy)

  return {
    sut,
    accountLoginSpy,
    setAccountStoreSpy
  }
}

describe('LoginPresenter', () => {
  const dummyLoginParams = {
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call AccountLogin with correct values', async () => {
    const { sut, accountLoginSpy } = makeSut()

    await sut.handle(dummyLoginParams)

    expect(accountLoginSpy.login).toHaveBeenCalledWith({
      email: dummyLoginParams.email,
      password: dummyLoginParams.password
    })
  })

  it('should call SetAccountStore with correct values', async () => {
    const { sut, setAccountStoreSpy, accountLoginSpy } = makeSut()

    await sut.handle(dummyLoginParams)

    expect(setAccountStoreSpy.setAccountValue).toEqual({
      name: accountLoginSpy.result.name
    })
  })

  it('should return a ok response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(dummyLoginParams)

    expect(response).toEqual(successResponse(null))
  })
})
