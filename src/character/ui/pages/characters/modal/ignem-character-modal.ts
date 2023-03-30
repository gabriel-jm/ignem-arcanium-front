import { closeIcon } from '@/common/ui/index.js'
import { FindAllCharactersResult } from '@/domain/protocols/use-cases/index.js'
import { Item } from '@/item/types/items.js'
import { IgnemItemTinyCard, itemCard } from '@/item/ui/index.js'
import { IgnemElement } from '@/common/ui/ignem-element.js'
import { html, el, ref } from 'lithen-fns'
import { equipmentItemCard } from '@/equipment/index.js'
import { characterModalStyles } from './character-modal-styles.js'

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
  const itemDetailsRef = ref<HTMLElement>()

  function onClickEquipItem(item?: Item) {
    return () => {
      item
        ? itemDetailsRef.el?.replaceChildren(
          itemCard({ ...item })
        )
        : itemDetailsRef.el?.replaceChildren()
    }
  }

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
        <span
          class="modal-close-btn"
          on-click=${() => modal.dialog.close()}
        >
          ${closeIcon()}
        </span>
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
        <ignem-tabs>
          <div tab="Equipment">
            <div class="equipment-section">
              <section>
                ${equipmentSlots.map(slot => html`
                  <div class="equipment-slot-container">
                    <p class="equipment-slot-name">${slot}</p>
                    ${equipmentItemCard({
                      item: data.equipment[slot],
                      onClick: onClickEquipItem(data.equipment[slot])
                    })}
                  </div>
                `)}
              </section>
              <section
                class="equipment-item-details"
                ref=${itemDetailsRef}
              ></section>
            </div>
          </div>
          <div tab="Inventory">
            <div class="inventory">
              ${data.inventory.items.length === 0 && el/*html*/`
                <span>Inventory Empty</span>
              `}
              ${data.inventory.items.map(item => {
                return new IgnemItemTinyCard({
                  ...item,
                  showAttr: 'quantity'
                })
              })}
            </div>
          </div>
        </ignem-tabs>
      </section>
    </div>
  `
}
