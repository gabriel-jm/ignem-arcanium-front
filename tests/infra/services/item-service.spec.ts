import { HTTPServiceError } from '@/infra/errors'
import { ItemService } from '@/infra/services'
import { fakeItem, mockHTTPClient } from '@/tests/helpers'

function makeSut() {
  const httpClientSpy = mockHTTPClient()
  httpClientSpy.request.mockImplementation(() => {
    return Promise.resolve({
      statusCode: 200,
      body: [fakeItem()]
    })
  })
  const sut = new ItemService(httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('ItemService', () => {
  it('should call HTTPClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.listAllDefault()

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      method: 'get',
      path: '/items'
    })
  })

  it('should throw a ServiceError if statusCode from response is greater or equal to 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = {
      statusCode: 400,
      body: {
        error: {
          details: ['any_error']
        }
      }
    }
    httpClientSpy.request.mockResolvedValueOnce(httpResponse)

    const promise = sut.listAllDefault()

    await expect(promise).rejects.toThrowError(new HTTPServiceError(
      httpResponse,
      'Internal error on searching default items'
    ))
  })

  it('should return a list of items on success', async () => {
    const { sut } = makeSut()

    const result = await sut.listAllDefault()

    expect(result).toEqual([fakeItem()])
  })
})
