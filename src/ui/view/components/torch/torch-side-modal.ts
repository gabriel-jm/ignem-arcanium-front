import { IgnemElement, IgnemSideModalElement, inputStyles } from '@/ui/view'
import { css, html } from 'lithen-tag-functions'

export interface IgnemTorchSideModalElement extends IgnemSideModalElement {
  setErrors(errorsRecord: Record<string, string>): void
  removeErrors(): void
}

/**
 * @event -form-submit
 */
export class IgnemTorchSideModal extends IgnemElement {
  #sideModal?: IgnemSideModalElement

  constructor() {
    super()
    this.#sideModal = this.select('ignem-side-modal')
  }

  open() {
    this.#sideModal?.open()
  }

  close() {
    this.#sideModal?.close()
  }

  setErrors(errorsRecord: Record<string, string>) {
    const form = this.select<HTMLFormElement>('form')!

    this.removeErrors()

    Object.entries(errorsRecord).forEach(([field, error]) => {
      const inputMessageSpan = this.select(`input[name=${field}] ~ span`)!
      const input = form[field] as HTMLInputElement
      input.classList.add('error')

      inputMessageSpan.textContent = error
    })
  }

  removeErrors() {
    const form = this.select<HTMLFormElement>('form')!

    const formElements = Array.from(form.elements)

    formElements.forEach(element => {
      const errorInput = element.classList.contains('error')

      if (!errorInput || element.nodeName !== 'INPUT') return

      const input = element as HTMLInputElement
      
      input.classList.remove('error')
      
      const inputMessageSpan = this.select(`input[name=${input.name}] ~ span`)!
      inputMessageSpan.textContent = ''
    })
  }

  styling() {
    return css`
      ${inputStyles}

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
      const form = event.target as HTMLFormElement
      const { characterName, torchCount, torchCharge } = form

      const formData = {
        characterName: characterName.value,
        torchCount: torchCount.value ? Number(torchCount.value) : null,
        torchCharge: torchCharge.value ? Number(torchCharge.value) : null
      }

      const customEvent = new CustomEvent('form-submit', {
        detail: formData
      })

      this.dispatchEvent(customEvent)
    }

    return html`
      <ignem-side-modal>
        <header class="modal-header">
          <h3 class="modal-title">Create Torch Registry</h3>
          <button class="close-btn" on-click=${this.close.bind(this)}>
            &times;
          </button>
        </header>

        <form on-submit=${onSubmit}>
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
