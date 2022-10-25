import { IgnemCreateCharacterPage } from '../../ignem-create-character-page'
import { html } from 'lithen-tag-functions'
import { textBetweenDashes } from '@/ui/view/components'

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
    <div step="2">
      ${textBetweenDashes('Attributes')}

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
    </div>
  `
}
