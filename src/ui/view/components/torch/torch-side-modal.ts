import { containerStyles, IgnemElement, inputStyles } from '@/ui/view'
import { css, html } from 'lithen-tag-functions'

export interface IgnemTorchSideModalElement extends IgnemElement {
  open(): void
}

/**
 * @event -form-submit
 */
export class IgnemTorchSideModal extends IgnemElement {
  open() {
    this.classList.add('open')
  }

  close() {
    this.classList.add('close')
  }

  styling() {
    return css`
      ${containerStyles}
      ${inputStyles}

      :host {
        display: none;
        opacity: 0;
        background-color: #0007;
        z-index: 2;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 400ms ease-in-out;
      }

      :host(.open) {
        display: block;
        opacity: 1;
      }

      :host(.close) {
        animation: fade-out 400ms ease-in-out;
      }

      .container {
        height: 100%;
        padding: 10px;
      }

      .side-modal-container {
        max-width: 400px;
        height: 100%;
        margin-left: auto;
        background-color: var(--body-bg-color);
        box-sizing: border-box;
        border: 1px solid #3f3f3f;
        border-radius: 4px;
        padding: 10px 14px;
        animation: slide-left 600ms ease-in-out;
      }

      :host(.close) .side-modal-container {
        animation-name: slide-right;
      }

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

      @keyframes slide-left {
        from {
          transform: translateX(100%);
          opacity: 0;
        }

        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slide-right {
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      @keyframes fade-out {
        to {
          opacity: 0;
        }
      }
    `
  }
  
  render() {
    this.classList.add('open')

    this.on('click', event => {
      const containerElement = this.select('.container')
      const [clickedElement] = event.composedPath()
      
      if (clickedElement === this || clickedElement === containerElement) {
        this.close()
      }
    })

    this.on('animationend', (event: AnimationEventInit) => {
      if (event.animationName === 'fade-out') {
        this.classList.remove('open', 'close')
      }
    })

    const onInput: EventListener = event => {
      const input = event.target as HTMLInputElement
      input.value = input.value.replace(/\D+/g, '')
    }

    const onSubmit: EventListener = event => {
      event.preventDefault()
      const form = event.target as HTMLFormElement

      const formData = {
        characterName: form.characterName.value,
        torchCount: Number(form.torchCount.value),
        torchCharge: Number(form.torchCharge.value)
      }

      const customEvent = new CustomEvent('form-submit', {
        detail: formData
      })

      this.dispatchEvent(customEvent)
    }

    return html`
      <section class="container">
        <div class="side-modal-container">
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
        </div>
      </section>
    `
  }
}

customElements.define('ignem-torch-side-modal', IgnemTorchSideModal)
