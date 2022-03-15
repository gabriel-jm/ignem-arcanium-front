import { WarningNotificationStore } from '@/ui/protocols'
import { IgnemNotification } from '@/ui/view'

export class NotificationStore implements WarningNotificationStore {
  static #instance: NotificationStore
  
  constructor() {
    if (!NotificationStore.#instance) {
      NotificationStore.#instance = this
    }

    return NotificationStore.#instance
  }

  warn(label: string, message: string) {
    document.body.append(new IgnemNotification({
      label,
      message,
      type: 'warning'
    }))
  }
}
