import { html } from 'lithen-tag-functions'

function itemSlot(title: string, emptyMessage: string) {
  return html`
    <div class="item-slot-container">
      <p class="item-slot-title">${title}</p>
      <div class="item-slot">${emptyMessage}</div>
    </div>
  `
}

export function characterThirdForm() {
  return html`
    <p class="explanatory-message">
      Select your character's current equipment
    </p>

    <section class="equipment">
      <div class="equipment-display">
        ${[
          itemSlot('Left Hand', 'Empty Hand'),
          itemSlot('Right Hand', 'Empty Hand'),
          itemSlot('Armor', 'None'),
          itemSlot('Accessory 1', 'None'),
          itemSlot('Accessory 2', 'None')
        ]}
      </div>

      <div class="items-display">
        <h3>Items List</h3>
        <ul items-list></ul>
      </div>
    </section>
  `
}
