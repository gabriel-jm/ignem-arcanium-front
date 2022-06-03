import { successResponse } from '@/presentation/helpers'
import { CheckTokenExistsPresenter } from '@/presentation/presenters'
import { mockCheckTokenExists, mockRouter } from '@/tests/helpers'

function makeSut() {
  const checkTokenExistsSpy = mockCheckTokenExists()
  const routerSpy = mockRouter()
  const sut = new CheckTokenExistsPresenter(checkTokenExistsSpy, routerSpy)

  return {
    sut,
    checkTokenExistsSpy,
    routerSpy
  }
}

describe('CheckTokenExistsPresenter', () => {
  it('should call CheckTokenExists with correct values', async () => {
    const { sut, checkTokenExistsSpy } = makeSut()

    await sut.handle()

    expect(checkTokenExistsSpy.check).toHaveBeenCalledWith()
  })

  it('should call Router if CheckTokenExists returns true', async () => {
    const { sut, routerSpy } = makeSut()

    await sut.handle()

    expect(routerSpy.navigate).toHaveBeenCalledWith('/home')
  })

  it('should return an empty success response', async () => {
    const { sut } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual(successResponse(null))
  })
})
