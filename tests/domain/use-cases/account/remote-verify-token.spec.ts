import { InvalidTokenError } from '@/domain/error'
import { RemoteVerifyToken } from '@/domain/use-cases'
import { mockCacheStore, mockVerifyTokenService } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  cacheStoreSpy.get.mockReturnValue({ token: 'any_token' })
  const verifyTokenServiceSpy = mockVerifyTokenService()

  const sut = new RemoteVerifyToken(cacheStoreSpy, verifyTokenServiceSpy)

  return {
    sut,
    cacheStoreSpy,
    verifyTokenServiceSpy
  }
}

describe('RemoteVerifyToken', () => {
  it('should call CacheStore.get with correct values', async () => {
    const { sut, cacheStoreSpy } = makeSut()

    await sut.verify()

    expect(cacheStoreSpy.get).toHaveBeenCalledWith('token')
  })

  it('should throw an InvalidTokenError if CacheStore.get returns null', async () => {
    const { sut, cacheStoreSpy } = makeSut()
    cacheStoreSpy.get.mockReturnValueOnce(null)

    const promise = sut.verify()

    await expect(promise).rejects.toThrowError(new InvalidTokenError())
  })

  it('should call VerifyTokenService with correct values', async () => {
    const { sut, verifyTokenServiceSpy } = makeSut()

    await sut.verify()

    expect(verifyTokenServiceSpy.verify).toHaveBeenCalledWith('any_token')
  })
})
