import { closeIcon } from '@/ui/view/components/icons'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

export interface IgnemCharacterModalElement extends IgnemElement {
  get dialog(): DialogElement
}

export class IgnemCharacterModal extends IgnemElement {
  get dialog() {
    return this.select('dialog')!
  }

  styling() {
    return css`
      dialog {
        margin: auto;
        width: 90%;
        background-color: var(--body-bg-color);
        border: 1px solid var(--container-border-color);
        border-radius: 4px;
        height: 90%;
        animation: show-dialog 250ms;
        color: var(--font-color);
      }

      dialog::backdrop {
        background-color: #0505059a;
      }

      dialog.close {
        animation: close-dialog 200ms ease-in;
      }

      @keyframes close-dialog {
        to {
          transform: scale(0.15);
          opacity: 0;
        }
      }

      @keyframes show-dialog {
        from {
          transform: scale(0.15);
          opacity: 0;
        }

        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    `
  }

  render() {
    const onCloseClick = () => {
      this.select('dialog')?.classList.add('close')
    }
    const onCloseAnimation = (event: AnimationEventInit) => {
      if (event.animationName === 'close-dialog') {
        const dialog = this.select<DialogElement>('dialog')
        dialog?.classList.remove('close')
        dialog?.close()
      }
    }

    return html`
      <dialog on-animationend=${onCloseAnimation}>
        <header>
          <h2>Create Character</h2>
          <button class="close-btn" on-click=${onCloseClick}>
            ${closeIcon()}
          </button>
        </header>
      </dialog>
    `
  }
}

customElements.define('ignem-character-modal', IgnemCharacterModal)
