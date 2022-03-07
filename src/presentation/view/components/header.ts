import { IgnemElement } from '@/presentation/view'
import { css, html } from 'lithen-tag-functions'

export class IgnemHeader extends IgnemElement {
  constructor() {
    super()
    this.applyRender()
  }

  styling() {
    return css`
      .header {
        background-color: #111;
        display: block;
        padding: 6px 10px;
      }

      .header-container::part(container) {
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
        <ignem-content-container class="header-container">
          <ignem-menu-icon class="menu-icon" />
          <h1 class="title">Ignem Arcanium</h1>
        </ignem-content-container>
      </header>
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
