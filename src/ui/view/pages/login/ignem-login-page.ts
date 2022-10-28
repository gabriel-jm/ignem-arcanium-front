import { router } from 'lithen-router'
import { html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import {
  IgnemForm,
  ignemInput,
  loadingIcon,
  lockButtonUntil,
  textBetweenDashes
} from '@/ui/view/components'
import { Presenter } from '@/presentation/protocols'
import { SuccessNotifier } from '@/ui/protocols'
import { loginStyles } from '@/ui/view/pages/login/login-styles'

export class IgnemLoginPage extends IgnemElement {
  static tokenChecked = false

  #accountLoginPresenter: Presenter
  #checkTokenExists: Presenter
  #successNotifier: SuccessNotifier

  constructor(
    accountLoginPresenter: Presenter,
    checkTokenExists: Presenter,
    successNotifier: SuccessNotifier
  ) {
    super()
    this.#accountLoginPresenter = accountLoginPresenter
    this.#checkTokenExists = checkTokenExists
    this.#successNotifier = successNotifier

    this.init()
  }

  async init() {
    if (!IgnemLoginPage.tokenChecked) {
      IgnemLoginPage.tokenChecked = true
      const result = await this.#checkTokenExists.handle()

      if (!result.ok) {
        this.select('.loading')?.classList.add('hide')
      }
    } else {
      this.select('.loading')?.classList.add('hide')
    }
  }

  styling() {
    return loginStyles
  }

  render() {
    const getButton = this.select.bind(this, '.link')
    const handleSubmit = lockButtonUntil(getButton, async () => {
      const form = this.select<IgnemForm>('form')

      const formData = form?.getData({
        email: 'string',
        password: 'string'
      })

      const result = await this.#accountLoginPresenter.handle(formData)

      form?.setErrors(result.validationErrors)

      if (result.ok) {
        form?.reset()
        this.#successNotifier.notifySuccess(
          'Success',
          'Logged in with success'
        )
        router.goTo('/home')
      }
    })
  
    return html`
      <div class="loading">${loadingIcon()}</div>
      <section class="container">
        <form is="ignem-form" class="login-form" on-submit=${handleSubmit}>
          <h1 class="form-title">Login</h1>

          ${[
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

          ${textBetweenDashes('OR')}

          <button
            class="link"
            on-click=${() => router.goTo('/create-account')}
          >
            Create account
          </button>
        </form>
      </section>
    `
  }
}

customElements.define('ignem-login', IgnemLoginPage)
