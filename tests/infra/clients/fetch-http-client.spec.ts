import { FetchHTTPClient } from '@/infra/clients'

function makeSut() {
  const fetchSpy = vi.spyOn(window, 'fetch')
  fetchSpy.mockImplementation(() => Promise.resolve({
    json() {}
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
      method: 'get',
      path: '/'
    })

    expect(fetchSpy).toHaveBeenCalledWith(`${fakeURL}/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })
  })
})
