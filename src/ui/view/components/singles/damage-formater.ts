import { captalize } from '@/ui/helpers'
import { css, html } from 'lithen-tag-functions'

export interface DamageFormaterProps {
  damage: string
  type: string
}

export const damageFormaterStyles = css`
  .damage-container {
    display: block;
    margin-top: 4px;
  }

  .damage-container span:first-of-type {
    margin-right: 6px;
  }

  .type {
    --bg: transparent;

    text-transform: capitalize;
    border-radius: 2px;
    background-color: var(--bg);
    padding: 0 4px;
    font-size: 0.86rem;
  }

  .damage-container.pierce .type {
    --bg: #555;
  }

  .damage-container.slash .type {
    --bg: #5a4545;
  }

  .damage-container.strike .type {
    --bg: #665a45;
  }

  .damage {
    font-weight: bold;
  }
`

export function damageFormater({ damage, type }: DamageFormaterProps) {
  return html`
    <span class="damage-container ${type}">
      <span class="damage">${damage}</span>
      <span class="type">${captalize(type)}</span>
    </span>
  `
}
