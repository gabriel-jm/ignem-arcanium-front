import { HTTPServiceError } from '@/infra/errors'
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
  describe('create()', () => {
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
      const httpResponse = {
        statusCode: 400,
        body: {
          error: {
            details: ['any_error']
          }
        }
      }
      httpClientSpy.request.mockResolvedValueOnce(httpResponse)
  
      const promise = sut.create(dummyCreateParams)
  
      await expect(promise).rejects.toThrowError(new HTTPServiceError(
        httpResponse,
        'Internal error on creating an account'
      ))
    })
  })

  describe('login()', () => {
    const dummyLoginParams = {
      email: 'any@email.com',
      password: 'any_password'
    }

    it('should call HTTPClient with correct values', async () => {
      const { sut, httpClientSpy } = makeSut()
  
      await sut.login(dummyLoginParams)
  
      expect(httpClientSpy.request).toHaveBeenCalledWith({
        method: 'post',
        path: '/login',
        body: {
          email: 'any@email.com',
          password: 'any_password'
        }
      })
    })

    it('should throw a ServiceError with skip true if it is a user error', async () => {
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
  
      const promise = sut.login(dummyLoginParams)
  
      await expect(promise).rejects.toThrowError(new HTTPServiceError(
        httpResponse,
        'Error on login',
        true
      ))
    })

    it('should throw a ServiceError with skip false if it is a server error', async () => {
      const { sut, httpClientSpy } = makeSut()
      const httpResponse = {
        statusCode: 500,
        body: {
          error: {
            details: ['any_error']
          }
        }
      }
      httpClientSpy.request.mockResolvedValueOnce(httpResponse)
  
      const promise = sut.login(dummyLoginParams)
  
      await expect(promise).rejects.toThrowError(new HTTPServiceError(
        httpResponse,
        'Error on login',
        false
      ))
    })
  })

  describe('verify()', () => {
    const dummyVerifyParams = 'any_token'

    it('should call HTTPClient with correct values', async () => {
      const { sut, httpClientSpy } = makeSut()
  
      await sut.verify(dummyVerifyParams)
  
      expect(httpClientSpy.request).toHaveBeenCalledWith({
        method: 'post',
        path: '/verify',
        body: { token: dummyVerifyParams }
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
  
      const promise = sut.verify(dummyVerifyParams)
  
      await expect(promise).rejects.toThrowError(new HTTPServiceError(
        httpResponse,
        'Sorry we could not authenticate your user'
      ))
    })
  })
})
