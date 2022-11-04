import '../../components/header/header'
import { css, html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import { SuperElementRenderValues } from 'lithen-super-element'
import {
  borderedButtonStyles,
  buttonStyles,
  containerStyles,
  formControlStyles
} from '@/ui/view/styles'
import {
  breadcrumbs,
  IgnemForm,
  IgnemSteps,
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
import { CreateCharacterParams } from '@/domain/protocols/use-cases'

export interface IgnemCreateCharacterProps {
  listItemsPresenter: Presenter
  generalInfoPresenter: Presenter
  attributesPresenter: Presenter
}

export class IgnemCreateCharacterPage extends IgnemElement {
  #props: IgnemCreateCharacterProps
  characterData!: CreateCharacterParams
  
  constructor(props: IgnemCreateCharacterProps) {
    super({ preventRender: true })
    this.#props = props

    this.applyRender()
    this.init()
  }

  get form() {
    return this.select<IgnemForm>('[form]')!
  }

  async init() {
    await this.#props.listItemsPresenter.handle()
    this.dispatchEvent(new Event('init'))
  }

  next() {
    this.#changeStepForm(1)
  }

  previous() {
    this.#changeStepForm(-1)
  }

  #changeStepForm(direction: number) {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    const ignemSteps = this.select<IgnemSteps>('ignem-steps')

    this.select(`form[step="${ignemSteps.currentStep}"]`)
      .classList.remove('active')

    direction > 0 ? ignemSteps.next() : ignemSteps.previous()

    this.select(`form[step="${ignemSteps.currentStep}"]`)
      .classList.add('active')
  }

  styling() {
    const aditionalStyles = [
      containerStyles,
      formControlStyles,
      textBetweenDashesStyles,
      itemTinyCardStyles,
      buttonStyles,
      borderedButtonStyles,
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

      .character-form {
        padding-top: 32px;
      }

      [step]:not(.active) {
        display: none;
      }

      .form-buttons {
        display: flex;
        justify-content: flex-end;
        padding: 24px 0;
      }

      .form-buttons button {
        width: 150px;
        margin: 0 12px;
      }
    `
  }
  
  render(): SuperElementRenderValues {
    const breadcrumbProps = {
      Home: '/home',
      Characters: '/characters',
      'Create Character': 'current'
    }
    const steps = [
      'General',
      'Attributes',
      'Equipment',
      'Inventory'
    ]

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1 class="characters-title">Create Character</h1>

        <ignem-steps
          steps="${steps.join(',')}"
        />

        ${[
          characterFirstForm(this, this.#props),
          characterSecondForm(this, this.#props),
          characterThirdForm(this),
          characterFourthForm(this)
        ]}
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
