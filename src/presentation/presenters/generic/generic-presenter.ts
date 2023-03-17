import { successResponse } from '@/presentation/helpers/presenter-results.js'
import { Presenter, PresenterResult } from '@/presentation/protocols/index.js'

export class GenericPresenter implements Presenter {
  constructor(private readonly usecaseFunction: (...args: any[]) => Promise<unknown>) {}
  
  async handle<T = any>(data?: unknown): Promise<PresenterResult<T>> {
    const response = await this.usecaseFunction(data)

    return successResponse(response)
  }
}
