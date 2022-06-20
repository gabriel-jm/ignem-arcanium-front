import { HTTPServiceError, UnauthorizedError } from '@/infra/errors'
import { CharacterService } from '@/infra/services'
import { fakeCharacter, mockCacheStore, mockHTTPClient } from '@/tests/helpers'

function makeSut() {
  const cacheStoreSpy = mockCacheStore()
  cacheStoreSpy.get.mockReturnValue({ token: 'any_token' })
  const httpClientSpy = mockHTTPClient([])
  const sut = new CharacterService(cacheStoreSpy, httpClientSpy)

  return {
    sut,
    cacheStoreSpy,
    httpClientSpy
  }
}

describe('CharacterService', () => {
  describe('findAll()', () => {
    it('should call CacheStore.get with correct values', async () => {
      const { sut, cacheStoreSpy } = makeSut()

      await sut.findAll()

      expect(cacheStoreSpy.get).toHaveBeenCalledWith('token')
    })

    it('should call HTTPClient with correct values', async () => {
      const { sut, httpClientSpy } = makeSut()

      await sut.findAll()

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        method: 'get',
        path: '/characters',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer any_token'
        }
      })
    })

    it('should call HTTPClient with no Authorization token if CacheStore.get returns null', async () => {
      const { sut, cacheStoreSpy, httpClientSpy } = makeSut()
      cacheStoreSpy.get.mockReturnValueOnce(null)

      await sut.findAll()

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        method: 'get',
        path: '/characters',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '
        }
      })
    })

    it('should throw an UnauthorizedError if the http response status code is 401', async () => {
      const { sut, httpClientSpy } = makeSut()
      httpClientSpy.request.mockResolvedValueOnce({
        ...httpClientSpy.result,
        statusCode: 401
      })

      const promise = sut.findAll()

      await expect(promise).rejects.toThrowError(new UnauthorizedError())
    })

    it('should throw a HTTPServiceError if the http response status code is 400 or greater', async () => {
      const { sut, httpClientSpy } = makeSut()
      const response = {
        ...httpClientSpy.result,
        statusCode: 500
      }
      httpClientSpy.request.mockResolvedValueOnce(response)

      const promise = sut.findAll()

      await expect(promise).rejects.toThrowError(
        new HTTPServiceError(response, 'Internal error on searching characters')
      )
    })

    it('should return the characters on success', async () => {
      const { sut, httpClientSpy } = makeSut()

      const response = await sut.findAll()

      expect(response).toEqual(httpClientSpy.result.body)
    })
  })

  describe('create()', () => {
    const { id, ...createCharacterServiceParams } = fakeCharacter()

    it('should call CacheStore.get with correct values', async () => {
      const { sut, cacheStoreSpy } = makeSut()

      await sut.create(createCharacterServiceParams)

      expect(cacheStoreSpy.get).toHaveBeenCalledWith('token')
    })

    it('should call HTTPClient with correct values', async () => {
      const { sut, httpClientSpy } = makeSut()

      await sut.create(createCharacterServiceParams)

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        method: 'post',
        path: '/characters',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer any_token'
        },
        body: createCharacterServiceParams
      })
    })

    it('should call HTTPClient with no Authorization token if CacheStore.get returns null', async () => {
      const { sut, cacheStoreSpy, httpClientSpy } = makeSut()
      cacheStoreSpy.get.mockReturnValueOnce(null)

      await sut.create(createCharacterServiceParams)

      expect(httpClientSpy.request).toHaveBeenCalledWith({
        method: 'post',
        path: '/characters',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer '
        },
        body: createCharacterServiceParams
      })
    })

    it('should throw an UnauthorizedError if the http response status code is 401', async () => {
      const { sut, httpClientSpy } = makeSut()
      httpClientSpy.request.mockResolvedValueOnce({
        ...httpClientSpy.result,
        statusCode: 401
      })

      const promise = sut.create(createCharacterServiceParams)

      await expect(promise).rejects.toThrowError(new UnauthorizedError())
    })

    it('should throw a HTTPServiceError if the http response status code is 400 or greater', async () => {
      const { sut, httpClientSpy } = makeSut()
      const response = {
        ...httpClientSpy.result,
        statusCode: 500
      }
      httpClientSpy.request.mockResolvedValueOnce(response)

      const promise = sut.create(createCharacterServiceParams)

      await expect(promise).rejects.toThrowError(
        new HTTPServiceError(response, 'Internal error on creating the character')
      )
    })

    it('should return the character id on success', async () => {
      const { sut, httpClientSpy } = makeSut()
      httpClientSpy.request.mockResolvedValueOnce({
        ...httpClientSpy.result,
        body: { id: 'any_id' }
      })

      const response = await sut.create(createCharacterServiceParams)

      expect(response).toEqual({ id: 'any_id' })
    })
  })
})
