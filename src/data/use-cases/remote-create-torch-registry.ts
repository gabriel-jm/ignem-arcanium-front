import { CreateTorchRegistryService } from '@/data/protocols'
import { CreateTorchRegistry, CreateTorchRegistryParams } from '@/domain/use-cases'

export class RemoteCreateTorchRegistry implements CreateTorchRegistry {
  constructor(private readonly createTorchRegistryService: CreateTorchRegistryService) {}
  
  async create(params: CreateTorchRegistryParams) {
    await this.createTorchRegistryService.create({
      characterName: params.characterName,
      torchCount: params.torchCount,
      torchCharge: params.torchCharge
    })

    return ''
  }
}
