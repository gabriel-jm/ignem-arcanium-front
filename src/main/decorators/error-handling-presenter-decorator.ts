import { failureResponse } from '@/common/application/helpers/index.js'
import { Presenter } from '@/common/application/protocols/index.js'
import { router } from '../config/routes.js'
import { AuthenticationError } from '@/common/infra/errors/authentication-error.js'

type AppError = Error & {
  skipNotification?: boolean
  type?: string
}

export class ErrorHandlingPresenterDecorator implements Presenter {
  constructor(
    private readonly presenter: Presenter
  ) {}

  async handle(data?: unknown) {
    try {
      const result = await this.presenter.handle(data)

      return result
    } catch(err) {
      const error = err as AppError
      const message = error.message || 'Internal error. Try again later!'

      if (err instanceof AuthenticationError) {
        router.navigate('/login')
      }

      if (!error.skipNotification) {
        const { UiNotifier } = await import('@/common/ui/components/index.js')
        
        const notifier = new UiNotifier()
        notifier.notifyWarning('Error', message)
      }

      return failureResponse({ errorMessage: message, error })
    }
  }
}
