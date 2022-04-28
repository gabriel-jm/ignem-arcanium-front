import { Presenter } from '@/presentation/protocols'
import { buttonStyles, containerStyles, inputStyles } from '@/ui/view'
import { IgnemFormElement } from '@/ui/view/components'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

export class IgnemCreateAccountPage extends IgnemElement {
  #createAccountPresenter: Presenter
  #btnBlocked = false

  constructor(createAccountPresenter: Presenter) {
    super()
    this.#createAccountPresenter = createAccountPresenter

    this.applyRender()
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
      }

      .account-form {
        max-width: 320px;
        padding: 20px;
      }

      .form-title {
        font-size: 2.4rem;
        text-align: center;
        margin-bottom: 45px;
      }

      .account-form label {
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

      if (this.#btnBlocked) return

      this.#block = true

      const form = this.select<IgnemFormElement>('form')!
      const formData = {
        name: form.userName.value,
        email: form.email.value,
        password: form.password.value
      }

      const result = await this.#createAccountPresenter.handle(formData)

      if (result.validationErrors) {
        const { validationErrors: errors } = result

        form.setErrors({
          ...errors,
          ...errors.name && { userName: errors.name }
        })
      }

      if (result.ok) {
        form.removeErrors()
      }

      this.#block = false
    }

    return html`
      <section class="container">
        <form is="ignem-form" class="account-form" on-submit=${handleSubmit}>
          <h1 class="form-title">Create Account</h1>
          
          <label>
            <span>Name</span>
            <input
              class="input"
              name="userName"
              placeholder="Name"
            />
            <span class="input-message"></span>
          </label>

          <label>
            <span>E-Mail</span>
            <input
              class="input"
              name="email"
              placeholder="E-Mail"
            />
            <span class="input-message"></span>
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              class="input"
              name="password"
              placeholder="Password"
            />
            <span class="input-message"></span>
          </label>

          <button class="btn">Create</button>
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-account', IgnemCreateAccountPage)
