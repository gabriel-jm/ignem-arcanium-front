import { RemoteCreateTorchRegistry } from '@/data/use-cases'
import { mockCreateTorchRegistryService } from '@/tests/helpers'

function makeSut() {
  const createTorchRegistryServiceSpy = mockCreateTorchRegistryService()
  const sut = new RemoteCreateTorchRegistry(createTorchRegistryServiceSpy)

  return {
    sut,
    createTorchRegistryServiceSpy
  }
}

describe('RemoteCreateTorchRegistry', () => {
  it('should call CreateTorchRegistryService with correct values', async () => {
    const { sut, createTorchRegistryServiceSpy } = makeSut()

    await sut.create({
      characterName: 'any_character_name',
      torchCount: 2,
      torchCharge: 2
    })

    expect(createTorchRegistryServiceSpy.create).toHaveBeenCalledWith({
      characterName: 'any_character_name',
      torchCount: 2,
      torchCharge: 2
    })
  })
})
