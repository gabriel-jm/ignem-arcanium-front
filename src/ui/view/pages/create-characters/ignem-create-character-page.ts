import '../../components/header/header'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { containerStyles, formControlStyles } from '@/ui/view/styles'
import { breadcrumbs, ignemInput, ignemSelect } from '@/ui/view/components'

export class IgnemCreateCharacterPage extends IgnemElement {
  styling() {
    const aditionalStyles = [containerStyles, formControlStyles]

    return css`
      ${aditionalStyles}

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      .icons-container {
        background-color: #1b1b1b;
        padding: 10px 12px;
        display: flex;
        gap: 10px;
        border-radius: 4px;
      }

      .icon {
        width: 80px;
        border: 1px solid var(--container-border-color);
        border-radius: 4px;
        padding: 6px 10px;
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
    `
  }
  
  render() {
    const breadcrumbProps = {
      Home: '/home',
      Characters: '/characters',
      'Create Character': 'current'
    }

    const onClickIcon = (event: Event) => {
      const iconElement = event.target as HTMLElement
      const selectedIcon = this.select('.icon.selected')
      
      if (iconElement !== selectedIcon) {
        selectedIcon?.classList.remove('selected')
        iconElement.classList.add('selected')
      }
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1 class="characters-title">Create Character</h1>
        
        <p>Choose an icon to represent your character</p>
        
        <div class="icons-container">
          <figure class="icon" on-click=${onClickIcon}>
            <img alt="A mage icon" src="/mage.svg" />
          </figure>
          <figure class="icon" on-click=${onClickIcon}>
            <img alt="A mage icon" src="/mage.svg" />
          </figure>
        </div>

        <form>
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
              label: 'Gold',
              name: 'gold',
              placeholder: 'Gold amount'
            }),

            html`
              <label>
                <span>Description</span>
                <textarea></textarea>
              </label>
            `
          ]}
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
