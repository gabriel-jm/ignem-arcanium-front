import { checkCircleIcon, IgnemElement } from '@/presentation/view'
import { css, html } from 'lithen-tag-functions'

export class IgnemNotification extends IgnemElement {
  styling() {
    return css`
      .notification-container {
        display: block;
        width: 200px;
        border: 1px solid #111;
        border-radius: 4px;
        padding: 12px 16px;
      }
    `
  }
  
  render() {
    return html`
      <div class="notification-container">
        ${checkCircleIcon()}
        <p>Example text</p>
      </div>
    `
  }
}

customElements.define('ignem-notification', IgnemNotification)
