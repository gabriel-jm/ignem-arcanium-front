import { FindAllTorchRegistries } from '@/domain/use-cases'
import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'

export class FindAllTorchRegistriesPresenter implements Presenter {
  constructor(private readonly findAllTorchRegistries: FindAllTorchRegistries) {}

  async handle(): Promise<PresenterResult<unknown>> {
    const torchRegistries = await this.findAllTorchRegistries.findAll()

    return successResponse(torchRegistries)
  }
}
