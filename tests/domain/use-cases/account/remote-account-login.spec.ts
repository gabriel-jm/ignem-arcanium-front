import { RemoteAccountLogin } from '@/domain/use-cases'
import { mockAccountLoginService, mockCacheStore } from '@/tests/helpers'

function makeSut() {
  const accountLoginServiceSpy = mockAccountLoginService()
  const cacheStoreSpy = mockCacheStore()
  const sut = new RemoteAccountLogin(accountLoginServiceSpy, cacheStoreSpy)

  return {
    sut,
    accountLoginServiceSpy,
    cacheStoreSpy
  }
}

describe('RemoteAccountLogin', () => {
  const dummyLoginParams = {
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call AccountLoginService with correct values', async () => {
    const { sut, accountLoginServiceSpy } = makeSut()

    await sut.login(dummyLoginParams)

    expect(accountLoginServiceSpy.login).toHaveBeenCalledWith({
      email: dummyLoginParams.email,
      password: dummyLoginParams.password
    })
  })

  it('should call CacheStore.save with correct values', async () => {
    const { sut, accountLoginServiceSpy, cacheStoreSpy } = makeSut()

    await sut.login(dummyLoginParams)

    expect(cacheStoreSpy.save).toHaveBeenCalledWith(
      'token',
      {
        token: accountLoginServiceSpy.result.token
      }
    )
  })
})
