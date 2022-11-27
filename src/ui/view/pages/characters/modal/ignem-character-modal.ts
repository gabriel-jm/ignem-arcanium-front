import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

/**
 * @attr {string} name
 * @attr {string} icon
 */
export class IgnemCharacterModal extends IgnemElement {
  get dialog() {
    return this.select<HTMLDialogElement>('dialog')
  }

  render() {
    const name = this.getAttribute('name')
    const icon = this.getAttribute('icon')

    
    return html`
      <dialog>
        <header>
          <img src="${icon}" alt="Character's icon" />
          <h1>${name}</h1>
        </header>

        <button
          on-click=${() => this.select<HTMLDialogElement>('dialog').close()}
        >
          close
        </button>
      </dialog>
    `
  }  
}

customElements.define('ignem-character-modal', IgnemCharacterModal)
