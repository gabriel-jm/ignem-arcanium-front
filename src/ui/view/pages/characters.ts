import '@/ui/view'
import { containerStyles } from '@/ui/view'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html, raw } from 'lithen-tag-functions'

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
  }
]

export class IgnemCharactersPage extends IgnemElement {
  styling() {
    return css`
      ${containerStyles}

      .container {
        padding: 25px;
      }

      .character-card {
        border: 1px solid var(--container-border-color);
        border-radius: 4px;
        background-color: #1a1a1a;
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        align-items: center;
        padding: 12px;
      }

      .character-info h4 {
        font-size: 1.5rem;
      }

      .gold {
        font-weight: bold;
        color: #e7b81d;
      }
    `
  }
  
  render() {
    const charactersElements = charactersList.map(character => {
      return html`
        <div class="character-card">
          <figure>
            <img width="80px" height="80px" src="${character.icon}" />
          </figure>
          <div class="character-info">
            <h4>${character.name} | Level ${character.level}</h4>
            <p>Gold &nbsp;<span class="gold">${character.gold}</span></p>
            <li>Strength ${character.strength}</li>
            <li>Dexterity ${character.dexterity}</li>
            <li>Constitution ${character.constitution}</li>
            <li>Intelligence ${character.intelligence}</li>
            <li>Wisdom ${character.wisdom}</li>
            <li>Charism ${character.charism}</li>
          </div>
        </div>
      `
    })

    return html`
      <ignem-header />

      <section class="container">
        <h2>Characters</h2>

        <div>
          <div>
            ${charactersElements}
          </div>
        </div>
      </section>
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)
