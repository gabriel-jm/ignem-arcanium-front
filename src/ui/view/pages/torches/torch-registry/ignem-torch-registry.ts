import { closeIcon, featherIcon, IgnemElement } from '@/ui/view'
import { html } from 'lithen-tag-functions'
import { torchLitIcon } from '../icons/torch-lit-icon'
import { torchOffIcon } from '../icons/torch-off-icon'
import { IgnemTorchBtnElement } from '../ignem-torch-btn'
import { torchRegistryStyles } from './torch-registry-styles'

export interface IgnemTorchRegistryProps {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export class IgnemTorchRegistry extends IgnemElement {
  #id = this.getAttribute('id') || ''

  get id() {
    return this.#id
  }

  constructor(props: IgnemTorchRegistryProps) {
    super({ preventRender: true })
    this.setAttributes({
      ...props,
      'character-name': props.characterName,
      'torch-count': props.torchCount,
      'torch-charge': props.torchCharge,
      'is-lit': props.isLit
    })

    this.applyRender()
  }

  #toggleEdit() {
    const hasClass = this.select('.torch-card')?.classList.toggle('edit')

    this.select('ignem-torch-button')!.innerHTML = String(
      hasClass ? closeIcon() : featherIcon()
    )
    
    return hasClass
  }
  
  styling() {
    return torchRegistryStyles
  }

  render() {
    const isLit = this.hasAttribute('is-lit')
    const torchCharge = Number(this.getAttribute('torch-charge'))
    const list = Array.from({ length: 6 }).map((_value, index) => html`
      <li
        class="charge-count ${index+1 <= torchCharge && 'filled'}"
      ></li>
    `)

    const characterName = this.getAttribute('character-name')

    const onClickEditTorch = () => {
      const isEditing = this.#toggleEdit()
      const torchBtn = this.select<IgnemTorchBtnElement>('.edit-torch-btn')
      torchBtn?.changeTooltip(isEditing ? 'Cancel' : 'Edit')
    }

    return html`
      <div class="torch-card ${isLit && 'lit'}">
        <ignem-torch-button
          class="edit-torch-btn"
          on-click=${onClickEditTorch}
        >
          ${featherIcon()}
        </ignem-torch-button>

        ${isLit ? torchLitIcon() : torchOffIcon()}
        
        <div>
          <div class="torch-owner">
            <div data-tooltip="${characterName}">
              <h3>${characterName}</h3>
            </div>
            <p data-tooltip="Torch count">
              ${this.getAttribute('torch-count')}
            </p>
          </div>
          <ul data-tooltip="Torch charge" class="torch-charges">
            ${list}
          </ul>
        </div>
      </div>
    `
  }
}

customElements.define('ignem-torch-registry', IgnemTorchRegistry)
