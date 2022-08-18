import '../../components/header/header'
import { css, html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import { SuperElementRenderValues } from 'lithen-super-element'
import { containerStyles, formControlStyles } from '@/ui/view/styles'
import {
  breadcrumbs,
  IgnemFormElement,
  textBetweenDashes,
  textBetweenDashesStyles
} from '@/ui/view/components'
import { characterFirstForm } from './forms/first/character-first-form'
import { characterSecondForm } from './forms/second/character-second-form'
import { characterThirdForm } from './forms/third/character-third-form'
import { Presenter } from '@/presentation/protocols'
import { itemTinyCardStyles } from '@/ui/view/components/item'
import { characterFirstFormStyles } from './forms/first/character-first-form-styles'
import { characterSecondFormStyles } from './forms/second/character-second-form-styles'
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
      characterThirdFormStyles
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
        <form form is="ignem-form" class="character-form">
          ${[
            characterFirstForm(this),
            textBetweenDashes('Attributes'),
            characterSecondForm(this),
            textBetweenDashes('Inventory'),
            characterThirdForm(this)
          ]}
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
