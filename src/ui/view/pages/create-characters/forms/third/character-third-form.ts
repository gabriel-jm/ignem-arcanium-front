import { html } from 'lithen-tag-functions'
import { Item } from '@/domain/protocols/use-cases'
import { ItemsStore } from '@/ui/stores'
import { IgnemItemTinyCard, itemCard } from '@/ui/view/components'
import { IgnemCreateCharacterPage } from '../../ignem-create-character-page'

interface EquipSlotProps {
  title: string
  emptyMessage: string
  onClick: Function
}

function equipSlot({ title, emptyMessage, onClick }: EquipSlotProps) {
  return html`
    <div on-click=${onClick} class="equip-slot-container">
      <p class="equip-slot-title">${title}</p>
      <div class="equip-slot">${emptyMessage}</div>
    </div>
  `
}

export function characterThirdForm(parent: IgnemCreateCharacterPage) {
  let availableItems: Item[] = []
  let lastSelectedItemId = ''
  let selectedEquipmentSlot: Element | null = null

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

  function onClickEquipmentSlot(event: Event) {
    const target = event.currentTarget as Element

    selectedEquipmentSlot?.classList.remove('selected')
    selectedEquipmentSlot = target
    selectedEquipmentSlot.classList.add('selected')
  }
  
  parent.once('init', () => {
    availableItems = new ItemsStore().items.sort((a, b) => {
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
          equipSlot({
            title: 'Left Hand',
            emptyMessage: 'Empty Hand',
            onClick: onClickEquipmentSlot
          }),
          equipSlot({
            title: 'Right Hand',
            emptyMessage: 'Empty Hand',
            onClick: onClickEquipmentSlot
          }),
          equipSlot({
            title: 'Armor',
            emptyMessage: 'None',
            onClick: onClickEquipmentSlot
          }),
          equipSlot({
            title: 'Accessory 1',
            emptyMessage: 'None',
            onClick: onClickEquipmentSlot
          }),
          equipSlot({
            title: 'Accessory 2',
            emptyMessage: 'None',
            onClick: onClickEquipmentSlot
          })
        ]}
      </div>

      <div class="items-display">
        <div class="items-list-container">
          <h3>Items List</h3>
          <ul class="third items-list" equip-items-list></ul>
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
