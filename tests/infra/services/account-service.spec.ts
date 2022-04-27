import { ServiceError } from '@/infra/errors'
import { AccountService } from '@/infra/services/account-service'

function makeSut() {
  const httpClientSpy = {
    request: vi.fn(() => Promise.resolve({
      statusCode: 200,
      body: { accountId: 'any_account_id' } as any
    }))
  }
  const sut = new AccountService(httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('AccountService', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call HTTPClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      method: 'post',
      path: '/accounts',
      body: {
        name: 'any_name',
        email: 'any@email.com',
        password: 'any_password'
      }
    })
  })

  it('should throw a ServiceError if statusCode from response is greater or equal to 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.request.mockResolvedValueOnce({
      statusCode: 400,
      body: {
        error: 'any_error'
      }
    })

    const promise = sut.create(dummyCreateParams)

    await expect(promise).rejects.toThrowError(new ServiceError(
      { error: 'any_error' },
      'Internal error on creating an account'
    ))
  })
})
