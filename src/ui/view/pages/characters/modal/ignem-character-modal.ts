import { FindAllCharactersResult } from '@/domain/protocols/use-cases'
import { equipmentItemCard } from '@/ui/view/components'
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
    this.select('dialog').scrollTo({
      behavior: 'auto',
      top: 0
    })
  }

  #applyDialogContent(data: CharacterModalData) {
    const content = characterModalContent(this, data)

    this.select('dialog').replaceChildren(content)
  }

  styling() {
    return characterModalStyles
  }

  render() {
    return html`<dialog on-click=${(event: Event) => {
      if (event.target === event.currentTarget) {
        (event.target as HTMLDialogElement).close()
      }
    }}></dialog>`
  }  
}

customElements.define('ignem-character-modal', IgnemCharacterModal)

const equipmentSlots = ['rightHand', 'leftHand', 'armor', 'accessory1', 'accessory2']

function characterModalContent(modal: IgnemCharacterModal, data: CharacterModalData) {
  console.log(data)

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

      <section class="attributes-group">
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
      </section>

      <section>
        <div>
          <span>Equipment</span>
        </div>
        <div class="equipment-section">
          ${equipmentSlots.map(slot => {
            console.log(data.equipment[slot])
            return html`
              <div>
                <p class="equipment-slot-name">${slot}</p>
                ${equipmentItemCard({
                  item: data.equipment[slot]
                })}
              </div>
            `
          })}
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
