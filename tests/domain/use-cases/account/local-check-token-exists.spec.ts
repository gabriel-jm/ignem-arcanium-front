import { LocalCheckTokenExists } from '@/domain/use-cases'
import { mockCacheStore } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  const sut = new LocalCheckTokenExists(cacheStoreSpy)

  return {
    sut,
    cacheStoreSpy
  }
}

describe('LocalCheckTokenExists', () => {
  it('should call CacheStore with correct values', () => {
    const { sut, cacheStoreSpy } = makeSut()

    sut.check()

    expect(cacheStoreSpy.get).toHaveBeenCalledWith('token')
  })

  it('should return false if no token is found', () => {
    const { sut, cacheStoreSpy } = makeSut()
    cacheStoreSpy.get.mockReturnValueOnce(null)

    const response = sut.check()

    expect(response).toBe(false)
  })

  it('should return true if a token is found', () => {
    const { sut, cacheStoreSpy } = makeSut()
    cacheStoreSpy.get.mockReturnValueOnce({ token: 'any_token' })

    const response = sut.check()

    expect(response).toBe(true)
  })
})
