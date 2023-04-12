import { ElementRef, css, html } from 'lithen-fns'
import { closeIcon } from '../index.js'

export interface SettingsModalProps {
  ref: ElementRef<DialogElement>
}

const settingsModalStyles = css`
  dialog {
    width: 60%;
    margin: auto;
    color: var(--font-color);
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    box-shadow: 1px 3px 3px 2px var(--black);
  }

  dialog::backdrop {
    background-color: #1118;
    backdrop-filter: blur(5px);
  }

  .content {
    display: flex;
    justify-content: center;
  }

  .settings-tabs {
    flex: 1;
    background-color: var(--primary);
    color: var(--font-color);
    padding: 24px;
  }

  .settings-tabs h3 {
    font-size: 1.6rem;
    padding-bottom: 24px;
  }

  .settings-content {
    flex: 3;
    background-color: var(--primary-bright);
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
`

export function settingsModal({ ref }: SettingsModalProps) {
  return html`
    <ignem-wrapper css="${settingsModalStyles}">
      <dialog ref=${ref}>
        <div class="content">
          <section class="settings-tabs">
            <h3>Settings</h3>

            <ul>
              <li>Account</li>
              <li>Theme</li>
              <li>Language</li>
            </ul>
          </section>
          <section class="settings-content">
            <button class="close" on-click=${() => ref.el?.close()}>
              ${closeIcon()}
            </button>
            <div>
              <div>
                <span>Name</span>
                <span>Anyone</span>
              </div>
              <div>
                <span>E-Mail</span>
                <span>any@email.com</span>
              </div> 
            </div>
          </section>
        </div>
      </dialog>
    </ignem-wrapper>
  `
}
