import { buttonStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-fns'
import { router } from 'lithen-router'

const introPageStyles = css`
  ${buttonStyles}

  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: linear-gradient(
      to top left,
      #2a2a2a,
      #050505
    );
  }

  h1 {
    margin-bottom: 20px;
    text-align: center;
    padding: 0 12px;
  }
`

export function introPage() {
  function onClick() {
    router.goTo('/login')
  }

  return html`
    <ignem-wrapper css="${introPageStyles}">
      <h1>Welcome to Ignem Arcanium</h1>
      <button class="btn" on-click=${onClick}>
        Login
      </button>
    </ignem-wrapper>
  `
}
