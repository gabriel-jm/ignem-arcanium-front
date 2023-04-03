import { Presenter, PresenterResult } from '@/common/application/protocols/index.js'
import { successResponse } from './helpers/presenter-results.js'

export class GenericPresenter implements Presenter {
  constructor(private readonly usecaseFunction: (...args: any[]) => Promise<unknown>) {}
  
  async handle<T = any>(data?: unknown): Promise<PresenterResult<T>> {
    const response = await this.usecaseFunction(data)

    return successResponse(response)
  }
}
