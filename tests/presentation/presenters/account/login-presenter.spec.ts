import { LoginPresenter } from '@/account/application/login-presenter'
import { successResponse } from '@/presentation/helpers'
import { mockCacheStore, mockHTTPClient, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const httpClientSpy = mockHTTPClient()
  const cacheStoreSpy = mockCacheStore()
  const setAccountStoreSpy = mockSetAccountStore()
  const sut = new LoginPresenter(httpClientSpy, cacheStoreSpy,  setAccountStoreSpy)

  return {
    sut,
    httpClientSpy,
    setAccountStoreSpy
  }
}

describe('LoginPresenter', () => {
  const dummyLoginParams = {
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call HTTPClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.handle(dummyLoginParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      email: dummyLoginParams.email,
      password: dummyLoginParams.password
    })
  })

  it('should call SetAccountStore with correct values', async () => {
    const { sut, setAccountStoreSpy, httpClientSpy } = makeSut()

    await sut.handle(dummyLoginParams)

    expect(setAccountStoreSpy.setAccountValue).toEqual({
      name: httpClientSpy.result.body.name
    })
  })

  it('should return a ok response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(dummyLoginParams)

    expect(response).toEqual(successResponse(null))
  })
})
