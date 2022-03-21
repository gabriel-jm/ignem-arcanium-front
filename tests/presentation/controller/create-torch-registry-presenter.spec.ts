import { CreateTorchRegistryPresenter } from '@/presentation/presenters'
import { mockCreateTorchRegistry } from '@/tests/helpers'

function makeSut() {
  const createTorchRegistrySpy = mockCreateTorchRegistry()
  const sut = new CreateTorchRegistryPresenter(createTorchRegistrySpy)

  return {
    sut,
    createTorchRegistrySpy
  }
}

describe('CreateTorchRegistryPresenter', () => {
  it('should call CreateTorchRegistry with correct values', async () => {
    const { sut, createTorchRegistrySpy } = makeSut()
    const createParams = {
      characterName: 'any_name',
      torchCount: 1,
      torchCharge: 3,
    }

    await sut.handle(createParams)

    expect(createTorchRegistrySpy.create).toHaveBeenCalledWith(createParams)
  })
})
