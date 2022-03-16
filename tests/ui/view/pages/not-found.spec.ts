import { IgnemNotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

function makeSut() {
  const sut = new IgnemNotFoundPage()
  const routerSpy = {
    goTo: vi.spyOn(router, 'goTo')
  }

  return {
    sut,
    routerSpy
  }
}

describe('IgnemNotFoundPage', () => {
  it('should call router.goTo on button click', () => {
    const { sut, routerSpy } = makeSut()

    sut.select('button')!.dispatchEvent(new Event('click'))

    expect(routerSpy.goTo).toHaveBeenCalledWith('/')
  })
})
