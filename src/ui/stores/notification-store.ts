import { IgnemNotification } from '@/ui/view'

export interface WarningNotificationParams {
  label: string
  message: string
}

export class NotificationStore {
  static #instance: NotificationStore
  
  constructor() {
    if (!NotificationStore.#instance) {
      NotificationStore.#instance = this
    }

    return NotificationStore.#instance
  }

  warn(warningData: WarningNotificationParams) {
    document.body.append(new IgnemNotification({
      label: warningData.label,
      message: warningData.message,
      type: 'warning'
    }))
  }
}
