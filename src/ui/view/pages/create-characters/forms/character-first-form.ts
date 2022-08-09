import { ignemInput, ignemSelect, ignemTextarea, InputMasks } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

export const characterFirstFormStyles = css`
  .icons-title {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .icons-container {
    background-color: #1b1b1b;
    padding: 10px 12px;
    display: flex;
    gap: 12px;
    border-radius: 4px;
  }

  .icon {
    width: 80px;
    border: 1px solid var(--container-border-color);
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background-color 200ms;
  }

  .icon img {
    pointer-events: none;
  }

  .icon:hover {
    background-color: var(--transparent-white);
  }

  .icon.selected {
    outline: 2px solid var(--outline-white);
  }

  .first-form {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
  }

  .description {
    grid-column: 1 / 3;
  }

  .form-control.description {
    overflow: auto;
    resize: vertical;
    max-height: 200px;
    min-height: 100px;
  }

  @media screen and (max-width: 375px) {
    .first-form {
      display: flex;
      flex-direction: column;
    }
  }
`

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
  `
}
