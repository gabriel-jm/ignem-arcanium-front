import { buttonStyles } from '@/ui/view/styles/index.js'
import { css, html } from 'lithen-fns'
import { router } from 'lithen-router'

const notFoundStyle = css`
  ${buttonStyles}

  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export function notFoundPage() {
  return html`
    <ignem-wrapper css="${notFoundStyle}">
      <h1>Page Not Found</h1>
      <button
        class="btn"
        on-click=${() => router.goTo('/home')}
      >
        Home
      </button>
    </ignem-wrapper>
  `
}
