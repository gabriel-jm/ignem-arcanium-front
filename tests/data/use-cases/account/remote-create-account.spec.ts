import { RemoteCreateAccount } from '@/data/use-cases'
import { mockCreateAccountService } from '@/tests/helpers'

function makeSut() {
  const createAccountServiceSpy = mockCreateAccountService()
  const sut = new RemoteCreateAccount(createAccountServiceSpy)

  return {
    sut,
    createAccountServiceSpy
  }
}

describe('RemoteCreateAccount', () => {
  const dummyCreateParams = {
    name: 'any_name',
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call CreateAccountService with correct values', async () => {
    const { sut, createAccountServiceSpy } = makeSut()

    await sut.create(dummyCreateParams)

    expect(createAccountServiceSpy.create).toHaveBeenCalledWith({
      name: dummyCreateParams.name,
      email: dummyCreateParams.email,
      password: dummyCreateParams.password
    })
  })
})
