import { Presenter } from '@/presentation/protocols'
import { SuccessNotifier } from '@/ui/protocols'
import { IgnemElement, IgnemTorchRegistry, IgnemTorchSideModalElement } from '@/ui/view'
import { containerStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

interface TorchRegistry {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export class IgnemTorchesPage extends IgnemElement {
  #findAllTorchRegistriesPresenter: Presenter
  #createTorchRegistryPresenter: Presenter

  constructor(
    findAllTorchRegistriesPresenter: Presenter,
    createTorchRegistryPresenter: Presenter,
    private readonly successNotifier: SuccessNotifier
  ) {
    super()
    this.#findAllTorchRegistriesPresenter = findAllTorchRegistriesPresenter
    this.#createTorchRegistryPresenter = createTorchRegistryPresenter
    
    this.applyRender()
  }

  async connectedCallback() {
    const findResult = await this.#findAllTorchRegistriesPresenter.handle<TorchRegistry[]>()
    const data = findResult.data

    if (!findResult.ok || !data?.length) return

    const torchRegistries = data.map(item => new IgnemTorchRegistry(item))

    this.#addTorchRegistryElement(...torchRegistries)
  }

  #addTorchRegistryElement(...torchRegistries: (Element | DocumentFragment)[]) {
    this.select('.empty-torch-list')?.remove()

    this.select('.torch-list')?.append(...torchRegistries)
  }

  styling() {
    return css`
      ${containerStyles}

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
        max-width: 300px;
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
    const onBtnClick = () => {
      this.select<IgnemTorchSideModalElement>('#form-modal')?.open()
    }

    const onFormSubmit = async (event: CustomEventInit) => {
      const formData = event.detail

      const result = await this.#createTorchRegistryPresenter.handle<TorchRegistry>(formData)

      const formModal = this.select<IgnemTorchSideModalElement>('#form-modal')

      if (result.validationErrors) {
        formModal?.form.setErrors(result.validationErrors)
        return
      }

      if (!result.ok) return

      this.successNotifier.notifySuccess(
        'Created',
        'Torch registry created with success'
      )
      formModal?.close()

      const torchRegistry = result.data

      this.select('.torch-list')?.append(new IgnemTorchRegistry(torchRegistry))
    }

    return html`
      <ignem-header />

      <ignem-torch-side-modal
        id="form-modal"
        on-form-submit=${onFormSubmit}
      />

      <section class="container">
        <header class="torches-header">
          <h2 class="torches-title">Torches</h2>
          <button class="btn-bordered" on-click=${onBtnClick}>
            &plus; New
          </button>
        </header>
        <div class="torch-list"></div>
        <p class="empty-torch-list">No torches registred!</p>
      </section>
    `
  }
}

customElements.define('ignem-torches', IgnemTorchesPage)
