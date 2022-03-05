import { FindAllTorchRegistriesService } from '@/data/protocols'
import { FindAllTorchRegistries, FindAllTorchRegistriesResult } from '@/domain/use-cases'

export class RemoteFindAllTorchRegistries implements FindAllTorchRegistries {
  constructor(private readonly findAllTorchRegistriesService: FindAllTorchRegistriesService) {}

  async findAll(): Promise<FindAllTorchRegistriesResult[]> {
    await this.findAllTorchRegistriesService.findAll()
    
    return []
  }
}
