import { LoginPresenter } from '@/account/application/login-presenter'
import { successResponse } from '@/presentation/helpers'
import { mockAccountLoginService, mockCacheStore, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const accountServiceSpy = mockAccountLoginService()
  const cacheStoreSpy = mockCacheStore()
  const setAccountStoreSpy = mockSetAccountStore()
  const sut = new LoginPresenter(accountServiceSpy, cacheStoreSpy,  setAccountStoreSpy)

  return {
    sut,
    accountServiceSpy,
    setAccountStoreSpy
  }
}

describe('LoginPresenter', () => {
  const dummyLoginParams = {
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call AccountService with correct values', async () => {
    const { sut, accountServiceSpy } = makeSut()

    await sut.handle(dummyLoginParams)

    expect(accountServiceSpy.login).toHaveBeenCalledWith({
      email: dummyLoginParams.email,
      password: dummyLoginParams.password
    })
  })

  it('should call SetAccountStore with correct values', async () => {
    const { sut, setAccountStoreSpy, accountServiceSpy } = makeSut()

    await sut.handle(dummyLoginParams)

    expect(setAccountStoreSpy.setAccountValue).toEqual({
      name: accountServiceSpy.result.name
    })
  })

  it('should return a ok response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(dummyLoginParams)

    expect(response).toEqual(successResponse(null))
  })
})
