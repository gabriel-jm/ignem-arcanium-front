import { html } from 'lithen-tag-functions'

export function characterThirdForm() {
  return html`
    <p class="explanatory-message">
      Select your character's current equipment
    </p>

    <section>
      <div>
        <p>Left Hand</p>
        <div>
          Empty Hand
        </div>  
      </div>
      
      <p>
        <span>Right Hand</span>
      </p>

      <p>
        <span>Armor</span>
      </p>

      <p>
        <span>Accessory 1</span>
      </p>

      <p>
        <span>Accessory 2</span>
      </p>
    </section>
  `
}
