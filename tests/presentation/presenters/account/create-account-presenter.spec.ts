import { successResponse } from '@/presentation/helpers'
import { CreateAccountPresenter } from '@/presentation/presenters'
import { mockCreateAccount, mockSetAccountStore } from '@/tests/helpers'

function makeSut() {
  const createAccountSpy = mockCreateAccount()
  const setAccountStoreSpy = mockSetAccountStore()
  const sut = new CreateAccountPresenter(createAccountSpy, setAccountStoreSpy)

  return {
    sut,
    createAccountSpy,
    setAccountStoreSpy
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

  it('should call SetAccountStore with correct values', async () => {
    const { sut, createAccountSpy, setAccountStoreSpy } = makeSut()

    await sut.handle(dummyCreateParams)

    expect(setAccountStoreSpy.setAccountValue).toEqual({
      name: createAccountSpy.result.name
    })
  })

  it('should return an ok response on success', async () => {
    const { sut, createAccountSpy } = makeSut()

    const response = await sut.handle(dummyCreateParams)

    expect(response).toEqual(successResponse(createAccountSpy.result))
  })
})
