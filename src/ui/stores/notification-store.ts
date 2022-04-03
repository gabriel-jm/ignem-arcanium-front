import { SuccessNotificationStore, WarningNotificationStore } from '@/ui/protocols'
import { IgnemNotification } from '@/ui/view'

export class NotificationStore implements WarningNotificationStore, SuccessNotificationStore {
  static #instance: NotificationStore
  
  constructor() {
    if (!NotificationStore.#instance) {
      NotificationStore.#instance = this
    }

    return NotificationStore.#instance
  }

  notify(label: string, message: string): void {
    document.body.append(new IgnemNotification({
      label,
      message,
      type: 'success'
    }))
  }

  warn(label: string, message: string) {
    document.body.append(new IgnemNotification({
      label,
      message,
      type: 'warning'
    }))
  }
}
