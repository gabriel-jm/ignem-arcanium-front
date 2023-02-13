import { CreateAccountPresenter } from '@/account/application/create-account-presenter'
import { successResponse } from '@/presentation/helpers'
import { mockCacheStore, mockHTTPClient, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const httpClientSpy = mockHTTPClient()
  const cacheStoreSpy = mockCacheStore()
  const setAccountStoreSpy = mockSetAccountStore()
  const sut = new CreateAccountPresenter(httpClientSpy, cacheStoreSpy, setAccountStoreSpy)

  return {
    sut,
    httpClientSpy,
    cacheStoreSpy,
    setAccountStoreSpy
  }
}

describe('CreateAccountPresenter', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }
  
  it('should call HTTPClient use case with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.handle(dummyCreateParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith(dummyCreateParams)
  })

  it('should call SetAccountStore with correct values', async () => {
    const { sut, httpClientSpy, setAccountStoreSpy } = makeSut()

    await sut.handle(dummyCreateParams)

    expect(setAccountStoreSpy.setAccountValue).toEqual({
      name: httpClientSpy.result.body.name
    })
  })

  it('should return an ok response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle(dummyCreateParams)

    expect(response).toEqual(successResponse(null))
  })
})
