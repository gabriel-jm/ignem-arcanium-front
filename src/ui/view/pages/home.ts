import '@/ui/view'
import { AccountStore } from '@/ui/stores'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { containerStyles } from '@/ui/view/styles'

export class IgnemHomePage extends IgnemElement {
  #accountStore = new AccountStore()

  constructor() {
    super({ preventRenderApplying: true })
    this.applyRender()
  }

  styling() {
    return css`
      ${containerStyles}

      .container {
        padding: 25px;
      }
    `
  }

  render() {
    const accountName = this.#accountStore.account?.name

    return html`
      <ignem-header />

      <section class="container">
        <h2>Welcome ${accountName}!</h2>

        <h2>Characters</h2>

        <div>
          
        </div>
      </section>
    `
  }
}

customElements.define('ignem-home', IgnemHomePage)
