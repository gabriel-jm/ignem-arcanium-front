import { CreateTorchRegistry } from '@/domain/use-cases'
import { Presenter, PresenterResult } from '@/presentation/protocols'

interface CreateTorchRegistryPresenterParams {
  characterName: string
  torchCount: number
  torchCharge: number
}

export class CreateTorchRegistryPresenter implements Presenter {
  constructor(private readonly createTorchRegistry: CreateTorchRegistry) {}

  async handle(data: CreateTorchRegistryPresenterParams) {
    await this.createTorchRegistry.create({
      characterName: data.characterName,
      torchCount: data.torchCount,
      torchCharge: data.torchCharge,
    })

    return {} as PresenterResult
  }

}
