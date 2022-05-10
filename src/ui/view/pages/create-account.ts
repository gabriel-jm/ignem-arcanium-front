import { Presenter } from '@/presentation/protocols'
import { SuccessNotifier } from '@/ui/protocols'
import { buttonStyles, containerStyles, inputStyles } from '@/ui/view'
import { IgnemFormElement } from '@/ui/view/components'
import { ignemInput } from '@/ui/view/components/form/input'
import { IgnemElement } from '@/ui/view/ignem-element'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class IgnemCreateAccountPage extends IgnemElement {
  #createAccountPresenter: Presenter
  #successNotifier: SuccessNotifier
  #btnBlocked = false

  constructor(
    createAccountPresenter: Presenter,
    successNotifier: SuccessNotifier
  ) {
    super()
    this.#createAccountPresenter = createAccountPresenter
    this.#successNotifier = successNotifier

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

      const { validationErrors: errors } = result

      form.setErrors({
        ...errors,
        ...errors?.name && { userName: errors.name }
      })

      if (result.ok) {
        form.reset()
        this.#successNotifier.notifySuccess(
          'Created',
          'Account created with success'
        )
        router.goTo('/torches')
      }

      this.#block = false
    }

    return html`
      <section class="container">
        <form is="ignem-form" class="account-form" on-submit=${handleSubmit}>
          <h1 class="form-title">Create Account</h1>
          
          ${ignemInput({
            label: 'Name',
            name: 'userName',
            className: 'input',
            placeholder: 'Name'
          })}

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
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-account', IgnemCreateAccountPage)
