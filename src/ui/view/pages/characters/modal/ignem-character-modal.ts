import { FindAllCharactersResult } from '@/domain/protocols/use-cases'
import { IgnemElement } from '@/ui/view/ignem-element'
import { characterModalStyles } from '@/ui/view/pages/characters/modal/character-modal-styles'
import { html } from 'lithen-tag-functions'

export type CharacterModalData = FindAllCharactersResult

export class IgnemCharacterModal extends IgnemElement {
  get dialog() {
    return this.select<HTMLDialogElement>('dialog')
  }

  open(data: CharacterModalData) {
    this.dialog.show()
    this.#applyDialogContent(data)
  }

  #applyDialogContent(data: CharacterModalData) {
    const content = characterModalContent(this, data)

    this.select('dialog').replaceChildren(content)
  }

  styling() {
    return characterModalStyles
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

      <div class="attributes-group">
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
