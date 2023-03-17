import { IgnemElement } from '@/ui/view/index.js'
import { css, html } from 'lithen-fns'

export class IgnemTabs extends IgnemElement {
  constructor() {
    super()
    this.init()
  }

  init() {
    const tabs = Array.from(this.querySelectorAll('[tab]'))
    const tabNames = tabs.map(tab => tab.getAttribute('tab'))
    tabs.at(0)?.classList.add('active')
    this.select('[tab-names]').append(
      ...tabNames.map((name, index) => html`
        <p
          class="${!index && 'active'}"
          tab-name="${name}"
          on-click=${this.#changeActiveTab.bind(this)}
        >
          ${name}
        </p>
      `)
    )
  }

  #changeActiveTab(event: Event) {
    const target = event.target as Element

    if (target.classList.contains('active')) return

    const currentActive = this.select('[tab-names] p.active')
    currentActive.classList.remove('active')
    this.querySelector(`[tab="${currentActive?.getAttribute('tab-name')}"]`)
      ?.classList.remove('active')
    
    target.classList.add('active')
    this.querySelector(`[tab="${target.getAttribute('tab-name')}"]`)
      ?.classList.add('active')
  }

  styling() {
    return css`
      ::slotted([tab]:not(.active)) {
        display: none;
      }

      [tab-names] {
        display: flex;
        align-items: center;
      }

      [tab-names] p {
        padding: 12px 18px;
        font-size: 1.1rem;
        cursor: pointer;
        background-color: var(--black);
        transition: all 200ms ease-in-out;
      }

      [tab-names] p.active {
        background-color: var(--white);
        color: var(--black);
      }

      [tab-names] p:first-of-type {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      [tab-names] p:last-of-type {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    `
  }
  
  render() {
    return `
      <div tab-names></div>
      <div tab-content>
        <slot></slot>
      </div>
    `
  }
}

customElements.define('ignem-tabs', IgnemTabs)
