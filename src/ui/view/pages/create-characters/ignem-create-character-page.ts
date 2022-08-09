import '../../components/header/header'
import { IgnemElement } from '@/ui/view/ignem-element'
import { css, html } from 'lithen-tag-functions'
import { containerStyles, formControlStyles } from '@/ui/view/styles'
import {
  breadcrumbs,
  IgnemFormElement,
  textBetweenDashes,
  textBetweenDashesStyles
} from '@/ui/view/components'
import { characterFirstForm, characterFirstFormStyles } from './forms/character-first-form'
import { characterSecondForm, characterSecondFormStyles } from './forms/character-second-form'
import { characterThirdForm, characterThirdFormStyles } from './forms/character-third-form'
import { SuperElementRenderValues } from 'lithen-super-element'
import { Presenter } from '@/presentation/protocols'
import { Item } from '@/ui/protocols'
import { ItemsStore } from '@/ui/stores'
import { itemTinyCardStyles } from '@/ui/view/components/item'

export class IgnemCreateCharacterPage extends IgnemElement {
  iconByType: Record<string, string> = {
    CONSUMABLE: '/bag.png',
    WEAPON: '/sword.png',
    SHIELD: '/shield.png',
    ARMOR: '/armor.png',
    POTION: '/potion.png'
  }
  
  #listItemsPresenter: Presenter
  #sizeInUse = 0
  #inventoryItems: Item[] = []
  #items: Item[] = []
  
  constructor(
    listAllDefaultItemsPresenter: Presenter
  ) {
    super()
    this.#listItemsPresenter = listAllDefaultItemsPresenter

    this.init()
  }

  get form() {
    return this.select<IgnemFormElement>('form.character-form')!
  }

  get availableItems() {
    return this.#items
  }

  async init() {
    await this.#listItemsPresenter.handle()

    this.#items = new ItemsStore().items

    this.dispatchEvent(new Event('init'))
  }

  addToInventory(itemId: string | null) {
    const itemIndex = this.#items.findIndex(item => item.id === itemId)

    if (itemIndex !== -1) {
      const item = { ...this.#items[itemIndex] }
      this.#sizeInUse += item.weight
      this.#inventoryItems.push(item)
      this.#items.slice(itemIndex, 1)

      this.select('.size-in-use')!.textContent = this.#sizeInUse.toString()

      this.select('.inventory-empty-message')?.remove()

      this.select('[inventory]')?.append(html`
        <li
          tabindex="0"
          key-id="${item.id}"
          class="item-container ${item.rarity.toLowerCase()}"
        >
          <span class="name" title="${item.name}">
            <img src="${this.iconByType[item.type] ?? '/potion.png'}" />
            ${item.name}
          </span>
          <span>1</span>
        </li>
      `)
    }
  }

  styling() {
    const aditionalStyles = [
      containerStyles,
      formControlStyles,
      textBetweenDashesStyles,
      itemTinyCardStyles,
      characterFirstFormStyles,
      characterSecondFormStyles,
      characterThirdFormStyles
    ]

    return css`
      ${aditionalStyles}

      .characters-title {
        font-size: 2rem;
        border-bottom: 1px solid var(--container-border-color);
        padding-top: 16px;
        padding-bottom: 16px;
        margin-bottom: 30px;
      }

      @media screen and (max-width: 375px) {
        .first-form {
          display: flex;
          flex-direction: column;
        }
      }
    `
  }
  
  render(): SuperElementRenderValues {
    const breadcrumbProps = {
      Home: '/home',
      Characters: '/characters',
      'Create Character': 'current'
    }

    return html`
      <ignem-header />

      <section class="container">
        ${breadcrumbs(breadcrumbProps)}
        <h1 class="characters-title">Create Character</h1>
        <form is="ignem-form" class="character-form">
          ${[
            characterFirstForm(this),
            textBetweenDashes('Attributes'),
            characterSecondForm(this),
            textBetweenDashes('Inventory'),
            characterThirdForm(this)
          ]}
        </form>
      </section>
    `
  }
}

customElements.define('ignem-create-character-page', IgnemCreateCharacterPage)
