import { validationErrorResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { validatorFacade } from '@/validation/facades'

export class ValidationPresenterDecorator implements Presenter {
  constructor(
    private readonly presenter: Presenter,
    private readonly validationSchema: Record<string, Record<string, unknown>>
  ) {}

  async handle(data?: unknown) {
    const validator = validatorFacade(this.validationSchema)
    const validationErrors = validator(data)

    if (validationErrors) {
      return validationErrorResponse(validationErrors)
    }

    return await this.presenter.handle(data)
  }
}
