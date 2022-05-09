import { successResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'

export class GenericPresenter implements Presenter {
  constructor(private readonly usecaseFunction: (...args: any[]) => Promise<unknown>) {}
  
  async handle<T = any>(data?: unknown): Promise<PresenterResult<T>> {
    const response = await this.usecaseFunction(data)

    return successResponse(response)
  }
}
