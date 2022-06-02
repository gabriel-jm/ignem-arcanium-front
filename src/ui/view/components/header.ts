import { AccountStore } from '@/ui/stores'
import { IgnemElement, menuIcon, logOutIcon } from '@/ui/view'
import { containerStyles } from '@/ui/view/styles'
import { css, html } from 'lithen-tag-functions'

export class IgnemHeader extends IgnemElement {
  #accountStore = new AccountStore()

  constructor() {
    super({ preventRenderApplying: true })
    this.applyRender()
  }

  styling() {
    return css`
      ${containerStyles}

      .header {
        background-color: #151515;
        display: block;
        padding: 6px 10px;
      }

      .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .container > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .title {
        font-size: 1.4rem;
        margin: 0;
      }

      .menu-icon {
        cursor: pointer;
        margin-right: 16px;
      }

      .account-name {
        max-width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .log-out-icon {
        font-size: 0.8rem;
        margin-left: 16px;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
      }

      .log-out-icon:hover {
        background-color: #222;
      }

      .log-out-dialog {
        margin: auto;
        margin-top: 5%;
        border: 1px solid #555;
        border-radius: 5px;
        background-color: var(--body-bg-color);
        box-shadow: 0 3px 5px #121212;
      }

      .log-out-dialog[open] {
        animation: show-dialog 500ms;
      }
      
      .log-out-dialog p {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--font-color);
        padding: 30px 60px;
      }

      .log-out-dialog button {
        width: 50%;
        background-color: transparent;
        border: 0;
        border-top: 1px solid #555;
        font-size: 1rem;
        color: var(--font-color);
        cursor: pointer;
        padding: 14px 0;
      }

      .log-out-dialog button:first-of-type {
        border-right: 1px solid #555;
      }

      @keyframes show-dialog {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }

        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `
  }

  render() {
    const accountName = this.#accountStore.account?.name

    const openDialog = () => this.select<DialogElement>('dialog')?.showModal()
    const closeDialog = () => this.select<DialogElement>('dialog')?.close()
    const confirmDialog = () => this.#accountStore.logout()

    return html`
      <header class="header">
        <section class="container">
          <div>
            ${menuIcon()}
            <h1 class="title">Ignem Arcanium</h1>
          </div>
          <div>
            <h3 class="account-name">${accountName}</h3>
            <span on-click=${openDialog}>
              ${logOutIcon()}
            </span>  
          </div>
        </section>
      </header>
      <dialog class="log-out-dialog">
        <p>Confirm log out?</p>
        <button on-click=${confirmDialog}>Yes</button>
        <button on-click=${closeDialog}>No</button>
      </dialog>
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
