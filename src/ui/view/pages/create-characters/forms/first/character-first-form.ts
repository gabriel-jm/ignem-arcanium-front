import {
  IgnemForm,
  ignemInput,
  ignemSelect,
  ignemTextarea,
  InputMasks,
} from '@/ui/view/components'
import { IgnemCreateCharacterPage, IgnemCreateCharacterProps } from '../../ignem-create-character-page'
import { html } from 'lithen-fns'
import { textBetweenDashes } from '@/common/ui'

export function characterFirstForm(
  parent: IgnemCreateCharacterPage,
  props: IgnemCreateCharacterProps
) {
  const onClickIcon = (event: Event) => {
    const iconElement = event.target as HTMLElement
    const selectedIcon = parent.select('.icon.selected')
    
    if (iconElement !== selectedIcon) {
      selectedIcon?.classList.remove('selected')
      iconElement.classList.add('selected')
    }
  }

  const onSubmitForm = async (event: Event) => {
    event.preventDefault()
    const form = event.target as IgnemForm

    const data = form.getData({
      name: 'string',
      alignment: 'string',
      level: 'number',
      gold: 'number',
      description: 'string'
    })

    const result = await props
      .generalInfoPresenter.handle(data)

    form.setErrors(result.validationErrors)

    if (result.ok) {
      parent.characterData = {
        ...parent.characterData,
        ...result.data
      }
      parent.next()
    }
  }

  const iconPaths = ['/mage.svg', '/mage.svg']

  const icons = iconPaths.map(iconPath => html`
    <figure class="icon" on-click=${onClickIcon}>
      <img alt="A character icon" src="${iconPath}" />
    </figure>
  `)

  return html`
    <form
      is="ignem-form"
      class="character-form active"
      step="1"
      on-submit=${onSubmitForm}
    >
      ${textBetweenDashes('General')}

      <p class="icons-title">
        Choose an icon to represent your character
      </p>
      
      <div class="icons-container">
        ${icons}
      </div>

      <div class="first-form">
        ${[
          ignemInput({
            label: 'Name',
            name: 'name',
            placeholder: 'Enter your character name'
          }),
          
          ignemSelect({
            label: 'Alignment',
            name: 'alignment',
            placeholder: 'Select alignment',
            options: [
              'Lawful Good',
              'Lawful Neutral',
              'Lawful Evil',
              'Neutral Good',
              'Neutral',
              'Neutral Evil',
              'Chaotic Good',
              'Chaotic Neutral',
              'Chaotic Evil'
            ]
          }),

          ignemInput({
            label: 'Level',
            name: 'level',
            placeholder: 'Current character level',
            mask: InputMasks.ONLY_NUMBERS
          }),

          ignemInput({
            label: 'Gold',
            name: 'gold',
            placeholder: 'Gold amount',
            mask: InputMasks.ONLY_NUMBERS
          }),

          ignemTextarea({
            label: 'Description',
            name: 'description',
            placeholder: 'Describe your character and story',
            containerClassName: 'description',
            className: 'form-control description'
          })
        ]}
      </div>
      <div class="form-buttons">
        <button class="btn">Next</button>
      </div>
    </form>
  `
}
