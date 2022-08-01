import { buttonStyles, IgnemElement, IgnemSideModalElement, inputAndSelectStyles } from '@/ui/view'
import { IgnemFormElement } from '@/ui/view/components'
import { css, html } from 'lithen-tag-functions'

export interface IgnemTorchSideModalElement extends IgnemSideModalElement {
  get form(): IgnemFormElement
}

/**
 * @event -form-submit
 */
export class IgnemTorchSideModal extends IgnemElement {
  #sideModal?: IgnemSideModalElement
  #form: IgnemFormElement

  constructor() {
    super()
    this.#sideModal = this.select('ignem-side-modal')
    this.#form = this.select<IgnemFormElement>('form[is=ignem-form]')!
  }

  get form() {
    return this.#form
  }

  open() {
    this.#sideModal?.open()
  }

  close() {
    this.#sideModal?.close()

    this.#form.reset()
    this.#form.removeErrors()
  }

  styling() {
    return css`
      ${[inputAndSelectStyles, buttonStyles]}

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-title {
        font-size: 1.5rem;
      }

      .close-btn {
        font-size: 1.8rem;
        border: 0;
        color: var(--font-color);
        background-color: transparent;
        margin-left: auto;
        cursor: pointer;
      }

      form {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 20px;
        margin-top: 30px;
      }

      label {
        margin-bottom: 6px;
      }

      label:first-child, .btn {
        grid-column: span 3;
      }

      label:nth-child(2) {
        margin-right: 10px;
      }

      label:nth-child(3) {
        margin-left: 10px;
      }

      .btn {
        margin-top: 12px;
      }
    `
  }
  
  render() {
    const onInput: EventListener = event => {
      const input = event.target as HTMLInputElement
      input.value = input.value.replace(/\D+/g, '')
    }

    const onSubmit: EventListener = event => {
      event.preventDefault()
      const form = event.target as IgnemFormElement
      const formData = form.getData({
        characterName: 'string',
        torchCount: 'number',
        torchCharge: 'number'
      })

      const customEvent = new CustomEvent('form-submit', {
        detail: formData
      })

      this.dispatchEvent(customEvent)
    }

    return html`
      <ignem-side-modal on-click-outside=${this.close.bind(this)}>
        <header class="modal-header">
          <h3 class="modal-title">Create Torch Registry</h3>
          <button class="close-btn" on-click=${this.close.bind(this)}>
            &times;
          </button>
        </header>

        <form is="ignem-form" on-submit=${onSubmit}>
          <label>
            <span>Character Name</span>
            <input class="input" name="characterName" />
            <span class="input-message"></span>
          </label>

          <label>
            <p>Torch Count</p>
            <input class="input" name="torchCount" on-input=${onInput} />
            <span class="input-message"></span>
          </label>

          <label>
            <p>Torch Charge</p>
            <input class="input" name="torchCharge" on-input=${onInput} />
            <span class="input-message"></span>
          </label>

          <button class="btn">Submit</button>
        </form>
      </ignem-side-modal>
    `
  }
}

customElements.define('ignem-torch-side-modal', IgnemTorchSideModal)
