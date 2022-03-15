import { Presenter, PresenterResult } from '@/presentation/protocols'
import { WarningNotificationStore } from '@/ui/protocols'

export class ErrorHandlingPresenterDecorator implements Presenter {
  constructor(
    private readonly warnNotificationStore: WarningNotificationStore,
    private readonly presenter: Presenter
  ) {}
  
  async handle(data?: unknown): Promise<PresenterResult<unknown>> {
    try {
      const result = await this.presenter.handle(data)

      return result
    } catch(err) {
      const error = err as Error
      this.warnNotificationStore.warn('Error', error.message ?? 'Unknown error')

      return {
        ok: false,
        data: null,
        validationErrors: null
      }
    }
  }
}
