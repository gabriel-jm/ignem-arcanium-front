import '../components/wrapper'
import { router } from 'lithen-router'
import { html } from 'lithen-tag-functions'

export function loginPage() {
  function handleClick() {
    router.goTo('/create-account')
  }

  const docFrag = html`
    <ignem-wrapper>
      <h1>Login</h1>
      <button on-click=${handleClick}>
        Create Account
      </button>
    </ignem-wrapper>
  `

  return docFrag.firstChild as HTMLElement
}
