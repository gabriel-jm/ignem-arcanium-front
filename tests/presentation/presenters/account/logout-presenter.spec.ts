import { LogoutPresenter } from '@/account/application/logout-presenter'
import { successResponse } from '@/presentation/helpers'
import { mockCacheStore, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  const setAccountStoreSpy = mockSetAccountStore()
  const sut = new LogoutPresenter(
    cacheStoreSpy,
    setAccountStoreSpy
  )

  return {
    sut,
    cacheStoreSpy,
    setAccountStoreSpy
  }
}

describe('LogoutPresenter', () => {
  it('should call AccountLogout with correct values', async () => {
    const { sut, cacheStoreSpy } = makeSut()

    await sut.handle()

    expect(cacheStoreSpy.remove).toHaveBeenCalledWith()
  })

  it('should call SetAccountStore with correct values', async () => {
    const { sut, setAccountStoreSpy } = makeSut()

    await sut.handle()

    expect(setAccountStoreSpy.setAccountValue).toBeNull()
  })
  
  it('should return an empty success response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(successResponse(null))
  })
})
