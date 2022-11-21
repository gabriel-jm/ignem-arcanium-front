import { html } from 'lithen-tag-functions'
import { IgnemCreateCharacterPage, IgnemCreateCharacterProps } from '../../ignem-create-character-page'
import { IgnemItemTinyCard, itemCard } from '@/ui/view/components/item'
import { ItemsStore } from '@/ui/stores'
import { InventoryItem } from '@/ui/protocols'
import { Item } from '@/domain/protocols/use-cases'
import { chevronUpIcon, textBetweenDashes } from '@/ui/view/components'
import { router } from 'lithen-router'

export function characterFourthForm(
  parent: IgnemCreateCharacterPage,
  props: IgnemCreateCharacterProps
) {
  let inventoryItems: InventoryItem[] = []
  let availableItems: Item[] = []
  let sizeInUse = 0
  let lastSelectedItemId = ''

  function onFocusInventoryItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    const item = availableItems.find(item => item.id === itemId)

    if (!item) return

    lastSelectedItemId = item.id

    if (!parent.select(`[inv-item-info] [key-id="${item.id}"]`)) {
      parent.select('[inv-item-info]')?.replaceChildren(itemCard(item))
    }
  }

  function incrementQuantity() {
    const item = inventoryItems.find(
      item => item.id === lastSelectedItemId
    )

    if (!item) return

    sizeInUse += item.weight
    item.quantity += 1
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()
  }

  function decrementQuantity() {
    const item = inventoryItems.find(
      item => item.id === lastSelectedItemId
    )

    if (!item) return

    sizeInUse -= item.weight
    item.quantity -= 1
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()

    if (item.quantity < 1) {
      parent.select(`[inventory] [key-id="${item.id}"]`)?.remove()
      parent.select('[item-info]')?.replaceChildren(html`
        <p class="select-item-message">
          Select an item to show its details
        </p>
      `)

      inventoryItems = inventoryItems.filter(invItem => invItem.id !== item.id)
      lastSelectedItemId = ''
      
      if (inventoryItems.length === 0) {
        parent.select('.inventory-empty-message')?.classList.remove('hide')
      }
    }
  }

  function findItem(itemId: string | null) {
    const itemInInventory = inventoryItems.find(item => item.id === itemId)

    if (itemInInventory) {
      parent
        .select<any>(`[inventory] [key-id="${itemId}"]`)!
        .incrementQuantity()      
    } else {
      const itemIndex = availableItems.findIndex(item => item.id === itemId)

      const item = {
        ...availableItems[itemIndex],
        quantity: 1
      }
      sizeInUse += item.weight

      const itemCard = new IgnemItemTinyCard({
        ...item,
        onFocus: onFocusInventoryItem,
        onIncrement: incrementQuantity,
        onDecrement: decrementQuantity
      })
  
      parent.select('[inventory]')?.append(itemCard)

      inventoryItems.push(item)
    }
  }

  function addToInventory(itemId: string | null) {
    const itemExists = availableItems.some(item => item.id === itemId)

    if (!itemExists) return

    lastSelectedItemId = String(itemId)
    findItem(itemId)
    
    parent.select('.size-in-use')!.textContent = sizeInUse.toString()
    parent.select('.inventory-empty-message')?.classList.add('hide')
  }

  function onDoubleClickItem(event: Event) {
    const target = event.target as HTMLElement
    const itemId = target.getAttribute('key-id')

    addToInventory(itemId)
  }

  async function onSubmitForm(event: Event) {
    event.preventDefault()
    const inventory = inventoryItems.map(item => ({
      itemId: item.id,
      quantity: item.quantity
    }))

    const result = await props.createCharacterPresenter
      .handle({
        ...parent.characterData,
        inventoryItems: inventory
      })

    console.log(result)

    if (result.ok) {
      router.goTo('/chracters')
    }
  }
  
  parent.once('init', () => {
    availableItems = new ItemsStore().items

    parent.select('[inv-items-list]')?.append(
      ...availableItems.map(item => new IgnemItemTinyCard({
        ...item,
        onClick: onFocusInventoryItem,
        onDoubleClick: onDoubleClickItem
      }))
    )
  })

  function toggleItemInfo(action: 'add'| 'remove') {
    return () => {
      if (!matchMedia('(max-width: 425px)').matches) return
      
      const itemInfoContainer = parent.select('.item-info-container')

      itemInfoContainer.classList[action]('open')

      if (action === 'remove') itemInfoContainer.blur()
    }
  }

  return html`
    <form
      is="ignem-form"
      class="character-form"
      step="4"
      on-submit=${onSubmitForm}
    >
      ${textBetweenDashes('Inventory')}

      <p class="explanatory-message">
        Select the items that your character is current holding
      </p>

      <section class="inventory-container">
        <div class="inventory-items">
          <h3>Your Inventory</h3>
          <ul inventory>
            <p class="inventory-empty-message">
              Your inventory is empty
            </p>
          </ul>

          <h3>Items List</h3>
          <ul class="items-list" inv-items-list></ul>
        </div>
        
        <div
          tabindex="-1"
          class="item-info-container"
          on-focusin=${toggleItemInfo('add')}
          on-blur=${toggleItemInfo('remove')}
        >
          <p class="inventory-size">
            <span>
              <span class="inventory-size-message">Inventory size</span>
              <span class="size-in-use">0</span>
              <span class="max-size">/ 200</span>
            </span>
            <span>
              ${chevronUpIcon()}
            </span>
          </p>
          
          <div class="item-info">
            <div inv-item-info>
              <p class="select-item-message">
                Select an item to show its details
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="form-buttons">
        <button
          class="btn-bordered"
          type="button"
          on-click=${() => parent.previous()}
        >
          Previous
        </button>
        <button class="btn">Next</button>
      </div>
    </form>
  `
}
