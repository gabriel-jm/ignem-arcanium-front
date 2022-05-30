import '@/ui/view'
import { IgnemElement } from '@/ui/view/ignem-element'
import { html } from 'lithen-tag-functions'

export class IgnemHomePage extends IgnemElement {
  render() {
    return html`
      <ignem-header />

      <h1>Welcome!</h1>
    `
  }
}

customElements.define('ignem-home', IgnemHomePage)
