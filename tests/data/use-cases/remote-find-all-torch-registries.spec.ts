import { RemoteFindAllTorchRegistries } from '@/domain/use-cases'
import { mockFindAllTorchRegistriesService } from '@/tests/helpers'

function makeSut() {
  const findAllTorchRegistriesServiceSpy = mockFindAllTorchRegistriesService()
  const sut = new RemoteFindAllTorchRegistries(findAllTorchRegistriesServiceSpy)

  return {
    sut,
    findAllTorchRegistriesServiceSpy
  }
}

describe('RemoteFindAllTorchRegistries', () => {
  it('should call FindAllTorchRegistriesService with correct values', async () => {
    const { sut, findAllTorchRegistriesServiceSpy } = makeSut()

    await sut.findAll()

    expect(findAllTorchRegistriesServiceSpy.findAll).toHaveBeenCalledWith()
  })

  it('should return a list the found torch registries on success', async () => {
    const { sut, findAllTorchRegistriesServiceSpy } = makeSut()

    const response = await sut.findAll()

    expect(response).toEqual(findAllTorchRegistriesServiceSpy.result)
  })
})
