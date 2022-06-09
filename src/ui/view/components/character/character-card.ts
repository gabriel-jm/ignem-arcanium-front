import { css, html } from 'lithen-tag-functions'

interface CharacterCardProps {
  id: string
  name: string
  icon: string
  level: number
  gold: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charism: number
}

export const characterCardStyles = css`
  .character-card {
    min-width: 250px;
    max-width: 440px;
    border: 0;
    border-radius: 4px;
    background-image: linear-gradient(
      to top right,
      #212121,
      #141414 40%
    );
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: all 250ms ease;
  }

  .character-card:hover, .character-card:focus {
    box-shadow: 0 0 1px 2px var(--container-border-color);
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
`

export function characterCard(character: CharacterCardProps) {
  return html`
    <div class="character-card" tabindex="0">
      <figure>
        <img width="70px" height="70px" src="${character.icon}" />
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
}
