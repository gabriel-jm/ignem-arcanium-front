import { Presenter } from '@/presentation/protocols'
import { IgnemElement } from '@/ui/view'
import { containerStyles, tooltipStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

interface TorchRegistry {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
  isLit: string
}

export class IgnemTorchesPage extends IgnemElement {
  #findAllTorchRegistriesPresenter: Presenter

  constructor(findAllTorchRegistriesPresenter: Presenter) {
    super()
    this.#findAllTorchRegistriesPresenter = findAllTorchRegistriesPresenter
    this.applyRender()
  }

  async connectedCallback() {
    const findResult = await this.#findAllTorchRegistriesPresenter.handle()
    const data = findResult.data as TorchRegistry[]

    if (!findResult.ok || !data?.length) return

    const torchRegistries = data.map(item => {
      return html`
        <ignem-torch-registry
          character-name="${item.characterName}"
          torch-count="${item.torchCount}"
          torch-charge="${item.torchCharge}"
          is-lit="${item.isLit}"
        />
      `
    })

    this.select('.empty-torch-list')?.remove()

    this.select('.torch-list')?.append(...torchRegistries)
  }

  styling() {
    return css`
      ${containerStyles}
      ${tooltipStyles}

      .container {
        padding: 20px 46px;
      }

      .torches-header {
        border-bottom: 1px solid #aaa2;
        padding-bottom: 12px;
        margin-top: 10px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .torches-title {
        font-size: 2rem;
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

      .btn-bordered {
        --main-color: #888;
        
        color: var(--main-color);
        border: 1px solid var(--main-color);
        border-radius: 4px;
        padding: 8px 10px;
        background-color: transparent;
        font-size: 1rem;
        cursor: pointer;
      }
    `
  }

  render() {
    return html`
      <ignem-header />

      <section class="container">
        <header class="torches-header">
          <h2 class="torches-title">Torches</h2>
          <button class="btn-bordered">&plus; New</button>
        </header>
        <div class="torch-list"></div>
        <p class="empty-torch-list">No torches registred!</p>
      </section>
    `
  }
}

customElements.define('ignem-torches', IgnemTorchesPage)
