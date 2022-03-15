import { RootPage } from '@/ui/view'
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

  it('should call replaceChild if RootPage has a child element', () => {
    const { sut, routerSpy } = makeSut()
    const span = document.createElement('span')
    const replaceChildSpy = vi.spyOn(sut.root, 'replaceChild')
    sut.root.append(span)

    window.dispatchEvent(new Event('load'))

    expect(replaceChildSpy).toHaveBeenCalledWith(
      routerSpy.matchRoute.mock.results[0].value,
      span
    )
  })

  it('should call appendChild if RootPage has no child element', () => {
    const { sut, routerSpy } = makeSut()
    const appendChildSpy = vi.spyOn(sut.root, 'appendChild')

    window.dispatchEvent(new Event('load'))

    expect(appendChildSpy).toHaveBeenCalledWith(routerSpy.matchRoute.mock.results[0].value)
  })
})
