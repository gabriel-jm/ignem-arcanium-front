import { CreateTorchRegistry } from '@/domain/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'

interface CreateTorchRegistryPresenterParams {
  characterName: string
  torchCount: number
  torchCharge: number
}

export class CreateTorchRegistryPresenter implements Presenter {
  constructor(private readonly createTorchRegistry: CreateTorchRegistry) {}

  async handle(data: CreateTorchRegistryPresenterParams) {
    const torchRegistryData = {
      characterName: data.characterName,
      torchCount: data.torchCount,
      torchCharge: data.torchCharge,
    }

    const torchRegistryId = await this.createTorchRegistry.create(torchRegistryData)

    return successResponse({
      id: torchRegistryId,
      ...torchRegistryData,
      isLit: false
    })
  }

}
