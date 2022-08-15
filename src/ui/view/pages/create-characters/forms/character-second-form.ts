import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { tooltipStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

export const characterSecondFormStyles = css`
  ${tooltipStyles}

  .attributes-warn {
    text-align: center;
    color: var(--sub-font-color);
    margin: 10px 0 30px 0;
    padding: 0 16px;
  }

  .stats-container {
    margin-bottom: 40px;
    text-align: center;
  }

  .stats-container span {
    display: inline-block;
    width: 200px;
    margin: 8px;
    background-color: var(--black);
    padding: 8px;
    border-radius: 4px;
    cursor: default;
  }

  .attributes {
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    font-weight: bold;
    justify-content: space-around;
    padding: 0 30px;
    padding-bottom: 15px;
  }

  .attr-input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    width: 160px;
    min-width: 160px;
    background-color: #3a3a3a;
    padding: 8px 10px;
    border-radius: 4px;
    text-align: center;
    transition: all 300ms ease-in-out;
  }

  .attr-input-group input {
    display: inline-block;
    width: 30px;
    border: 0;
    padding: 2px 4px;
    border-radius: 4px;
    background-color: var(--body-bg-color);
    color: var(--font-color);
    font-size: 0.95rem;
    text-align: center;
    appearance: textfield;
  }

  .attr-input-group input::-webkit-outer-spin-button,
  .attr-input-group input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .attr-input-group:focus-within {
    box-shadow: 0 0 0 2px var(--outline-white);
    color: var(--font-color);
  }

  .attr-input-group.error {
    background-color: var(--danger);
  }
  
  .attr-input-group.error:focus-within {
    box-shadow: 0 0 0 2px var(--semitransparent-danger);
  }
`

export function characterSecondForm(parent: IgnemCreateCharacterPage) {
  const attributes = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
  ]

  function updateStats() {
    const data = parent.form.getData<Record<string, number>>({
      level: 'number',
      strength: 'number',
      constitution: 'number',
      intelligence: 'number'
    })

    const { strength,  constitution, intelligence } = data
    const level = data.level ?? 1
    const hp = constitution * level + strength + 10
    const mp = intelligence * level + 10

    parent.select('[level]')!.textContent = `Level ${level}`
    parent.select('[hp]')!.textContent = `Health Points ${hp}`
    parent.select('[mp]')!.textContent = `Mana Points ${mp}`
  }

  function onInputAttribute(nextAttribute?: string) {
    return (e: InputEvent) => {
      e.preventDefault()
      const input = e.target as HTMLInputElement
      const inputData = e.data?.replace(/[^1-6]/g, '') ?? ''

      input.value = inputData
      
      if (!input.value) return
      
      if (input.parentElement?.classList.contains('error')) {
        input.parentElement?.classList.remove('error')
      }

      if (nextAttribute) {
        const query = `input[name=${nextAttribute}]`
        parent.select<HTMLInputElement>(query)?.focus()
      } else {
        input.blur()
      }

      updateStats()
    }
  }

  const attributeInputs = attributes.map((attr, index, arr) => {
    const captalizedAttribute = attr[0].toUpperCase() + attr.substring(1)

    return html`
      <label class="attr-input-group" attr=${attr}>
        <span>${captalizedAttribute}</span>
        <input
          name="${attr}"
          type="number"
          on-input=${onInputAttribute(arr[index + 1])}
        />
      </label>
    `
  })

  const hpCalcExplain = 'Health points are calculated by: Constitution x Level + Strength + 10'
  const mpCalcExplain = 'Mana points are calculated by: Intelligence x Level + 10'

  return html`
    <p class="attributes-warn">
      The attributes must have a value between 1 and 6.
    </p>

    <div class="stats-container">
      <span level>Level 1</span>
      <span hp data-tooltip="${hpCalcExplain}">
        Health Points 10
      </span>
      <span mp data-tooltip="${mpCalcExplain}">
        Mana Points 10
      </span>
    </div>

    <div class="attributes">
      ${attributeInputs}
    </div>
  `
}
