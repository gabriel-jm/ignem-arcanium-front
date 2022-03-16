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

  it('should return a success response with the torch registries list', async () => {
    const { sut, findAllTorchRegistriesSpy } = makeSut()

    const response = await sut.handle()

    expect(response).toEqual({
      ok: true,
      data: findAllTorchRegistriesSpy.result,
      validationErrors: null
    })
  })
})
