import { alertIcon, checkCircleIcon, IgnemElement } from '@/presentation/view'
import { html } from 'lithen-tag-functions'
import { notificationStyles } from './notification-styles'

interface IgnemNotificationProps {
  label?: string
  message?: string
  type?: string
}

export class IgnemNotification extends IgnemElement {  
  #timeoutId: number | null = null
  #mouseIsOver = false
  #availableTypes = ['success', 'warning']

  constructor(props: IgnemNotificationProps = {}) {
    super()
    props.label && this.setAttribute('label', props.label)
    props.message && this.setAttribute('message', props.message)
    props.type && this.setAttribute('type', props.type)
    this.#colorize()
    this.applyRender()
  }

  #colorize() {
    const type = this.getAttribute('type') ?? ''

    if (this.#availableTypes.includes(type)) {
      this.classList.add(type)
    }
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

      if (event.animationName === 'show' && !this.#mouseIsOver) {
        console.log('set exit timeout')
        const twoSecondsInMs = 2200
        this.#timeoutId = Number(setTimeout(this.hide, twoSecondsInMs))
      }
    })

    this.on('mouseover', () => {
      console.log('enter')
      this.#mouseIsOver = true
      this.#timeoutId && clearTimeout(this.#timeoutId)
      this.#timeoutId = null
    })

    this.on('mouseleave', () => {
      !this.#timeoutId && setTimeout(this.hide, 800)
    })

    const label = this.getAttribute('label') ?? 'Unknown'
    const message = this.getAttribute('message') ?? 'Unknown message'
    const type = this.getAttribute('type') ?? 'none'

    const iconsByType: Record<string, DocumentFragment> = {
      success: checkCircleIcon(),
      warning: alertIcon()
    }

    return html`
      <div class="notification-container">
        ${iconsByType[type]}
        <div class="notification-content">
          <h4>${label}</h4>
          <p>${message}</p>
        </div>
        <span on-click=${() => this.hide()}>&times;</span>
      </div>
    `
  }
}

customElements.define('ignem-notification', IgnemNotification)
