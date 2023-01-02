import { FindAllCharactersResult } from '@/domain/protocols/use-cases'
import { IgnemElement } from '@/ui/view/ignem-element'
import { characterStatsStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

export type CharacterModalData = FindAllCharactersResult

export class IgnemCharacterModal extends IgnemElement {
  get dialog() {
    return this.select<HTMLDialogElement>('dialog')
  }

  open(data: CharacterModalData) {
    console.log(data)
    this.dialog.show()
    this.#applyDialogContent(data)
  }

  #applyDialogContent(data: CharacterModalData) {
    const content = characterModalContent(this, data)

    this.select('dialog').replaceChildren(content)
  }

  styling() {
    return css`
      ${characterStatsStyles}

      dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        padding: 24px 8%;
        border: 0;
        background-color: #0007;
        overflow-y: auto;
        color: var(--font-color);
      }

      .modal-container {
        background-color: var(--body-bg-color);
        border-radius: 4px;
        padding: 12px 16px;
        box-shadow: 0 2px 8px 2px #0008;
      }

      .modal-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .modal-header figure {
        width: 80px;
      }

      .modal-header h1 {
        margin-bottom: 4px;
      }

      .primary-stats-container span {
        margin-right: 16px;
      }
    `
  }

  render() {
    return '<dialog></dialog>'
  }  
}

customElements.define('ignem-character-modal', IgnemCharacterModal)

function characterModalContent(modal: IgnemCharacterModal, data: CharacterModalData) {
  return html`
    <div class="modal-container">
      <header class="modal-header">
        <figure>
          <img src="${data.icon}" alt="Character's icon" />
        </figure>
        <div>
          <h1>${data.name}</h1>
          <div class="primary-stats-container">
            <span class="level">
              Level ${data.level}
            </span>
            <span class="gold">
              Gold ${data.gold}
            </span>
            <span class="character-points">
              Character points ${data.characterPoints}
            </span>
          </div>
        </div>
      </header>

      <div>
        <span>HP ${data.hp}</span>
        <span>MP ${data.mp}</span>
      </div>

      <div>
        <span>Strength ${data.strength}</span>
        <span>Dexterity ${data.dexterity}</span>
        <span>Constitution ${data.constitution}</span>
        <span>Intelligence ${data.intelligence}</span>
        <span>Wisdom ${data.wisdom}</span>
        <span>Charisma ${data.charisma}</span>
      </div>

      <section>
        <div>
          
        </div>
      </section>

      <button
        on-click=${() => modal.dialog.close()}
      >
        close
      </button>
    </div>
  `
}
