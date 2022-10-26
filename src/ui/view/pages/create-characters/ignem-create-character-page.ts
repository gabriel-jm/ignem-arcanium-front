import '../../components/header/header'
import { css, html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import { SuperElementRenderValues } from 'lithen-super-element'
import { containerStyles, formControlStyles } from '@/ui/view/styles'
import {
  breadcrumbs,
  IgnemFormElement,
  textBetweenDashesStyles
} from '@/ui/view/components'
import { characterFirstForm } from './forms/first/character-first-form'
import { characterSecondForm } from './forms/second/character-second-form'
import { characterFourthForm } from './forms/fourth/character-fourth-form'
import { Presenter } from '@/presentation/protocols'
import { itemTinyCardStyles } from '@/ui/view/components/item'
import { characterFirstFormStyles } from './forms/first/character-first-form-styles'
import { characterSecondFormStyles } from './forms/second/character-second-form-styles'
import { characterFourthFormStyles } from './forms/fourth/character-fourth-form-styles'
import { characterThirdForm } from './forms/third/character-third-form'
import { characterThirdFormStyles } from './forms/third/character-third-form-styles'

export class IgnemCreateCharacterPage extends IgnemElement {
  #listItemsPresenter: Presenter
  
  constructor(
    listAllDefaultItemsPresenter: Presenter
  ) {
    super()
    this.#listItemsPresenter = listAllDefaultItemsPresenter

    this.init()
  }

  get form() {
    return this.select<IgnemFormElement>('[form]')!
  }

  async init() {
    await this.#listItemsPresenter.handle()
    this.dispatchEvent(new Event('init'))


  }

  styling() {
    const aditionalStyles = [
      containerStyles,
      formControlStyles,
      textBetweenDashesStyles,
      itemTinyCardStyles,
      characterFirstFormStyles,
      characterSecondFormStyles,
      characterThirdFormStyles,
      characterFourthFormStyles
    ]

    return css`
      ${aditionalStyles}

      .explanatory-message {
        text-align: center;
        color: var(--sub-font-color);
        margin: 10px 0 20px 0;
        padding: 0 16px;
      }

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      [step]:not(.active) {
        display: none;
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

        <ignem-steps />

        <form form is="ignem-form" class="character-form">
          ${[
            characterFirstForm(this),
            characterSecondForm(this),
            characterThirdForm(this),
            characterFourthForm(this)
          ]}
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
