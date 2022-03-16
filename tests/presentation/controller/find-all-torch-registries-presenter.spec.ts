import { FindAllTorchRegistriesPresenter } from '@/presentation/presenters'
import { mockFindAllTorchRegistries } from '@/tests/helpers'

function makeSut() {
  const findAllTorchRegistriesSpy = mockFindAllTorchRegistries()
  const sut = new FindAllTorchRegistriesPresenter(findAllTorchRegistriesSpy)

  return {
    sut,
    findAllTorchRegistriesSpy
  }
}

describe('FindAllTorchRegistriesPresenter', () => {
  it('should call FindAllTorchRegistries with correct values', async () => {
    const { sut, findAllTorchRegistriesSpy } = makeSut()

    await sut.handle()

    expect(findAllTorchRegistriesSpy.findAll).toHaveBeenCalledWith()
  })
})
