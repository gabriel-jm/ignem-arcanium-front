import { FetchHTTPClient } from '@/common/infra/clients'
import { UnauthorizedError } from '@/common/infra/errors'
import { mockCacheStore } from '@/tests/helpers'

function makeSut() {
  const fetchSpy = vi.spyOn(window, 'fetch')
  fetchSpy.mockImplementation(() => Promise.resolve({
    status: 200,
    json() {
      return {}
    }
  } as Response))
  const fakeURL = 'http://any-url.com'

  const cacheStoreSpy = mockCacheStore()
  cacheStoreSpy.get.mockReturnValue({ token: 'any_token' })
  
  const sut = new FetchHTTPClient(fakeURL, cacheStoreSpy)

  return {
    sut,
    fetchSpy,
    fakeURL,
    cacheStoreSpy
  }
}

describe('FetchHTTPClient', () => {
  it('should call CacheStore.get with correct values', async () => {
    const { sut, cacheStoreSpy } = makeSut()

    await sut.request({
      method: 'get',
      path: '/'
    })

    expect(cacheStoreSpy.get).toHaveBeenCalledWith('token')
  })

  it('should call native fetch with correct values', async () => {
    const { sut, fakeURL, fetchSpy } = makeSut()

    await sut.request({
      method: 'post',
      path: '/',
      headers: {
        auth: 'any_token'
      },
      body: {
        any: 'data'
      }
    })

    expect(fetchSpy).toHaveBeenCalledWith(`${fakeURL}/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer any_token',
        auth: 'any_token'
      },
      body: JSON.stringify({
        any: 'data'
      })
    })
  })

  it('should throw an UnauthorizedError if the http response status code is 401', async () => {
    const { sut, fetchSpy } = makeSut()
    fetchSpy.mockResolvedValueOnce(<Response>{
      status: 401
    })

    const promise = sut.request({
      method: 'get',
      path: '/'
    })

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  it('should return body as null if response status code is 204', async () => {
    const { sut, fetchSpy } = makeSut()
    fetchSpy.mockResolvedValueOnce({ status: 204 } as any)

    const response = await sut.request({
      method: 'get',
      path: '/'
    })

    expect(response).toEqual({
      statusCode: 204,
      body: null
    })
  })

  it('should parse return the status code and body on success', async () => {
    const { sut } = makeSut()

    const response = await sut.request({
      method: 'get',
      path: '/'
    })

    expect(response).toEqual({
      statusCode: 200,
      body: {}
    })
  })
})
