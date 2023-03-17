import { trashIcon } from '@/common/ui/index.js'
import { characterStatsStyles } from '@/ui/view/styles/index.js'
import { css, html } from 'lithen-fns'

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
  charisma: number
}

export const characterCardStyles = css`
  ${characterStatsStyles}

  .character-card {
    min-height: 114px;
    min-width: 250px;
    width: 425px;
    border: 0;
    border-radius: 4px;
    background-image: linear-gradient(
      to top right,
      var(--body-bg-color),
      #141414 45%
    );
    display: flex;
    justify-content: flex-start;
    gap: 16px;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 250ms ease;
  }

  .character-card:hover, .character-card:focus {
    box-shadow: 0 0 1px 2px var(--container-border-color);
  }

  .character-header {
    display: flex;
    justify-content: space-between;
  }

  .character-info h1 {
    font-size: 1.5rem;
  }

  .stats-list {
    display: flex;
    gap: 3px;
    font-size: 0.85rem;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  .stats-list li {
    width: 48px;
    text-align: center;
    color: var(--font-color);
    font-weight: bold;
    background-color: #111;
    border-radius: 2px;
    padding: 3px 4px;
  }
`

export function characterCard(
  character: CharacterCardProps,
  onClick: Function,
  onDelete: Function
) {
  return html`
    <div
      class="character-card"
      key-id="${character.id}"
      tabindex="0"
      on-click=${onClick}
    >
      <figure>
        <img
          width="70px"
          height="70px"
          src="${character.icon}"
          alt="Character icon"
        />
      </figure>
      <div class="character-info">
        <div class="character-header">  
          <h1>${character.name}</h1>
          <div on-click=${(event: Event) => {
            event.stopPropagation()
            onDelete()
          }}>
            ${trashIcon()}
          </div>
        </div>
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
          <li>Cha ${character.charisma}</li>
        </ul>
      </div>
    </div>
  `
}
