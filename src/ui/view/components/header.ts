import { IgnemElement, menuIcon } from '@/ui/view'
import { containerStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

export class IgnemHeader extends IgnemElement {
  styling() {
    return css`
      ${containerStyles}

      .header {
        background-color: #151515;
        display: block;
        padding: 6px 10px;
      }

      .container {
        display: flex;
        align-items: center;
      }

      .title {
        font-size: 1.4rem;
        margin: 0;
      }

      .menu-icon {
        cursor: pointer;
        margin-right: 16px;
      }
    `
  }

  render() {
    return html`
      <header class="header">
        <div class="container">
          ${menuIcon()}
          <h1 class="title">Ignem Arcanium</h1>
        </div>
      </header>
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
