import { UpdateTorchRegistry } from '@/domain/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'

interface UpdateTorchRegistryPresenterParams {
  id: string
  torchCharge?: string | number
  isLit?: boolean
}

export class UpdateTorchRegistryPresenter implements Presenter {
  constructor(private readonly updateTorchRegistry: UpdateTorchRegistry) {}
  
  async handle<T = any>(data: UpdateTorchRegistryPresenterParams): Promise<PresenterResult<T>> {
    await this.updateTorchRegistry.update({
      id: data.id,
      torchCharge: data.torchCharge,
      isLit: data.isLit
    })
  
    return successResponse(null)
  }
}
