import { html } from 'lithen-tag-functions'
import { Item } from '@/domain/protocols/use-cases'
import { ItemsStore } from '@/ui/stores'
import { IgnemEquipmentSlot, IgnemItemTinyCard, itemCard } from '@/ui/view/components'
import { IgnemCreateCharacterPage } from '../../ignem-create-character-page'

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  let availableItems: Item[] = []
  let lastSelectedItemId = ''
  let selectedEquipmentSlot: IgnemEquipmentSlot | null = null

  function onFocusInventoryItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    const item = availableItems.find(item => item.id === itemId)

    if (!item) return

    lastSelectedItemId = item.id

    if (!parent.select(`[equip-item-info] [key-id="${item.id}"]`)) {
      parent.select('[equip-item-info]')?.replaceChildren(itemCard(item))
    }
  }

  function onDoubleClickItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')
    const item = availableItems.find(item => item.id === itemId)

    selectedEquipmentSlot?.setItem(item ?? null)
  }

  function onClickEquipmentSlot(event: Event) {
    const target = event.currentTarget as IgnemEquipmentSlot

    selectedEquipmentSlot?.classList.remove('selected')
    selectedEquipmentSlot = target
    selectedEquipmentSlot.classList.add('selected')
  }
  
  parent.once('init', () => {
    availableItems = new ItemsStore().items.sort(a => {
      if (a.type === 'WEAPON') {
        return -2
      }

      if (a.type === 'ARMOR' || a.type === 'SHIELD') {
        return -1
      }

      return 1
    })

    parent.select('[equip-items-list]')?.append(
      ...availableItems.map(item => new IgnemItemTinyCard({
        ...item,
        onClick: onFocusInventoryItem,
        onDoubleClick: onDoubleClickItem
      }))
    )

    selectedEquipmentSlot = parent.select<IgnemEquipmentSlot>(
      'ignem-equip-slot[title="Right Hand"]'
    )
    selectedEquipmentSlot.classList.add('selected')
  })

  return html`
    <p class="explanatory-message">
      Select your character's current equipment
    </p>

    <section class="equipment">
      <div class="equipment-display">
        <ignem-equip-slot
          title="Right Hand"
          empty-message="Empty Hand"
          on-click=${onClickEquipmentSlot}
        />
        <ignem-equip-slot
          title="Left Hand"
          empty-message="Empty Hand"
          on-click=${onClickEquipmentSlot}
        />
        <ignem-equip-slot
          title="Armor"
          on-click=${onClickEquipmentSlot}
        />
        <ignem-equip-slot
          title="Accessory 1"
          on-click=${onClickEquipmentSlot}
        />
        <ignem-equip-slot
          title="Accessory 2"
          on-click=${onClickEquipmentSlot}
        />
      </div>

      <div class="items-display">
        <div class="items-list-container">
          <h3>Items List</h3>
          <ul class="third items-list" equip-items-list></ul>
        </div>

        <div class="item-info">
          <div equip-item-info>
            <p class="select-item-message">
              Select an item to show its details
            </p>
          </div>
        </div>
      </div>
    </section>
  `
}
