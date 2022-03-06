import { IgnemElement } from '@/presentation/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class NotFoundPage extends IgnemElement {
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

      button {
        background-color: #333;
        cursor: pointer;
        padding: 8px 10px;
        color: #ddd;
        border-radius: 4px;
        border: 0;
      }   
    `
  }

  render() {
    return html`
      <h1>Page Not Found</h1>
      <button on-click=${() => router.goTo('/')}>Home</button>
    `
  }
}

customElements.define('ignem-not-found', NotFoundPage)
