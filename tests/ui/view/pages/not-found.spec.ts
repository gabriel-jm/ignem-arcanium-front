import { NotFoundPage } from '@/ui/view'
import { router } from 'lithen-router'

function makeSut() {
  const sut = new NotFoundPage()
  const routerSpy = {
    goTo: vi.spyOn(router, 'goTo')
  }

  return {
    sut,
    routerSpy
  }
}

describe('NotFoundPage', () => {
  it('should call router.goTo on button click', () => {
    const { sut, routerSpy } = makeSut()

    sut.select('button')!.dispatchEvent(new Event('click'))

    expect(routerSpy.goTo).toHaveBeenCalledWith('/')
  })
})
