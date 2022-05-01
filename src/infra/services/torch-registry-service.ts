import {
  CreateTorchRegistryServiceParams,
  FindAllTorchRegistriesService,
  FindAllTorchRegistriesServiceResult,
  UpdateTorchRegistryServiceParams
} from '@/domain/protocols'
import { SendMessageClient } from '@/infra/protocols'

export class TorchRegistryService implements FindAllTorchRegistriesService {
  constructor(
    private readonly sendMessageClient: SendMessageClient
  ) {}
  
  async findAll(): Promise<FindAllTorchRegistriesServiceResult[]> {
    const torchRegistries = await this.sendMessageClient
      .sendMessage<FindAllTorchRegistriesServiceResult[]>({
        event: 'find-all-torch-registries',
        responseEvent: 'find-all-torch-registries-response',
        errorMessage: 'Internal error on searching for torch registries'
      })

    return torchRegistries.data
  }

  async create(params: CreateTorchRegistryServiceParams): Promise<string> {
    const torchRegistry = await this.sendMessageClient.sendMessage<Record<'id', string>>({
      event: 'create-torch-registry',
      responseEvent: 'create-torch-registry-response',
      errorMessage: 'Internal error on creating a torch registry',
      data: {
        characterName: params.characterName,
        torchCount: params.torchCount,
        torchCharge: params.torchCharge,
        isLit: false
      }
    })

    return torchRegistry.data.id
  }

  async update(params: UpdateTorchRegistryServiceParams) {
    await this.sendMessageClient.sendMessage({
      event: 'update-torch-registry',
      responseEvent: 'update-torch-registry-response',
      errorMessage: 'Internal error on update torch registry',
      data: {
        id: params.id,
        ...params.torchCharge && { torchCharge: params.torchCharge },
        ...params.isLit && { isLit: params.isLit }
      }
    })
  }
}
