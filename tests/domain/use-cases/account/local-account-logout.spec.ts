import { LocalAccountLogout } from '@/domain/use-cases'
import { mockCacheStore } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  const sut = new LocalAccountLogout(cacheStoreSpy)

  return {
    sut,
    cacheStoreSpy
  }
}

describe('LocalAccountLogout', () => {
  it('should call CacheStore.remove with correct values', async () => {
    const { sut, cacheStoreSpy } = makeSut()

    await sut.logout()

    expect(cacheStoreSpy.remove).toHaveBeenCalledWith('token')
  })
})
