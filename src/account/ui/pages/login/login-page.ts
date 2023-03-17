import { router } from 'lithen-router'
import { html } from 'lithen-fns'
import { IgnemElement } from '@/ui/view/ignem-element'
import { Presenter } from '@/presentation/protocols'
import { SuccessNotifier } from '@/ui/protocols'
import { loginStyles } from './login-styles'
import { CustomForm, inputField, lockButtonUntil, textBetweenDashes } from '@/common/ui'
import { loadingIcon } from '@/ui/view/components'

export class LoginPage extends IgnemElement {
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
    if (!LoginPage.tokenChecked) {
      LoginPage.tokenChecked = true
      const result = await this.#checkTokenExists.handle()

      if (result.ok) {
        return router.goTo('/home')
      }
    }
    
    this.select('.loading')?.classList.add('hide')
  }

  styling() {
    return loginStyles
  }

  render() {
    const getButton = this.select.bind(this, '.link')
    const handleSubmit = lockButtonUntil(getButton, async () => {
      const form = this.select<CustomForm>('form')

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
            inputField({
              label: 'E-Mail',
              name: 'email',
              className: 'input',
              placeholder: 'E-Mail'
            }),
            
            inputField({
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

customElements.define('ignem-login', LoginPage)
