import { html } from 'lithen-tag-functions'

export function characterThirdForm() {
  return html`
    <p class="explanatory-message">
      Select your character's current equipment
    </p>

    <section class="equipment">
      <div class="equipment-display">
        <div>
          <p>Left Hand</p>
          <div>
            Empty Hand
          </div>  
        </div>

        <div>
          <p>Right Hand</p>
          <div>
            Empty Hand
          </div>  
        </div>
      </div>

      <div class="items-display">

      </div>
    </section>
  `
}
