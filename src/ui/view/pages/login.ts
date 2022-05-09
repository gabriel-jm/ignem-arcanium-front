import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'
import { ignemInput } from '@/ui/view/components'
import { containerStyles, buttonStyles, inputStyles } from '@/ui/view/styles'
import { Presenter } from '@/presentation/protocols'

export class IgnemLoginPage extends IgnemElement {
  #accountLoginPresenter: Presenter;

  constructor(accountLoginPresenter: Presenter) {
    super()
    this.#accountLoginPresenter = accountLoginPresenter
  }

  styling() {
    return css`
      ${[containerStyles, buttonStyles, inputStyles]}

      .container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
    `
  }

  render() {
    const handleSubmit = async (event: Event) => {
      event.preventDefault()

      const form = this.select<HTMLFormElement>('form')

      const formData = {
        email: form?.email.value,
        password: form?.password.value
      }

      const result = await this.#accountLoginPresenter.handle(formData)

      if (result.ok) {
        router.goTo('/torches')
      }
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

          <button class="btn">Create</button>
        </form>
      </section>
    `
  }
}

customElements.define('ignem-login', IgnemLoginPage)
