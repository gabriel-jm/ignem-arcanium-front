import { buttonStyles } from '@/common/ui/styles/index.js'
import { css, html } from 'lithen-fns'
import { router } from '@/main/config/routes.js'

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
        on-click=${() => router.navigate('/home')}
      >
        Home
      </button>
    </ignem-wrapper>
  `
}
