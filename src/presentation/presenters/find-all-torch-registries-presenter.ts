import { FindAllTorchRegistries } from '@/domain/use-cases'
import { Presenter, PresenterResult } from '@/presentation/protocols'

export class FindAllTorchRegistriesPresenter implements Presenter {
  constructor(private readonly findAllTorchRegistries: FindAllTorchRegistries) {}

  async handle(): Promise<PresenterResult<unknown>> {
    const torchRegistries = await this.findAllTorchRegistries.findAll()

    return {
      ok: true,
      data: torchRegistries,
      validationErrors: null
    }
  }
}
