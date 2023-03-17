import { IgnemElement, IgnemNotification } from '@/ui/view'
import { css, el } from 'lithen-fns'

export interface IgnemNotificationContainerElement extends IgnemElement {
  addNotification(notificationElement: IgnemNotification): void
}

export class IgnemNotificationContainer extends IgnemElement {
  addNotification(notificationElement: IgnemNotification) {
    this.select('div')?.append(notificationElement)
  }
  
  styling() {
    return css`
      :host {
        display: block;
        position: fixed;
        top: 10px;
        right: 10px;
        max-width: 400px;
        z-index: 10;
      }

      div {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    `
  }

  render() {
    return el/*html*/`<div></div>` as Element
  }
}

customElements.define('ignem-notification-container', IgnemNotificationContainer)
