import { containerStyles, IgnemElement } from '@/ui/view'
import { css, html } from 'lithen-tag-functions'

export class IgnemTorchSideModal extends IgnemElement {
  styling() {
    return css`
      ${containerStyles}

      :host {
        background-color: #0007;
        z-index: 2;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .container {
        height: 100%;
        padding: 10px;
      }

      .side-modal-container {
        max-width: 400px;
        height: 100%;
        margin-left: auto;
        background-color: var(--body-bg-color);
        box-sizing: border-box;
        border: 1px solid #3f3f3f;
        border-radius: 4px;
        animation: slide-left 500ms ease-out forwards;
      }

      @keyframes slide-left {
        from {
          transform: translateX(50%);
          opacity: 0;
        }

        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `
  }
  
  render() {
    return html`
      <section class="container">
        <div class="side-modal-container">
          content
        </div>
      </section>
    `
  }
}

customElements.define('ignem-torch-side-modal', IgnemTorchSideModal)
