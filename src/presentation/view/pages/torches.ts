import { IgnemElement } from '@/presentation/view'
import { containerStyles } from '@/presentation/view/styles'
import { css, html } from 'lithen-tag-functions'

const list = [
  {
    characterName: 'Brunhard',
    torchCount: 1,
    torchCharge: 3,
    isLit: true
  },
  {
    characterName: 'Raven',
    torchCount: 2,
    torchCharge: 5,
    isLit: true
  },
  {
    characterName: 'Alí',
    torchCount: 0,
    torchCharge: 0,
    isLit: false
  },
  {
    characterName: 'Novato',
    torchCount: 4,
    torchCharge: 1,
    isLit: false
  }
]

export class TorchesPage extends IgnemElement {
  styling() {
    return css`
      ${containerStyles}

      .container {
        padding: 10px 26px;
      }

      .torches-title {
        font-size: 2rem;
        border-bottom: 1px solid #ddd2;
        padding-bottom: 12px;
        margin-top: 10px;
        margin-bottom: 30px;
      }

      .torch-list {
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 7px;
      }

      .torch-list ignem-torch-registry {
        flex: 1;
        flex-basis: 300px;
      }
    `
  }

  render() {
    return html`
      <ignem-header />

      <section class="container">
        <h2 class="torches-title">Torches</h2>
        <div class="torch-list">
          ${list.map(item => {
            return html`
              <ignem-torch-registry
                character-name="${item.characterName}"
                torch-count="${item.torchCount.toString()}"
                torch-charge="${item.torchCharge.toString()}"
                is-lit="${item.isLit.toString()}"
              />
            `
          })}
        </div>
      </section>
    `
  }
}

customElements.define('ignem-torches', TorchesPage)
