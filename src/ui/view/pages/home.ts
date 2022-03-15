import { Presenter } from '@/presentation/protocols'
import { IgnemElement, IgnemNotification } from '@/ui/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class HomePage extends IgnemElement {
  #createConnectionPresenter: Presenter
  
  constructor(createConnectionPresenter: Presenter) {
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
      const connectionResult = await this.#createConnectionPresenter.handle()

      console.log({ connectionResult })

      if (connectionResult.ok) {
        router.goTo('/torches')
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
