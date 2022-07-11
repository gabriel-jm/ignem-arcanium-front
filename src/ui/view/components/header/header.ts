import { html } from 'lithen-tag-functions'
import { AccountStore } from '@/ui/stores'
import { IgnemElement, menuIcon, logOutIcon } from '@/ui/view'
import { headerStyles } from './header-styles'

export class IgnemHeader extends IgnemElement {
  #accountStore = new AccountStore()

  constructor() {
    super({ preventRenderApplying: true })
    this.applyRender()
  }

  styling() {
    return headerStyles
  }

  render() {
    const accountName = this.#accountStore.account?.name

    const openDialog = () => this.select<DialogElement>('dialog')?.showModal()
    const setCloseClass = () => this.select('dialog')?.classList.add('close')
    const closeDialog = (event: AnimationEventInit) => {
      if (event.animationName === 'close-dialog') {
        const dialog = this.select<DialogElement>('dialog')
        dialog?.close()
        dialog?.classList.remove('close')
      }
    }
    const confirmDialog = () => this.#accountStore.logout()

    return html`
      <header class="header">
        <section class="container">
          <div>
            ${menuIcon()}
            <h1 class="title">Ignem Arcanium</h1>
          </div>
          <div>
            <h1 class="account-name">${accountName}</h1>
            <span on-click=${openDialog}>
              ${logOutIcon()}
            </span>  
          </div>
        </section>
      </header>
      <dialog on-animationend=${closeDialog} class="log-out-dialog">
        <p>Confirm log out?</p>
        <button on-click=${confirmDialog}>Yes</button>
        <button on-click=${setCloseClass}>No</button>
      </dialog>
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
