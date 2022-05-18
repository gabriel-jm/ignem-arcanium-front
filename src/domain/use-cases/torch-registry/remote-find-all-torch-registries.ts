import { FindAllTorchRegistriesService } from '@/domain/protocols/services'
import { FindAllTorchRegistries, FindAllTorchRegistriesResult } from '@/domain/protocols/use-cases'

export class RemoteFindAllTorchRegistries implements FindAllTorchRegistries {
  constructor(private readonly findAllTorchRegistriesService: FindAllTorchRegistriesService) {}

  async findAll(): Promise<FindAllTorchRegistriesResult[]> {
    const torchRegistries = await this.findAllTorchRegistriesService.findAll()
    
    return torchRegistries
  }
}
