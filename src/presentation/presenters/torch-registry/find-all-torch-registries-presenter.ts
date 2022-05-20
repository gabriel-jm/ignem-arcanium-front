import { FindAllTorchRegistries } from '@/domain/protocols/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'

export class FindAllTorchRegistriesPresenter implements Presenter {
  constructor(private readonly findAllTorchRegistries: FindAllTorchRegistries) {}

  async handle() {
    const torchRegistries = await this.findAllTorchRegistries.findAll()

    return successResponse(torchRegistries)
  }
}
