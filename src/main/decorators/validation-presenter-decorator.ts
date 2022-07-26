import { validationErrorResponse } from '@/presentation/helpers'
import { Presenter } from '@/presentation/protocols'
import { createValidator } from '@/validation/facades'

export class ValidationPresenterDecorator implements Presenter {
  private readonly validator: (input: unknown) => any
  
  constructor(
    private readonly presenter: Presenter,
    validationSchema: Record<string, Record<string, unknown>>
  ) {
    this.validator = createValidator(validationSchema)
  }

  async handle(data?: unknown) {
    const validationErrors = this.validator(data)

    if (validationErrors) {
      return validationErrorResponse(validationErrors)
    }

    return await this.presenter.handle(data)
  }
}
