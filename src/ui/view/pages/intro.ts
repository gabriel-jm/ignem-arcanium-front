import { buttonStyles, IgnemElement } from '@/ui/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-tag-functions'

export class IgnemIntroductionPage extends IgnemElement {
  styling() {
    return css`
      ${buttonStyles}

      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `
  }

  render() {
    const onClick = async () => {
      router.goTo('/login')
    }

    return html`
      <h1>Introduction</h1>
      <button class="btn" on-click=${onClick}>
        Login
      </button>
    `
  }
}

customElements.define('ignem-intro', IgnemIntroductionPage)
