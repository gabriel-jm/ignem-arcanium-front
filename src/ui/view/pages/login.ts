import '../components/wrapper'
import { router } from 'lithen-router'
import { html } from 'lithen-tag-functions'
import { IgnemElement } from '@/ui/view/ignem-element'

export class IgnemLoginPage extends IgnemElement {
  render() {
    function handleClick() {
      router.goTo('/create-account')
    }
  
    return html`
      <h1>Login</h1>
      <button on-click=${handleClick}>
        Create Account
      </button>
    `
  }
}

customElements.define('ignem-login', IgnemLoginPage)
