import { failureResponse } from '@/presentation/helpers/index.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { WarningNotifier } from '@/ui/protocols/index.js'

export class ErrorHandlingPresenterDecorator implements Presenter {
  constructor(
    private readonly warnNotificationStore: WarningNotifier,
    private readonly presenter: Presenter
  ) {}

  async handle(data?: unknown) {
    try {
      const result = await this.presenter.handle(data)

      return result
    } catch(err) {
      const error = err as Error & { skipNotification?: boolean }
      const message = error.message || 'Internal error. Try again later!'

      if (!error.skipNotification) {
        this.warnNotificationStore.notifyWarning('Error', message)
      }

      return failureResponse({ errorMessage: message, error })
    }
  }
}
