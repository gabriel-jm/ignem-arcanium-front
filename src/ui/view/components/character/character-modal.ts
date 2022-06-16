import { ignemInput, closeIcon, inputStyles } from '@/ui/view'
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
      ${[inputStyles]}

      dialog {
        margin: auto;
        width: 90%;
        background-color: var(--body-bg-color);
        border: 1px solid var(--container-border-color);
        border-radius: 4px;
        height: 90%;
        animation: show-dialog 250ms;
        color: var(--font-color);
        box-shadow: 0 2px 5px 3px #050505aa;
      }

      dialog::backdrop {
        background-color: #0505059a;
      }

      dialog.close {
        animation: close-dialog 200ms ease-in;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
      }

      .close-btn {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        color: var(--font-color);
      }

      .modal-body {
        overflow: scroll;
      }

      .characters-form {
        display: flex;
        padding: 30px;
        flex-wrap: wrap;
      }

      .icon {
        width: 300px;
      }

      .characters-form .attributes {
        min-width: 100%;
        display: flex;
        gap: 10px;
        font-weight: bold;
        color: var(--body-bg-color);
      }

      .characters-form .attributes label {
        background-color: #777;
        padding: 4px 6px;
        border-radius: 4px;
      }

      .characters-form .attributes input {
        display: inline-block;
        width: 30px;
        border: 0;
        padding: 2px 4px;
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
        <header class="modal-header">
          <h2>Create Character</h2>
          <button class="close-btn" on-click=${onCloseClick}>
            ${closeIcon()}
          </button>
        </header>

        <section class="modal-body">
          <form class="characters-form" is="ignem-form">
            ${ignemInput({
              label: 'Icon',
              name: 'icon',
              type: 'file',
              className: 'icon'
            })}

            <div class="inputs">
              ${ignemInput({
                label: 'Name',
                name: 'name',
                placeholder: 'Character name'
              })}

              ${ignemInput({
                label: 'Level',
                name: 'level',
                placeholder: 'Character level'
              })}
              
              ${ignemInput({
                label: 'Gold',
                name: 'gold',
                placeholder: 'Character gold'
              })}
            </div>

            <div class="attributes">
              ${ignemInput({
                label: 'Strength',
                name: 'strength',
                'on-input': () => {
                  const nextInput = this.select<HTMLInputElement>('input[name=dexterity]')
                  nextInput?.focus()
                }
              })}

              ${ignemInput({
                label: 'Dexterity',
                name: 'dexterity'
              })}

              ${ignemInput({
                label: 'Constitution',
                name: 'constitution'
              })}

              ${ignemInput({
                label: 'Intelligence',
                name: 'intelligence'
              })}

              ${ignemInput({
                label: 'Wisdom',
                name: 'wisdom'
              })}

              ${ignemInput({
                label: 'Charism',
                name: 'charism'
              })}
            </div>
          </form>
        </section>
      </dialog>
    `
  }
}

customElements.define('ignem-character-modal', IgnemCharacterModal)
