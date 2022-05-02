import { IgnemRoot } from '@/ui/view'
import { router } from 'lithen-router'

function makeSut() {
  const matchRoute = vi.spyOn(router, 'matchRoute')
  const dummyDiv = document.createElement('div')
  matchRoute.mockImplementation(() => {
    return () => dummyDiv
  })
  
  const routerSpy = {
    onNavigate: vi.spyOn(router, 'onNavigate'),
    matchRoute
  }
  const sut = new IgnemRoot()

  return {
    sut,
    routerSpy,
    dummyDiv
  }
}

describe('IgnemRoot', () => {
  it('should call router.onNavigate and router.matchRoute on window load', () => {
    const { routerSpy } = makeSut()

    window.dispatchEvent(new Event('load'))

    expect(routerSpy.onNavigate).toHaveBeenCalledWith(expect.any(Function))
    expect(routerSpy.matchRoute).toHaveBeenCalledWith()
  })

  it('should call appendChild if RootPage has no child element', () => {
    const { sut, dummyDiv } = makeSut()
    const appendChildSpy = vi.spyOn(sut.root, 'appendChild')

    window.dispatchEvent(new Event('load'))

    expect(appendChildSpy).toHaveBeenCalledWith(dummyDiv)
  })
})
