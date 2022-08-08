import { IgnemCreateCharacterPage } from '../ignem-create-character-page'
import { css, html } from 'lithen-tag-functions'

export const characterThirdFormStyles = css`
  .inventory-message {
    text-align: center;
    color: var(--sub-font-color);
    margin: 10px 0 20px 0;
    padding: 0 16px;
  }
  
  .inventory-size {
    text-align: right;
  }

  .inventory-size span {
    display: inline-block;
  }

  .inventory-size-message {
    font-size: 1.5rem;
    font-weight: bold;
    padding-right: 30px;
  }

  .size-in-use {
    font-size: 1.5rem;
    padding-right: 8px;
  }

  .max-size {
    color: var(--sub-font-color);
  }
`

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  return html`
    <p class="inventory-message">
      Select the items that your character is current holding
    </p>

    <p class="inventory-size">
      <span class="inventory-size-message">Inventory size</span>
      <span class="size-in-use">0</span>
      <span class="max-size">/ 200</span>
    </p>

    
  `
}
