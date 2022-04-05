import { SuccessNotifier, WarningNotifier } from '@/ui/protocols'
import { IgnemNotification, IgnemNotificationContainerElement } from '@/ui/view'

export class UiNotifier implements WarningNotifier, SuccessNotifier {
  #container: IgnemNotificationContainerElement = document.querySelector(
    'ignem-notification-container'
  )!

  notifySuccess(label: string, message: string): void {
    this.#container.addNotification(new IgnemNotification({
      label,
      message,
      type: 'success'
    }))
  }

  notifyWarning(label: string, message: string) {
    this.#container.addNotification(new IgnemNotification({
      label,
      message,
      type: 'warning'
    }))
  }
}
