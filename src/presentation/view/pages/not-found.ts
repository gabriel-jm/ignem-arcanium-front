import { IgnemElement } from '@/presentation/view'
import { html } from 'lithen-tag-functions'

export class NotFoundPage extends IgnemElement {
  constructor() {
    super()
    this.applyRender()
  }

  render() {
    return html`
      <h1>Not Found</h1>
    `
  }
}

customElements.define('ignem-not-found', NotFoundPage)
