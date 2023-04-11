import { html, ref } from 'lithen-fns'
import { headerStyles } from './header-styles.js'
import { router } from '@/main/config/routes.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'
import { confirmDialog, logOutIcon, optionsDialog, verticalDotsIcon } from '../index.js'
import { IgnemElement } from '@/common/ui/ignem-element.js'

export class IgnemHeader extends IgnemElement {
  #accountStore = new AccountStore()

  constructor() {
    super({ preventRender: true })
    this.applyRender()
  }

  styling() {
    return headerStyles
  }

  render() {
    const dialogRef = ref<DialogElement>()
    const accountName = this.#accountStore.account?.name

    const openDialog = () => dialogRef.el?.show()
    const onConfirmDialog = () => this.#accountStore.logout()

    return html`
      <header class="container">
        <section class="float-header">
          <div>
            <h1
              class="title"
              on-click=${() => router.navigate('/home')}
            >
              Ignem Arcanium
            </h1>
          </div>
          <div class="user-section">
            <h1 class="account-name">${accountName}</h1>
            <span on-click=${openDialog}>
              ${verticalDotsIcon()}
            </span>
            ${optionsDialog({
              ref: dialogRef,
              options: {
                'Sign Out': {
                  onClick: onConfirmDialog
                },
                'Sign Out 2': {
                  onClick: onConfirmDialog
                },
                'Sign Out 3': {
                  onClick() {
                    console.log('sign out 3')
                  }
                },
              }
            })}  
          </div>
        </section>
      </header>
    `
  }
}

/**
 * ${confirmDialog({
        ref: dialogRef,
        message: 'Confirm log out?',
        onConfirm: onConfirmDialog
      })}
 */

customElements.define('ignem-header', IgnemHeader)
