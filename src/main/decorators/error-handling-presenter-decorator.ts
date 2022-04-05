import { failureResponse } from '@/presentation/helpers'
import { Presenter, PresenterResult } from '@/presentation/protocols'
import { WarningNotifier } from '@/ui/protocols'

export class ErrorHandlingPresenterDecorator implements Presenter {
  constructor(
    private readonly warnNotificationStore: WarningNotifier,
    private readonly presenter: Presenter
  ) {}
  
  async handle(data?: unknown): Promise<PresenterResult<unknown>> {
    try {
      const result = await this.presenter.handle(data)

      return result
    } catch(err) {
      const error = err as Error
      const message = error.message || 'Internal error. Try again later!'

      this.warnNotificationStore.notifyWarning('Error', message)

      return failureResponse({ errorMessage: message })
    }
  }
}
