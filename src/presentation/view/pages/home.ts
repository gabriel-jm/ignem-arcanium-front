import { CreateConnection } from '@/domain/use-cases'
import { IgnemElement } from '@/presentation/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class HomePage extends IgnemElement {
  #createConnection: CreateConnection
  
  constructor(createConnection: CreateConnection) {
    super()
    this.#createConnection = createConnection
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
      console.log('rodou')
      
      try {
        const connectionId = await this.#createConnection.create()

        console.log({ connectionId })

        if(connectionId) {
          router.goTo('/torches')
        }
      } catch (error) {
        console.log('usecase error', error)
      }
    }

    return html`
      <h1>Home</h1>
      <button class="btn" on-click=${onClick}>
        Login
      </button>
    `
  }
}

customElements.define('ignem-home', HomePage)
