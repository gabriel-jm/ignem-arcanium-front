import { RootPage } from '@/presentation/view'
import { router } from 'lithen-router'

function makeSut() {
  const matchRoute = vi.spyOn(router, 'matchRoute')
  matchRoute.mockImplementation(() => document.createElement('div'))
  
  const routerSpy = {
    onNavigate: vi.spyOn(router, 'onNavigate'),
    matchRoute
  }
  const sut = new RootPage()

  return {
    sut,
    routerSpy
  }
}

describe('RootPage', () => {
  it('should call router.onNavigate and router.matchRoute on window load', () => {
    const { routerSpy } = makeSut()

    window.dispatchEvent(new Event('load'))

    expect(routerSpy.onNavigate).toHaveBeenCalledWith(expect.any(Function))
    expect(routerSpy.matchRoute).toHaveBeenCalledWith()
  })
})
