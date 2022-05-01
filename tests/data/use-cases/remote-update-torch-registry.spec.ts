import { RemoteUpdateTorchRegistry } from '@/domain/use-cases'
import { mockUpdateTorchRegistryService } from '@/tests/helpers'

function makeSut() {
  const updateTorchRegistryServiceSpy = mockUpdateTorchRegistryService()
  const sut = new RemoteUpdateTorchRegistry(updateTorchRegistryServiceSpy)

  return {
    sut,
    updateTorchRegistryServiceSpy
  }
}

describe('RemoteUpdateTorchRegistry', () => {
  it('should call UpdateTorchRegistryServiceSpy with correct values', async () => {
    const { sut, updateTorchRegistryServiceSpy } = makeSut()

    await sut.update({
      id: 'any_id',
      isLit: true
    })

    expect(updateTorchRegistryServiceSpy.update).toHaveBeenCalledWith({
      id: 'any_id',
      isLit: true
    })
  })
})
