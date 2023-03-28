import { SuccessNotifier, WarningNotifier } from '@/ui/protocols/index.js'
import { IgnemNotificationContainerElement } from './notification-container.js'
import { IgnemNotification } from './notification.js'

export class UiNotifier implements WarningNotifier, SuccessNotifier {
  #container: IgnemNotificationContainerElement = document.querySelector(
    'ignem-notification-container'
  )!

  notifySuccess(label: string, message: string) {
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
