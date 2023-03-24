import { html, ref } from 'lithen-fns'
import { headerStyles } from './header-styles.js'
import { router } from '@/main/config/routes.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'
import { confirmDialog, logOutIcon } from '../index.js'
import { IgnemElement } from '@/ui/view/ignem-element.js'

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

    const openDialog = () => dialogRef.el?.showModal()
    const onConfirmDialog = () => this.#accountStore.logout()

    return html`
      <header class="header">
        <section class="container">
          <div>
            <h1
              class="title"
              on-click=${() => router.navigate('/home')}
            >
              Ignem Arcanium
            </h1>
          </div>
          <div>
            <h1 class="account-name">${accountName}</h1>
            <span on-click=${openDialog}>
              ${logOutIcon()}
            </span>  
          </div>
        </section>
      </header>
      ${confirmDialog({
        ref: dialogRef,
        message: 'Confirm log out?',
        onConfirm: onConfirmDialog
      })}
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
