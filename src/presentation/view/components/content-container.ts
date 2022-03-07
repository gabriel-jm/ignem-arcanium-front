import { IgnemElement } from '@/presentation/view'
import { css, html } from 'lithen-tag-functions'

export class ContentContainer extends IgnemElement {
  constructor() {
    super()
    this.applyRender()
  }

  styling() {
    return css`
      div[part="container"] {
        display: block;
        max-width: var(--max-content-width);
        margin: auto;
      }
    `
  }

  render() {
    return html`
      <div part="container">
        <slot />
      </div>
    `
  }
}

customElements.define('ignem-content-container', ContentContainer)
