import '@/ui/view/components/index.js'
import { IgnemElement } from '@/ui/view/ignem-element.js'
import { css, html } from 'lithen-fns'
import { buttonStyles, containerStyles } from '@/ui/view/styles/index.js'
import { router } from 'lithen-router'
import { AccountStore } from '@/account/ui/stores/account-store.js'

export class IgnemHomePage extends IgnemElement {
  styling() {
    return css`
      ${[containerStyles, buttonStyles]}

      ul {
        margin-top: 20px;
      }
    `
  }

  render() {
    const accountStore = new AccountStore()
    const accountName = accountStore.account?.name

    return html`
      <ignem-header />

      <section class="container">
        <h2>Welcome ${accountName}!</h2>

        <ul>
          <li>
            <button
              class="btn"
              on-click=${() => router.goTo('/characters')}
            >
              Characters
            </button>
          </li>
        </ul>
      </section>
    `
  }
}

customElements.define('ignem-home', IgnemHomePage)
