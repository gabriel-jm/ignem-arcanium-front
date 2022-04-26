import { FetchHTTPClient } from '@/infra/clients'

function makeSut() {
  const fetchSpy = vi.spyOn(window, 'fetch')
  fetchSpy.mockImplementation(() => Promise.resolve({
    status: 200,
    json() {
      return {}
    }
  } as Response))
  const fakeURL = 'http://any-url.com'
  const sut = new FetchHTTPClient(fakeURL)

  return {
    sut,
    fetchSpy,
    fakeURL
  }
}

describe('FetchHTTPClient', () => {
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
        auth: 'any_token'
      },
      body: JSON.stringify({
        any: 'data'
      })
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
