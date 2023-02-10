import { InvalidTokenError } from '@/domain/error'
import { RemoteVerifyToken } from '@/domain/use-cases'
import { mockCacheStore, mockTokenDecoder, mockVerifyTokenService } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  cacheStoreSpy.get.mockReturnValue({ token: 'any_token' })
  const verifyTokenServiceSpy = mockVerifyTokenService()
  const tokenDecoderSpy = mockTokenDecoder()

  const sut = new RemoteVerifyToken(
    cacheStoreSpy,
    tokenDecoderSpy
  )

  return {
    sut,
    cacheStoreSpy,
    verifyTokenServiceSpy,
    tokenDecoderSpy
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

  it('should call TokenDecoder with correct values', async () => {
    const { sut, tokenDecoderSpy } = makeSut()

    await sut.verify()

    expect(tokenDecoderSpy.decode).toHaveBeenCalledWith('any_token')
  })

  it('should throw an InvalidTokenError if TokenDecoder returns null', async () => {
    const { sut, tokenDecoderSpy } = makeSut()
    tokenDecoderSpy.decode.mockReturnValueOnce(null)

    const promise = sut.verify()

    await expect(promise).rejects.toThrowError(new InvalidTokenError())
  })

  it('should return the decoded token on success', async () => {
    const { sut, tokenDecoderSpy } = makeSut()

    const response = await sut.verify()

    expect(response).toEqual(tokenDecoderSpy.result)
  })
})
