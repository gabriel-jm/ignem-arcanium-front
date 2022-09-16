import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'

/**
 * @attr empty-message
 */
class IgnemEquipmentSlot extends IgnemElement {
  styling() {
    return css`
      .equip-slot-container {
        box-sizing: border-box;
        padding: 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 150ms ease-in-out;
      }

      .equip-slot-container:hover {
        background-color: var(--bright-black);
      }

      :host(.selected) .equip-slot-container {
        background-color: var(--bright-black);
        border: 2px solid var(--container-border-color);
      }

      .equip-slot-title {
        font-weight: bold;
        font-size: 1.1rem;
        padding-bottom: 5px;
        text-indent: 3px;
      }

      .equip-slot {
        width: 230px;
        background-color: var(--black);
        padding: 6px 8px;
        border-radius: 4px;
      }
    `
  }

  render() {
    const title = this.getAttribute('title')
    const emptyMessage = this.getAttribute('empty-message') ?? 'None'

    return html`
      <div class="equip-slot-container">
        <p class="equip-slot-title">${title}</p>
        <div class="equip-slot">${emptyMessage}</div>
      </div>
    `
  }
}

customElements.define('ignem-equip-slot', IgnemEquipmentSlot)
