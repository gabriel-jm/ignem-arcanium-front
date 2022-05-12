import { RemoteCreateAccount } from '@/domain/use-cases'
import { mockCacheStore, mockCreateAccountService } from '@/tests/helpers'

function makeSut() {
  const createAccountServiceSpy = mockCreateAccountService()
  const cacheStoreSpy = mockCacheStore()
  const sut = new RemoteCreateAccount(createAccountServiceSpy, cacheStoreSpy)

  return {
    sut,
    createAccountServiceSpy,
    cacheStoreSpy
  }
}

describe('RemoteCreateAccount', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call CreateAccountService with correct values', async () => {
    const { sut, createAccountServiceSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(createAccountServiceSpy.create).toHaveBeenCalledWith({
      name: dummyCreateParams.name,
      email: dummyCreateParams.email,
      password: dummyCreateParams.password
    })
  })

  it('should call CacheStore.save with correct values', async () => {
    const { sut, createAccountServiceSpy, cacheStoreSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(cacheStoreSpy.save).toHaveBeenCalledWith('token', {
      token: createAccountServiceSpy.result.token
    })
  })

  it('should return an object with account id on success', async () => {
    const { sut, createAccountServiceSpy } = makeSut()

    const response = await sut.create(dummyCreateParams)

    expect(response).toEqual({
      name: createAccountServiceSpy.result.name
    })
  })
})
