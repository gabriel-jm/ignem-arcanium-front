import { ignemInput, closeIcon, textBetweenDashes, InputMasks, IgnemFormElement } from '@/ui/view'
import { characterModalStyles } from './character-modal-styles'
import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

export interface IgnemCharacterModalElement extends IgnemElement {
  get dialog(): DialogElement
  get form(): IgnemFormElement
  setErrors(errorsRecord?: Record<string, string> | null): void
}

const attributes = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charism'
]

/**
 * @event -character-created
 */
export class IgnemCharacterModal extends IgnemElement {
  get dialog() {
    return this.select<DialogElement>('dialog')!
  }

  get form() {
    return this.select<IgnemFormElement>('form')!
  }

  setErrors(errorsRecord?: Record<string, string>) {
    this.form.setErrors(errorsRecord)

    for (const field of attributes) {
      const label = this.select<HTMLLabelElement>(`label[attr=${field}]`)!
      
      if (!errorsRecord || !errorsRecord[field]) {
        label.classList.remove('error')
        continue
      }

      if (field in errorsRecord) {
        label.classList.add('error')
      }
    }
  }

  styling() {
    return characterModalStyles
  }

  render() {
    const onCloseClick = () => {
      this.select<HTMLFormElement>('form')?.reset()
      this.select('dialog')?.classList.add('close')
      this.setErrors()
    }

    const onCloseAnimation = (event: AnimationEventInit) => {
      if (event.animationName === 'close-dialog') {
        const dialog = this.select<DialogElement>('dialog')
        dialog?.classList.remove('close')
        dialog?.close()
      }
    }

    const onInputAttribute = (nextAttribute?: string) => {
      return (e: Event) => {
        const input = e.target as HTMLInputElement
        const inputValue = input.value.trim().replace(/[^1-6]{1}/g, '')

        input.value = inputValue

        if (!inputValue) return

        if (nextAttribute) {
          const query = `input[name=${nextAttribute}]`
          this.select<HTMLInputElement>(query)?.focus()
        } else {
          input.blur()
        }
      }
    }

    const onSubmit = () => {
      const form = this.form

      function toNumber(inputName: string) {
        const inputValue = form[inputName].value

        return inputValue && Number(inputValue)
      }
      
      const formData = {
        name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
        level: toNumber('level'),
        gold: toNumber('gold'),
        hp: toNumber('hp'),
        mp: toNumber('mp'),
        strength: toNumber('strength'),
        dexterity: toNumber('dexterity'),
        constitution: toNumber('constitution'),
        intelligence: toNumber('intelligence'),
        wisdom: toNumber('wisdom'),
        charism: toNumber('charism')
      }

      this.dispatchEvent(new CustomEvent('character-created', {
        detail: formData
      }))
    }

    const attributesInputs = attributes.map((attr, index, arr) => {
      const captalizedAttribute = attr[0].toUpperCase() + attr.substring(1)

      return html`
        <label class="attr-input-group" attr=${attr}>
          <span>${captalizedAttribute}</span>
          <input
            name="${attr}"
            type="number"
            on-input=${onInputAttribute(arr[index + 1])}
          />
        </label>
      `
    })

    return html`
      <dialog on-animationend=${onCloseAnimation}>
        <div class="modal-container">
          <header class="modal-header">
            <h2>Create Character</h2>
            <button class="close-btn" on-click=${onCloseClick}>
              ${closeIcon()}
            </button>
          </header>

          <form class="characters-form" is="ignem-form">
            <div class="inputs">
              ${ignemInput({
                label: 'Name',
                name: 'name',
                placeholder: 'Character name',
                className: 'input name'
              })}

              ${ignemInput({
                label: 'Level',
                name: 'level',
                placeholder: 'Ex: 1',
                mask: InputMasks.ONLY_NUMBERS
              })}

              ${ignemInput({
                label: 'Health Points',
                name: 'hp',
                placeholder: 'Ex: 10',
                mask: InputMasks.ONLY_NUMBERS
              })}

              ${ignemInput({
                label: 'Magic Points',
                name: 'mp',
                placeholder: 'Ex: 10',
                mask: InputMasks.ONLY_NUMBERS
              })}
              
              ${ignemInput({
                label: 'Gold',
                name: 'gold',
                placeholder: 'Ex: 100',
                mask: InputMasks.ONLY_NUMBERS
              })}
            </div>

            ${textBetweenDashes('Attributes')}

            <p class="attributes-warn">
              The attributes must have a value between 1 and 6.
            </p>

            <div class="attributes">
              ${attributesInputs}
            </div>
          </form>

          <footer class="buttons">
            <button
              class="btn"
              on-click=${onSubmit}
            >
              Save
            </button>
            <button
              type="button"
              class="btn-bordered"
              on-click=${onCloseClick}
            >
              Cancel
            </button>
          </footer>
        </div>
      </dialog>
    `
  }
}

customElements.define('ignem-character-modal', IgnemCharacterModal)
