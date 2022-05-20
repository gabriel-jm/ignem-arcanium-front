import { VerifyTokenPresenter } from '@/presentation/presenters'
import { mockRouter, mockVerifyToken } from '@/tests/helpers'

function makeSut() {
  const verifyTokenSpy = mockVerifyToken()
  const routerSpy = mockRouter()
  const sut = new VerifyTokenPresenter(verifyTokenSpy, routerSpy)

  return {
    sut,
    verifyTokenSpy,
    routerSpy
  }
}

describe('VerifyTokenPresenter', () => {
  it('should call VerifyToken with correct values', async () => {
    const { sut, verifyTokenSpy } = makeSut()

    await sut.handle()

    expect(verifyTokenSpy.verify).toHaveBeenCalledWith()
  })

  it('should navigate to login page if VerifyToken throws an error', async () => {
    const { sut, verifyTokenSpy, routerSpy } = makeSut()
    verifyTokenSpy.verify.mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.handle()

    await expect(promise).rejects.toThrowError(new Error())
    expect(routerSpy.navigate).toHaveBeenCalledWith('/login')
  })
})
