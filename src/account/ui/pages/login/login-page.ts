import { router } from '@/main/config/routes.js'
import { html } from 'lithen-fns'
import { IgnemElement } from '@/ui/view/ignem-element.js'
import { Presenter } from '@/presentation/protocols/index.js'
import { SuccessNotifier } from '@/ui/protocols/index.js'
import { loginStyles } from './login-styles.js'
import { CustomForm, inputField, loadingIcon, lockButtonUntil } from '@/common/ui/index.js'
import { textBetweenDashes } from '@/common/ui/components/singles/text-between-dashes.js'

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
        return router.navigate('/home')
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
        router.navigate('/home')
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
            on-click=${() => router.navigate('/create-account')}
          >
            Create account
          </button>
        </form>
      </section>
    `
  }
}

customElements.define('ignem-login', LoginPage)
