import { AccountStore } from '@/ui/stores'
import '@/ui/view'
import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

export class IgnemHomePage extends IgnemElement {
  #accountStore = new AccountStore()

  constructor() {
    super({ preventRenderApplying: true })
    this.applyRender()
  }

  render() {
    const accountName = this.#accountStore.account?.name

    return html`
      <ignem-header />

      <h1>Welcome ${accountName}!</h1>
    `
  }
}

customElements.define('ignem-home', IgnemHomePage)
