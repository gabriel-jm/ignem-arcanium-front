import { Presenter } from '@/presentation/protocols'
import { IgnemForm, ignemInput, lockButtonUntil } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { createAccountStyles } from './create-account-styles'
import { router } from 'lithen-router'
import { html } from 'lithen-tag-functions'
import { UiNotifier } from '@/common/ui/notifiers'

export class CreateAccountPage extends IgnemElement {
  #createAccountPresenter: Presenter

  constructor(
    createAccountPresenter: Presenter
  ) {
    super()
    this.#createAccountPresenter = createAccountPresenter
  }

  styling() {
    return createAccountStyles
  }
  
  render() {
    const getButton = this.select.bind(this, '.btn')
    const handleSubmit = lockButtonUntil(getButton, async () => {
      const form = this.select<IgnemForm>('form')!
      const formData = form.getData({
        name: 'string',
        email: 'string',
        password: 'string'
      })

      const result = await this.#createAccountPresenter.handle(formData)

      const { validationErrors: errors } = result

      form.setErrors({
        ...errors,
        ...errors?.name && { userName: errors.name }
      })

      if (result.ok) {
        form.reset()
        new UiNotifier().notifySuccess(
          'Created',
          'Account created with success'
        )
        router.goTo('/home')
      }
    })

    return html`
      <section class="container">
        <form is="ignem-form" class="account-form" on-submit=${handleSubmit}>
          <h1 class="form-title">Create Account</h1>
          
          ${[
            ignemInput({
              label: 'Name',
              name: 'name',
              className: 'input',
              placeholder: 'Name'
            }),

            ignemInput({
              label: 'E-Mail',
              name: 'email',
              className: 'input',
              placeholder: 'E-Mail'
            }),

            ignemInput({
              label: 'Password',
              className: 'input',
              name: 'password',
              type: 'password',
              placeholder: 'Password'
            })
          ]}

          <button class="btn">Send</button>
          <p class="login-message">
            Already have an account? &nbsp;
            <span
              class="link"
              on-click=${() => router.goTo('/login')}
            >
              Log in
            </span>
          </p>
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-account', CreateAccountPage)
