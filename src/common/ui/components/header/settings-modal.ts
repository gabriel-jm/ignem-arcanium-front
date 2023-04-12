import { ElementRef, css, el, html, ref, shell, signal } from 'lithen-fns'
import { closeIcon } from '../index.js'

export interface SettingsModalProps {
  ref: ElementRef<DialogElement>
}

const settingsModalStyles = css`
  dialog {
    width: 65vw;
    height: 520px;
    margin: 40px auto;
    color: var(--font-color);
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    box-shadow: 1px 3px 3px 2px var(--black-900);
  }

  dialog::backdrop {
    background-color: #1118;
    backdrop-filter: blur(5px);
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: stretch;
    height: 100%;
  }

  .settings-tabs {
    flex: 1;
    background-color: var(--bg-primary);
    color: var(--font-color);
    padding: 24px;
  }

  .settings-tabs h3 {
    font-size: 1.6rem;
    padding-bottom: 24px;
  }

  .tabs-list li {
    margin: 8px 0;
    padding: 12px 16px;
    border-radius: 4px;
    transition: background 200ms ease-out;
    cursor: pointer;
  }

  .tabs-list li:not(.active):hover {
    background-color: var(--transparent-white);
  }

  .tabs-list li.active {
    background-color: var(--bg-primary-bright);
    font-weight: bolder;
  }

  .settings-content {
    flex: 3;
    background-color: var(--bg-secondary);
    padding: 24px;
  }

  .close {
    display: block;
    margin-left: auto;
    width: 32px;
    padding: 0;
    border: 0;
    cursor: pointer;
    color: var(--font-color);
    background-color: transparent;
  }

  .bold {
    font-weight: bold;
    margin-right: 12px;
  }
`

const accountTab = el/*html*/`
  <div>
    <h2>Account</h2>

    <div>
      <span class="bold">Name</span>
      <span>Anyone</span>
    </div>
    <div>
      <span class="bold">E-Mail</span>
      <span>any@email.com</span>
    </div>
  </div>
`

const themeTabStyles = css`
  h2 {
    padding-bottom: 24px;
  }

  form {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  label {
    display: block;
    padding: 8px 16px;
    background-color: var(--transparent-white);
    border-radius: 4px;
    cursor: pointer;
  }
`

function themeTab() {
  return el/*html*/`
    <ignem-wrapper css="${themeTabStyles}">
      <h2>Theme</h2>

      <form>
        <label>
          Dark Black &nbsp;
          <input
            type="radio"
            name="theme"
            value="dark-black"
            checked
            on-change=${(e: Event) => {
              const target = e.target as HTMLInputElement

              if (target.checked) {
                document.body.className = target.value
              }
            }}
          />
        </label>

        <label>
          Dark Blue &nbsp;
          <input
            type="radio"
            name="theme"
            value="dark-blue"
            on-change=${(e: Event) => {
              const target = e.target as HTMLInputElement

              if (target.checked) {
                document.body.className = target.value
              }
            }}
          />
        </label>

        <label>
          Light Black &nbsp;
          <input
            type="radio"
            name="theme"
            value="light-black"
          />
        </label>

        <label>
          Light Blue &nbsp;
          <input
            type="radio"
            name="theme"
            value="light-blue"
          />
        </label>
      </form>
    </ignem-wrapper>
  `
}

export function settingsModal({ ref: modalRef }: SettingsModalProps) {
  const currentTab = signal('account')
  const tabShell = shell(currentTab, (tab) => {
    switch(tab) {
      case 'account':
        return accountTab
      case 'theme':
        return themeTab()
      case 'language':
        return html`
          <h1>Language</h1>

          <p>Coming soon...</p>
        `
      default:
        return el/*html*/`<p>Not Found</p>`
    }
  })

  const tabsListRef = ref<HTMLUListElement>()

  function changeTab(event: Event) {
    if (event.target === event.currentTarget) return

    const activeTab = tabsListRef.el?.querySelector('li.active')

    if (activeTab) {
      activeTab.className = ''
    }

    const target = event.target as HTMLElement
    target.className = 'active'
    const tabName = target.getAttribute('tab')

    currentTab.set(String(tabName))
  }

  return html`
    <ignem-wrapper css="${settingsModalStyles}">
      <dialog ref=${modalRef}>
        <div class="content">
          <section class="settings-tabs">
            <h3>Settings</h3>

            <ul
              ref=${tabsListRef}
              class="tabs-list"
              on-click=${changeTab}
            >
              <li class="active" tab="account">
                Account
              </li>
              <li tab="theme">Theme</li>
              <li tab="language">Language</li>
            </ul>
          </section>
          <section class="settings-content">
            <button
              class="close"
              on-click=${() => modalRef.el?.close()}
            >
              ${closeIcon()}
            </button>
            ${tabShell}
          </section>
        </div>
      </dialog>
    </ignem-wrapper>
  `
}
