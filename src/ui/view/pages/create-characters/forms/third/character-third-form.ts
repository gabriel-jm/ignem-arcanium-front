import { Item } from '@/domain/protocols/use-cases'
import { ItemsStore } from '@/ui/stores'
import { IgnemItemTinyCard, itemCard } from '@/ui/view/components'
import { IgnemCreateCharacterPage } from '@/ui/view/pages/create-characters/ignem-create-character-page'
import { html } from 'lithen-tag-functions'

function itemSlot(title: string, emptyMessage: string) {
  return html`
    <div class="item-slot-container">
      <p class="item-slot-title">${title}</p>
      <div class="item-slot">${emptyMessage}</div>
    </div>
  `
}

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  let availableItems: Item[] = []
  let lastSelectedItemId = ''

  function onFocusInventoryItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    const item = availableItems.find(item => item.id === itemId)

    if (!item) return

    lastSelectedItemId = item.id

    if (!parent.select(`[item-info] [key-id="${item.id}"]`)) {
      parent.select('[item-info]')?.replaceChildren(itemCard(item))
    }
  }
  
  parent.once('init', () => {
    availableItems = new ItemsStore().items

    parent.select('[equip-items-list]')?.append(
      ...availableItems.map(item => new IgnemItemTinyCard({
        ...item,
        onClick: onFocusInventoryItem,
        // onDoubleClick: onDoubleClickItem
      }))
    )
  })

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
        <div>
          <h3>Items List</h3>
          <ul class="items-list" equip-items-list></ul>
        </div>

        <div class="item-info">
          <div item-info>
            <p class="select-item-message">
              Select an item to show its details
            </p>
          </div>
        </div>
      </div>
    </section>
  `
}
