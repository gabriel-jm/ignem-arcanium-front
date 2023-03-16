import { IgnemCreateCharacterPage, IgnemCreateCharacterProps } from '../../ignem-create-character-page'
import { html } from 'lithen-fns'
import { IgnemForm } from '@/ui/view/components'
import { capitalize } from '@/common/ui/helpers'
import { textBetweenDashes } from '@/common/ui'

export function characterSecondForm(
  parent: IgnemCreateCharacterPage,
  props: IgnemCreateCharacterProps
) {
  const attributes = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
  ]

  function updateStats() {
    const form = parent.select('form[step="2"]') as IgnemForm
    const data = form.getData<Record<string, number>>({
      level: 'number',
      strength: 'number',
      constitution: 'number',
      intelligence: 'number'
    })

    const { strength,  constitution, intelligence } = data
    const level = parent.characterData.level ?? 1
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
      const inputData = e.data?.replace(/[^0-6]/g, '') ?? ''

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

  async function onSubmitForm(event: Event) {
    event.preventDefault()
    const form = event.target as IgnemForm

    const data = form.getData(
      Object.fromEntries(
        attributes.map(attr => [attr, 'number'])
      )
    )

    const result = await props.attributesPresenter.handle(data)

    for (const attr of attributes) {
      if (result.validationErrors?.[attr]) {
        form.select(`[attr="${attr}"]`).classList.add('error')
        continue
      }

      form.select(`[attr="${attr}"]`).classList.remove('error')
    }

    if (result.ok) {
      parent.characterData = {
        ...parent.characterData,
        ...data
      }
      parent.next()
    }
  }

  const attributeInputs = attributes.map((attr, index, arr) => {
    return html`
      <label class="attr-input-group" attr=${attr}>
        <span>${capitalize(attr)}</span>
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
    <form
      is="ignem-form"
      class="character-form"
      step="2"
      on-submit=${onSubmitForm}
    >
      ${textBetweenDashes('Attributes')}

      <p class="attributes-warn">
        The attributes must have a value between 0 and 6.
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

      <div class="form-buttons">
        <button
          class="btn-bordered"
          type="button"
          on-click=${() => parent.previous()}
        >
          Previous
        </button>
        <button class="btn">Next</button>
      </div>
    </form>
  `
}
