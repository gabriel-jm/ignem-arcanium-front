import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

export class IgnemCreateAccountPage extends IgnemElement {
  render() {
    return html`
      <h1>Create Account</h1>
    `
  }
}

customElements.define('ignem-create-account', IgnemCreateAccountPage)
