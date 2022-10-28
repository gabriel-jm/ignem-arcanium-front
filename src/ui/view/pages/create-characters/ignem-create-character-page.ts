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

interface IgnemCreateCharacterProps {
  listItemsPresenter: Presenter,
  generalInfoPresenter: Presenter
}

export class IgnemCreateCharacterPage extends IgnemElement {
  #props: IgnemCreateCharacterProps
  #formsSubmition = [
    this.#firstFormSubmition,
  ]
  
  constructor(props: IgnemCreateCharacterProps) {
    super()
    this.#props = props

    this.init()
  }

  get form() {
    return this.select<IgnemForm>('[form]')!
  }

  async init() {
    await this.#props.listItemsPresenter.handle()
    this.dispatchEvent(new Event('init'))
  }

  #firstFormSubmition(form: IgnemForm) {
    const data = form.getData({
      name: 'string',
      alignment: 'string',
      level: 'number',
      gold: 'number',
      description: 'string'
    })


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

    const onSubmitForm = (event: Event) => {
      event.preventDefault()
      const currentStep = this.select<IgnemSteps>('ignem-steps').currentStep
      const form = this.select<IgnemForm>(`form[step="${currentStep}"]`)

      this.#formsSubmition[currentStep - 1](form)
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1 class="characters-title">Create Character</h1>

        <ignem-steps
          steps="${steps.join(',')}"
        />

        ${[
          characterFirstForm(this),
          characterSecondForm(this),
          characterThirdForm(this),
          characterFourthForm(this)
        ]}
        <div class="form-buttons">
          <button class="btn-bordered">Previous</button>
          <button class="btn" on-click=${onSubmitForm}>Next</button>
        </div>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
