import { LithenRouterAdapter } from '@/ui/routers'
import { router } from 'lithen-router'

function makeSut() {
  const goToSpy = vi.spyOn(router, 'goTo')
  const sut = new LithenRouterAdapter()

  return {
    sut,
    goToSpy
  }
}

describe('LithenRouterAdapter', () => {
  it('should call LithenRouter.goTo with correct values', () => {
    const { sut, goToSpy } = makeSut()

    sut.navigate('/path')

    expect(goToSpy).toHaveBeenCalledWith('/path')
  })
})
