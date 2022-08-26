import { html } from 'lithen-tag-functions'

export function characterThirdForm() {
  return html`
    <p class="explanatory-message">
      Select your character's current equipment
    </p>

    <section class="equipment">
      <div class="equipment-display">
        <div class="item-slot-container">
          <p class="item-slot-title">Left Hand</p>
          <div class="item-slot">
            Empty Hand
          </div>  
        </div>

        <div class="item-slot-container">
          <p class="item-slot-title">Right Hand</p>
          <div class="item-slot">
            Empty Hand
          </div>  
        </div>

        <div class="item-slot-container">
          <p class="item-slot-title">Armor</p>
          <div class="item-slot">
            None
          </div>  
        </div>

        <div class="item-slot-container">
          <p class="item-slot-title">Accessory 1</p>
          <div class="item-slot">
            None
          </div>  
        </div>

        <div class="item-slot-container">
          <p class="item-slot-title">Accessory 2</p>
          <div class="item-slot">
            None
          </div>  
        </div>
      </div>

      <div class="items-display">

      </div>
    </section>
  `
}
