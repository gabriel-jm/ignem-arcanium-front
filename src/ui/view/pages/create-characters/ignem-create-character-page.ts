import '../../components/header/header'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { containerStyles, formControlStyles } from '@/ui/view/styles'
import { breadcrumbs, textBetweenDashes, textBetweenDashesStyles } from '@/ui/view/components'
import { characterFirstForm, characterFirstFormStyles } from './forms/character-first-form'
import { SuperElementRenderValues } from 'lithen-super-element'

export class IgnemCreateCharacterPage extends IgnemElement {
  styling() {
    const aditionalStyles = [
      containerStyles,
      formControlStyles,
      textBetweenDashesStyles
    ]

    return css`
      ${aditionalStyles}

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      ${characterFirstFormStyles}

      .attributes {
        min-width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        font-weight: bold;
        justify-content: space-around;
        padding: 0 30px;
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

      @media screen and (max-width: 375px) {
        .first-form {
          display: flex;
          flex-direction: column;
        }
      }
    `
  }
  
  render(): SuperElementRenderValues {
    const breadcrumbProps = {
      Home: '/home',
      Characters: '/characters',
      'Create Character': 'current'
    }

    const attributes = [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma'
    ]

    const onInputAttribute = (nextAttribute?: string) => {
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
          this.select<HTMLInputElement>(query)?.focus()
        } else {
          input.blur()
        }
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
            on-input=${onInputAttribute(arr[index + 1]) as EventListener}
          />
        </label>
      `
    })

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1 class="characters-title">Create Character</h1>
        <form is="ignem-form" class="character-form">
          ${characterFirstForm(this)}

          ${textBetweenDashes('Attributes')}

          <div class="attributes">
            ${attributeInputs}
          </div>
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
