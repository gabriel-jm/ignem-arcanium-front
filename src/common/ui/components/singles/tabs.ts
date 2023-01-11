import { IgnemElement } from '@/ui/view'
import { css, html } from 'lithen-tag-functions'

export class IgnemTabs extends IgnemElement {
  constructor() {
    super()
    this.init()
  }

  init() {
    const tabs = Array.from(this.querySelectorAll('[tab]'))
    const tabNames = tabs.map(tab => tab.getAttribute('tab'))
    this.select('[tab-names]').append(...tabNames.map(name => {
      return html`<p>${name}</p>`
    }))
    tabs.at(0)?.classList.add('active')
  }

  styling() {
    return css`
      ::slotted([tab]:not(.active)) {
        display: none;
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
