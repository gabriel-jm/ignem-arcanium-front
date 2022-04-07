import { UpdateTorchRegistryService } from '@/data/protocols'
import { UpdateTorchRegistry, UpdateTorchRegistryParams } from '@/domain/use-cases'

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
