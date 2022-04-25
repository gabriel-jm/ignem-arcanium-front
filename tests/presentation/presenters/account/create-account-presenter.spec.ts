import { successResponse } from '@/presentation/helpers'
import { CreateAccountPresenter } from '@/presentation/presenters'
import { mockCreateAccount } from '@/tests/helpers'

function makeSut() {
  const createAccountSpy = mockCreateAccount()
  const sut = new CreateAccountPresenter(createAccountSpy)

  return {
    sut,
    createAccountSpy
  }
}

describe('CreateAccountPresenter', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }
  
  it('should call CreateAccount use case with correct values', async () => {
    const { sut, createAccountSpy } = makeSut()

    await sut.handle(dummyCreateParams)

    expect(createAccountSpy.create).toHaveBeenCalledWith(dummyCreateParams)
  })

  it('should return an ok response on success', async () => {
    const { sut, createAccountSpy } = makeSut()

    const response = await sut.handle(dummyCreateParams)

    expect(response).toEqual(successResponse(createAccountSpy.result))
  })
})
