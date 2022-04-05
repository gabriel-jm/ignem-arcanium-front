import { SuccessNotifier, WarningNotifier } from '@/ui/protocols'
import { IgnemNotification } from '@/ui/view'

export class UiNotifier implements WarningNotifier, SuccessNotifier {
  notifySuccess(label: string, message: string): void {
    document.body.append(new IgnemNotification({
      label,
      message,
      type: 'success'
    }))
  }

  notifyWarning(label: string, message: string) {
    document.body.append(new IgnemNotification({
      label,
      message,
      type: 'warning'
    }))
  }
}
