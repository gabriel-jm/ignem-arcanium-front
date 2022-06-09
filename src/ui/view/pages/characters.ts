import '@/ui/view'
import { containerStyles, characterCardStyles } from '@/ui/view'
import { breadcrumbs, characterCard } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

const charactersList = [
  {
    id: 'any_id',
    name: 'Warrior',
    icon: 'https://cdn-icons-png.flaticon.com/512/3819/3819284.png',
    level: 1,
    gold: 10,
    hp: 10,
    mp: 10,
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charism: 1
  },
  {
    id: 'any_id',
    name: 'Mage',
    icon: '/mage.svg',
    level: 1,
    gold: 10,
    hp: 10,
    mp: 10,
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charism: 1
  }
]

export class IgnemCharactersPage extends IgnemElement {
  styling() {
    return css`
      ${[containerStyles, characterCardStyles]}

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      .characters-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 0 10px;
      }
    `
  }
  
  render() {
    const charactersElements = charactersList.map(characterCard)
    const pathsRecord = {
      Home: '/home',
      Characters: 'actual'
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(pathsRecord)}

        <h2 class="characters-title">Characters</h2>

        <div class="characters-list">
          ${charactersElements}
        </div>
      </section>
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)
