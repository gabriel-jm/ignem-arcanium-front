import { checkCircleIcon, IgnemElement } from '@/presentation/view'
import { html } from 'lithen-tag-functions'
import { notificationStyles } from './notification-styles'

interface IgnemNotificationProps {
  title?: string
  message?: string
}

export class IgnemNotification extends IgnemElement {  
  #timeoutId: number | null = null

  constructor(props: IgnemNotificationProps = {}) {
    super()
    props.title && this.setAttribute('title', props.title)
    props.message && this.setAttribute('message', props.message)
  }

  hide = () => {
    this.classList.add('hide')
  }
  
  styling() {
    return notificationStyles
  }
  
  render() {
    this.on('animationend', (event: AnimationEventInit) => {
      if (event.animationName === 'hide') {
        this.remove()
      }

      if (event.animationName === 'show') {
        const twoSecondsInMs = 2000
        this.#timeoutId = Number(setTimeout(this.hide, twoSecondsInMs))
      }
    })

    this.on('mouseenter', () => {
      this.#timeoutId && clearTimeout(this.#timeoutId)
      this.#timeoutId = null
    })

    this.on('mouseleave', () => {
      !this.#timeoutId && setTimeout(this.hide, 800)
    })

    const title = this.getAttribute('title') ?? 'Unknown'
    const message = this.getAttribute('message') ?? 'Unknown message'

    return html`
      <div class="notification-container">
        ${checkCircleIcon()}
        <div class="notification-content">
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
        <span on-click=${() => this.hide()}>&times;</span>
      </div>
    `
  }
}

customElements.define('ignem-notification', IgnemNotification)
