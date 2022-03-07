import { IgnemElement } from '@/presentation/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class HomePage extends IgnemElement {
  constructor() {
    super()
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
    return html`
      <h1>Home</h1>
      <button class="btn" on-click=${() => router.goTo('/torches')}>
        Login
      </button>
    `
  }
}

customElements.define('ignem-home', HomePage)
