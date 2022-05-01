import { RemoteCreateTorchRegistry } from '@/domain/use-cases'
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

  it('should return the create torch registry id on success', async () => {
    const { sut, createTorchRegistryServiceSpy } = makeSut()

    const response = await sut.create({
      characterName: 'any_character_name',
      torchCount: 2,
      torchCharge: 2
    })

    expect(response).toBe(createTorchRegistryServiceSpy.result)
  })
})
