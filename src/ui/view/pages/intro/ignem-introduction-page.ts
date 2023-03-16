import { buttonStyles, IgnemElement } from '@/ui/view'
import { router } from 'lithen-router'
import { css, html } from 'lithen-fns'

export class IgnemIntroductionPage extends IgnemElement {
  styling() {
    return css`
      ${buttonStyles}

      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: linear-gradient(
          to top left,
          #2a2a2a,
          #050505
        );
      }

      h1 {
        margin-bottom: 20px;
        text-align: center;
        padding: 0 12px;
      }
    `
  }

  render() {
    const onClick = async () => {
      router.goTo('/login')
    }

    return html`
      <h1>Welcome to Ignem Arcanium</h1>
      <button class="btn" on-click=${onClick}>
        Login
      </button>
    `
  }
}

customElements.define('ignem-intro', IgnemIntroductionPage)
