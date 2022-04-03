import { successResponse } from '@/presentation/helpers'
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
  const dummyCreateParams = {
    characterName: 'any_name',
    torchCount: 1,
    torchCharge: 3,
  }

  it('should call CreateTorchRegistry with correct values', async () => {
    const { sut, createTorchRegistrySpy } = makeSut()

    await sut.handle(dummyCreateParams)

    expect(createTorchRegistrySpy.create).toHaveBeenCalledWith(dummyCreateParams)
  })

  it('should return the torch registry data with the id on success', async () => {
    const { sut, createTorchRegistrySpy } = makeSut()

    const response = await sut.handle(dummyCreateParams)

    expect(response).toEqual(successResponse({
      id: createTorchRegistrySpy.result,
      ...dummyCreateParams
    }))
  })
})
