import { IgnemElement } from '@/presentation/view'
import { router } from 'lithen-router'
import { html } from 'lithen-tag-functions'

export class HomePage extends IgnemElement {
  constructor() {
    super()
    this.applyRender()
  }

  render() {
    return html`
      <h1>Home</h1>
      <button on-click=${() => router.goTo('/torch-registries')}>
        Login
      </button>
    `
  }
}

customElements.define('ignem-home', HomePage)
