import { IgnemElement } from '@/ui/view'
import { containerStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

export class IgnemTorchesPage extends IgnemElement {
  #list: Array<any> = []

  constructor() {
    super()
    this.applyRender()
  }

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

      .empty-torch-list {
        text-align: center;
        font-size: 1.6rem;
        color: var(--unavailable-font-color);
      }
    `
  }

  render() {
    return html`
      <ignem-header />

      <section class="container">
        <h2 class="torches-title">Torches</h2>
        <div class="torch-list">
          ${this.#list.map(item => {
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
        ${!this.#list.length && (
          html`
            <p class="empty-torch-list">No torches registred!</p>
          `
        )}
      </section>
    `
  }
}

customElements.define('ignem-torches', IgnemTorchesPage)
