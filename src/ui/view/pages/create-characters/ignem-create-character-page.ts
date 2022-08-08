import '../../components/header/header'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { containerStyles, formControlStyles } from '@/ui/view/styles'
import { breadcrumbs, IgnemFormElement, textBetweenDashes, textBetweenDashesStyles } from '@/ui/view/components'
import { characterFirstForm, characterFirstFormStyles } from './forms/character-first-form'
import { characterSecondForm, characterSecondFormStyles } from './forms/character-second-form'
import { SuperElementRenderValues } from 'lithen-super-element'

export class IgnemCreateCharacterPage extends IgnemElement {
  get form() {
    return this.select<IgnemFormElement>('form.character-form')!
  }

  styling() {
    const aditionalStyles = [
      containerStyles,
      formControlStyles,
      textBetweenDashesStyles,
      characterFirstFormStyles,
      characterSecondFormStyles
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

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1 class="characters-title">Create Character</h1>
        <form is="ignem-form" class="character-form">
          ${[
            characterFirstForm(this),
            textBetweenDashes('Attributes'),
            characterSecondForm(this),
            textBetweenDashes('Inventory')
          ]}
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
