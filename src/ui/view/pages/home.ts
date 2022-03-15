import { CreateConnectionPresenter } from '@/presentation/presenters'
import { NotificationStore } from '@/ui/stores'
import { IgnemElement, IgnemNotification } from '@/ui/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class HomePage extends IgnemElement {
  #createConnectionPresenter: CreateConnectionPresenter
  
  constructor(createConnectionPresenter: CreateConnectionPresenter) {
    super()
    this.#createConnectionPresenter = createConnectionPresenter
    this.applyRender()
  }

  styling() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `
  }

  render() {
    const onClick = async () => {
      try {
        const connectionId = await this.#createConnectionPresenter.handle()

        console.log({ connectionId })

        if(connectionId) {
          router.goTo('/torches')
        }
      } catch (error) {
        new NotificationStore().warn({
          label: 'Error',
          message: (error as Error).message
        })
      }
    }

    return html`
      <h1>Home</h1>
      <button class="btn" on-click=${onClick}>
        Login
      </button>
      <button on-click=${() => {
        this.root.append(new IgnemNotification({
          label: 'Created',
          message: 'Item created with success',
          type: 'success'
        }))
      }}>
        Show notification
      </button>
    `
  }
}

customElements.define('ignem-home', HomePage)
