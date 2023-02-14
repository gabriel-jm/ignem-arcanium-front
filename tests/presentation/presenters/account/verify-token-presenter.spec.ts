import { VerifyTokenPresenter } from '@/account/application/verify-token-presenter'
import { mockCacheStore, mockRouter, mockSetAccountStore, mockTokenDecoder } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  const tokenDecoderSpy = mockTokenDecoder()
  const setAccountStoreSpy = mockSetAccountStore()
  const routerSpy = mockRouter()
  const sut = new VerifyTokenPresenter(
    cacheStoreSpy,
    tokenDecoderSpy,
    setAccountStoreSpy
  )

  return {
    sut,
    cacheStoreSpy,
    tokenDecoderSpy,
    setAccountStoreSpy,
    routerSpy
  }
}

describe('VerifyTokenPresenter', () => {
  it('should be done', () => {
    makeSut()
  })
})
