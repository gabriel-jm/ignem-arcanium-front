import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

export class IgnemCharacterModal extends IgnemElement {
  get dialog() {
    return this.select<HTMLDialogElement>('dialog')
  }

  render() {
    return html`
      <dialog>
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
