import { IgnemElement } from '@/presentation/view'
import { css, html } from 'lithen-tag-functions'

export class MenuIcon extends IgnemElement {
  styling() {
    return css`
      :host {
        width: 26px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `
  }

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `
  }
}

customElements.define('ignem-menu-icon', MenuIcon)
