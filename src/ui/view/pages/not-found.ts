import { IgnemElement } from '@/ui/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class IgnemNotFoundPage extends IgnemElement {
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
      <h1>Page Not Found</h1>
      <button class="btn" on-click=${() => router.goTo('/')}>
        Home
      </button>
    `
  }
}

customElements.define('ignem-not-found', IgnemNotFoundPage)
