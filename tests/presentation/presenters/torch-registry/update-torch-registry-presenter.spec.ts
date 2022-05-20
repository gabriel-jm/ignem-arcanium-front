import { successResponse } from '@/presentation/helpers'
import { UpdateTorchRegistryPresenter } from '@/presentation/presenters'
import { mockUpdateTorchRegistry } from '@/tests/helpers'

function makeSut() {
  const updateTorchRegistrySpy = mockUpdateTorchRegistry()
  const sut =  new UpdateTorchRegistryPresenter(updateTorchRegistrySpy)

  return {
    sut,
    updateTorchRegistrySpy
  }
}

describe('UpdateTorchRegistryPresenter', () => {
  it('should call UpdateTorchRegistry with correct values', async () => {
    const { sut, updateTorchRegistrySpy } = makeSut()

    await sut.handle({
      id: 'any_id',
      isLit: true
    })
    
    expect(updateTorchRegistrySpy.update).toHaveBeenCalledWith({
      id: 'any_id',
      isLit: true
    })
  })

  it('should return null on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ id: 'any_id' })

    expect(response).toEqual(successResponse(null))
  })
})
