import { css, html } from 'lithen-fns'
import { buttonStyles, containerStyles } from '@/common/ui/styles/index.js'
import { router } from '@/main/config/routes.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'

const homePageStyles = css`
  ${[containerStyles, buttonStyles]}

  ul {
    margin-top: 20px;
  }
`

export function homePage() {
  const accountStore = new AccountStore()
  const accountName = accountStore.account?.name

  return html`
    <ignem-wrapper css="${homePageStyles}">
      <ignem-header />

      <section class="container">
        <h2>Welcome ${accountName}!</h2>

        <ul>
          <li>
            <button
              class="btn"
              on-click=${() => router.navigate('/characters')}
            >
              Characters
            </button>
          </li>
        </ul>
      </section>
    </ignem-wrapper>
  `
}
