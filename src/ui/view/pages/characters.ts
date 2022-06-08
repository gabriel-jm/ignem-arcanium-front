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
      ${containerStyles}

      .container {
        padding: 1.6rem;
      }

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-left: 6px;
        padding-bottom: 10px;
        margin-bottom: 30px;
      }

      .characters-list {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 0 10px;
      }

      .character-card {
        min-width: 250px;
        border: 0;
        border-radius: 4px;
        background: linear-gradient(
          to top right,
        #1c1c1c,
        #161616 50%
        );
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        align-items: center;
        padding: 12px;
      }

      .character-info h4 {
        font-size: 1.5rem;
      }

      .level {
        font-weight: bold;
        font-size: 0.85rem;
        color: #5b90a5;
      }

      .gold {
        font-weight: bold;
        font-size: 0.85rem;
        color: #ebc855;
      }

      .stats-list {
        display: flex;
        gap: 4px;
        font-size: 0.85rem;
        margin-top: 10px;
        flex-wrap: wrap;

      }

      .stats-list li {
        width: 50px;
        text-align: center;
        color: var(--font-color);
        font-weight: bold;
        background-color: #111;
        border-radius: 2px;
        padding: 3px 5px;
      }

      @media screen (max-width: 450px) {
        :host {
          font-size: 14px;
        }
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
            <h4>${character.name}</h4>
            <div>
              <span class="level">Level ${character.level}</span>
              <svg style="margin: 0 10px;" width="12" height="12">
                <rect
                  x="7"
                  y="-2"
                  width="5"
                  height="5"
                  rx="1"
                  transform="rotate(45)"
                  fill="var(--font-color)"
                />
              </svg>
              <span class="gold">Gold ${character.gold}</span>
            </div>
            <ul class="stats-list">
              <li>Str ${character.strength}</li>
              <li>Dex ${character.dexterity}</li>
              <li>Con ${character.constitution}</li>
              <li>Int ${character.intelligence}</li>
              <li>Wis ${character.wisdom}</li>
              <li>Cha ${character.charism}</li>
            </ul>
          </div>
        </div>
      `
    })

    return html`
      <ignem-header />

      <section class="container">
        <h2 class="characters-title">Characters</h2>

        <div class="characters-list">
          ${charactersElements}
        </div>
      </section>
    `
  }
}

customElements.define('ignem-characters', IgnemCharactersPage)
