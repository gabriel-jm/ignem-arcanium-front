import { IgnemElement, tooltipStyles } from '@/ui/view'
import { css, html } from 'lithen-tag-functions'

export interface IgnemTorchBtnElement extends IgnemElement {
  changeTooltip(text: string): void
}

export class IgnemTorchBtn extends IgnemElement {
  changeTooltip(text: string) {
    this.select('div')!.dataset.tooltip = text
  }

  styling() {
    return css`
      ${tooltipStyles}

      div {
        width: 34px;
        height: 34px;
        background-color: var(--btn-bg-color);
        border-radius: 50%;
        box-shadow: 0 0 4px 1px #222;
        padding: 8px;
        cursor: pointer;
      }
    `
  }

  render() {
    return html`
      <div data-tooltip="Edit">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('ignem-torch-button', IgnemTorchBtn)
