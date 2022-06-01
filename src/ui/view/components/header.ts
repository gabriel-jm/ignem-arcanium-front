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
    `
  }

  render() {
    const accountName = this.#accountStore.account?.name

    return html`
      <header class="header">
        <section class="container">
          <div>
            ${menuIcon()}
            <h1 class="title">Ignem Arcanium</h1>
          </div>
          <div>
            <h3>${accountName}</h3>
            <span on-click=${() => {
              this.select<HTMLElement & { showModal(): void }>('dialog')?.showModal()
            }}>
              ${logOutIcon()}
            </span>  
          </div>
        </section>
      </header>
      <dialog>
        Do you want to log out?
        <button>Yes</button>
        <button on-click=${() => {
          this.select<HTMLElement & { close(): void }>('dialog')?.close()
        }}>No</button>
      </dialog>
    `
  }
}

customElements.define('ignem-header', IgnemHeader)
