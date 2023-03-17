import { containerStyles, IgnemElement } from '@/ui/view'
import { css, el } from 'lithen-fns'

export interface IgnemSideModalElement extends IgnemElement {
  open(): void
  close(): void
}

/**
 * @event -click-outside
 */
export class IgnemSideModal extends IgnemElement {
  open() {
    this.classList.add('open')
  }

  close() {
    this.classList.add('close')
  }

  styling() {
    return css`
      ${containerStyles}

      :host {
        display: none;
        opacity: 0;
        background-color: #0007;
        z-index: 2;
        position: fixed;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 400ms ease-in-out;
      }

      :host(.open) {
        display: block;
        opacity: 1;
      }

      :host(.close) {
        animation: fade-out 400ms ease-in-out;
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
        border: 1px solid var(--container-border-color);
        border-radius: 4px;
        padding: 10px 14px;
        animation: slide-left 600ms ease-in-out;
      }

      :host(.close) .side-modal-container {
        animation-name: slide-right;
      }

      @keyframes slide-left {
        from {
          transform: translateX(100%);
          opacity: 0;
        }

        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slide-right {
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      @keyframes fade-out {
        to {
          opacity: 0;
        }
      }
    `
  }
  
  render() {
    this.on('click', (event: Event) => {
      const containerElement = this.select('.container')
      const [clickedElement] = event.composedPath()
      
      if (clickedElement === this || clickedElement === containerElement) {
        this.dispatchEvent(new Event('click-outside'))
      }
    })

    this.on('animationend', (event: AnimationEventInit) => {
      if (event.animationName === 'fade-out') {
        this.classList.remove('open', 'close')
      }
    })

    return el/*html*/`
      <section class="container">
        <div class="side-modal-container">
          <slot></slot>
        </div>
      </section>
    ` as Element
  }
}

customElements.define('ignem-side-modal', IgnemSideModal)
