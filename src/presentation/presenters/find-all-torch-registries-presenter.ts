import { FindAllTorchRegistries } from '@/domain/use-cases'
import { Presenter, PresenterResult } from '@/presentation/protocols'

export class FindAllTorchRegistriesPresenter implements Presenter {
  constructor(private readonly findAllTorchRegistries: FindAllTorchRegistries) {}

  async handle(): Promise<PresenterResult<unknown>> {
    await this.findAllTorchRegistries.findAll()

    return {} as PresenterResult
  }
}
