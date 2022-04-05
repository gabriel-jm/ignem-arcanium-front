import { validationErrorResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { Validator } from '@/validation/protocols'

export class ValidationPresenterDecorator implements Presenter {
  constructor(
    private readonly presenter: Presenter,
    private readonly validator: Validator
  ) {}

  async handle(data?: unknown) {
    const validationErrors = this.validator.validate(data)

    if (validationErrors) {
      return validationErrorResponse(validationErrors)
    }

    return await this.presenter.handle(data)
  }
}
