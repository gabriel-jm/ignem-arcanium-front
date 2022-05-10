import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import { IgnemFormElement, ignemInput } from '@/ui/view/components'
import { containerStyles, buttonStyles, inputStyles } from '@/ui/view/styles'
import { Presenter } from '@/presentation/protocols'
import { SetAccountStore } from '@/ui/protocols/stores'
import { SuccessNotifier } from '@/ui/protocols'

export class IgnemLoginPage extends IgnemElement {
  #accountLoginPresenter: Presenter
  #setAccountStore: SetAccountStore
  #successNotifier: SuccessNotifier
  #btnBlocked = false

  constructor(
    accountLoginPresenter: Presenter,
    setAccountStore: SetAccountStore,
    successNotifier: SuccessNotifier
  ) {
    super()
    this.#accountLoginPresenter = accountLoginPresenter
    this.#setAccountStore = setAccountStore
    this.#successNotifier = successNotifier
  }

  set #block(value: boolean) {
    this.#btnBlocked = value
    value && this.select('.btn')?.setAttribute('disabled', '')
    !value && this.select('.btn')?.removeAttribute('disabled')
  }

  styling() {
    return css`
      ${[containerStyles, buttonStyles, inputStyles]}

      .container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to bottom right, #0d0d0d, #121212);
      }

      .login-form {
        max-width: 320px;
        padding: 20px;
      }

      .form-title {
        font-size: 2.4rem;
        text-align: center;
        margin-bottom: 45px;
      }

      .login-form label {
        display: block;
        margin: 8px 0;
      }

      .btn {
        width: 100%;
        margin-top: 16px;
      }

      .btn:disabled {
        pointer-events: none;
        filter: brightness(0.6);
      }

      .or {
        color: var(--sub-font-color);
        margin: 30px 0;
        text-align: center;
        position: relative;
        z-index: 2;
      }

      /*.or::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        display: block;
        background-color: var(--sub-font-color);
      }*/

      .or > span {
        display: inline-block;
        background-color: transparent;
        width: 80px;
      }

      .link {
        display: block;
        text-decoration: underline;
        background-color: transparent;
        border: 0;
        font-size: 1.2rem;
        font-weight: normal;
        font-family: var(--font-family);
        width: 100%;
        text-align: center;
        cursor: pointer;
        color: var(--sub-font-color);
      }
    `
  }

  render() {
    const handleSubmit = async (event: Event) => {
      event.preventDefault()

      if (this.#btnBlocked) return

      this.#block = true

      const form = this.select<IgnemFormElement>('form')

      const formData = {
        email: form?.email.value,
        password: form?.password.value
      }

      const result = await this.#accountLoginPresenter.handle(formData)

      form?.setErrors(result.validationErrors)

      if (result.ok) {
        this.#setAccountStore.account = {
          name: result.data.name
        }
        form?.reset()
        this.#successNotifier.notifySuccess(
          'Success',
          'Logged in with success'
        )
;        router.goTo('/torches')
      }

      this.#block = false
    }
  
    return html`
      <section class="container">
        <form is="ignem-form" class="login-form" on-submit=${handleSubmit}>
          <h1 class="form-title">Login</h1>

          ${ignemInput({
            label: 'E-Mail',
            name: 'email',
            className: 'input',
            placeholder: 'E-Mail'
          })}

          ${ignemInput({
            label: 'Password',
            className: 'input',
            name: 'password',
            type: 'password',
            placeholder: 'Password'
          })}

          <button class="btn">Send</button>

          <p class="or">
            <span>OR</span>
          </p>

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
