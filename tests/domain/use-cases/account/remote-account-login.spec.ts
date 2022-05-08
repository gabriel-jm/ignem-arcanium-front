import { RemoteAccountLogin } from '@/domain/use-cases'
import { mockAccountLoginService } from '@/tests/helpers'

function makeSut() {
  const accountLoginServiceSpy = mockAccountLoginService()
  const sut = new RemoteAccountLogin(accountLoginServiceSpy)

  return {
    sut,
    accountLoginServiceSpy
  }
}

describe('RemoteAccountLogin', () => {
  const dummyLoginParams = {
    email: 'any@email.com',
    password: 'any_password'
  }

  it('should call AccountLoginService with correct values', async () => {
    const { sut, accountLoginServiceSpy } = makeSut()

    await sut.login(dummyLoginParams)

    expect(accountLoginServiceSpy.login).toHaveBeenCalledWith({
      email: dummyLoginParams.email,
      password: dummyLoginParams.password
    })
  })
})
