import { html, ref } from 'lithen-fns'
import { headerStyles } from './header-styles.js'
import { router } from '@/main/config/routes.js'
import { AccountStore } from '@/account/ui/stores/account-store.js'
import { confirmDialog, optionsDialog, verticalDotsIcon } from '../index.js'
import { IgnemElement } from '@/common/ui/ignem-element.js'
import { settingsModal } from './settings-modal.js'

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
    const confirmDialogRef = ref<DialogElement>()
    const settingsDialogRef = ref<DialogElement>()
    const accountName = this.#accountStore.account?.name

    const openDialog = () => dialogRef.el?.show()

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
                Settings() {
                  settingsDialogRef.el?.showModal()
                },
                'Sign Out': () => confirmDialogRef.el?.showModal()
              }
            })}  
          </div>
        </section>
      </header>

      ${confirmDialog({
        ref: confirmDialogRef,
        message: 'Confirm Sign Out?',
        onConfirm: () => this.#accountStore.logout()
      })}

      ${settingsModal({
        ref: settingsDialogRef
      })}
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
