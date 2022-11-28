import { FindAllCharactersResult } from '@/domain/protocols/use-cases'
import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

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
    const content = html`
      <header>
        <img src="${data.icon}" alt="Character's icon" />
        <h1>${data.name}</h1>
      </header>

      <div>
        <span>Level ${data.level}</span>
        <span>Gold ${data.gold}</span>
        <span>Character points ${data.characterPoints}</span>
      </div>

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
        on-click=${() => this.dialog.close()}
      >
        close
      </button>
    `

    this.select('dialog').replaceChildren(content)
  }

  render() {
    return '<dialog></dialog>'
  }  
}

customElements.define('ignem-character-modal', IgnemCharacterModal)
