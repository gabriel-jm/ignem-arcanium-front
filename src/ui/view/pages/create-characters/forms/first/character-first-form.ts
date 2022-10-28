import {
  ignemInput,
  ignemSelect,
  ignemTextarea,
  InputMasks,
  textBetweenDashes
} from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

export function characterFirstForm(parentElement: IgnemElement) {
  const onClickIcon = (event: Event) => {
    const iconElement = event.target as HTMLElement
    const selectedIcon = parentElement.select('.icon.selected')
    
    if (iconElement !== selectedIcon) {
      selectedIcon?.classList.remove('selected')
      iconElement.classList.add('selected')
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
      form
      is="ignem-form"
      class="character-form active"
      step="1"
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
    </form>
  `
}
