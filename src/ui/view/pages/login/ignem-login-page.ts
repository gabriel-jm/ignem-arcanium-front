import { router } from 'lithen-router'
import { html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import {
  IgnemFormElement,
  ignemInput,
  loadingIcon,
  textBetweenDashes
} from '@/ui/view/components'
import { Presenter } from '@/presentation/protocols'
import { SuccessNotifier } from '@/ui/protocols'
import { loginStyles } from '@/ui/view/pages/login/login-styles'

let tokenChecked = false

export class IgnemLoginPage extends IgnemElement {
  #accountLoginPresenter: Presenter
  #checkTokenExists: Presenter
  #successNotifier: SuccessNotifier
  #btnBlocked = false

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
    if (!tokenChecked) {
      tokenChecked = true
      const result = await this.#checkTokenExists.handle()

      if (!result.ok) {
        this.select('.loading')?.classList.add('hide')
      }
    } else {
      this.select('.loading')?.classList.add('hide')
    }
  }

  set #block(value: boolean) {
    this.#btnBlocked = value
    this.select<HTMLButtonElement>('.btn')!.disabled = value
  }

  styling() {
    return loginStyles
  }

  render() {
    const handleSubmit = async (event: Event) => {
      event.preventDefault()

      if (this.#btnBlocked) return

      this.#block = true

      const form = this.select<IgnemFormElement>('form')

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

      this.#block = false
    }
  
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
