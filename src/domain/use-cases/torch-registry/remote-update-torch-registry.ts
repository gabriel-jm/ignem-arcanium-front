import { UpdateTorchRegistryService } from '@/domain/protocols/services'
import { UpdateTorchRegistry, UpdateTorchRegistryParams } from '@/domain/protocols/use-cases'

export class RemoteUpdateTorchRegistry implements UpdateTorchRegistry {
  constructor(private readonly updateTorchRegistryService: UpdateTorchRegistryService) {}

  async update(params: UpdateTorchRegistryParams): Promise<void> {
    await this.updateTorchRegistryService.update({
      id: params.id,
      torchCharge: params.torchCharge,
      isLit: params.isLit
    })
  }

}
