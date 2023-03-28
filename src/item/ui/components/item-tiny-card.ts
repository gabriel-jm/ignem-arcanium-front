import { itemIconByType } from './item-icon-by-type.js'
import { css, html, el } from 'lithen-fns'
import { IgnemElement } from '@/common/ui/ignem-element.js'
import { capitalize } from '@/common/ui/helpers/index.js'
import { IgnemQuantityControl } from '@/common/ui/index.js'
import { Item } from '@/item/types/items.js'

export interface ItemTinyCardProps extends Item {
  onClick?: Function
  onDoubleClick?: Function
  onFocus?: Function
  onIncrement?: Function
  onDecrement?: Function
  quantity?: number
  quantityControl?: boolean
  showAttr?: string
}

const rarities = ['common', 'uncommon']

const backgroundByRarity = rarities.map(rarity => css`
  .item-container.${rarity} {
    background-image: linear-gradient(
      145deg,
      var(--dark-${rarity}),
      var(--black) 35%
    );
  }
`)

export const itemTinyCardStyles = css`
  .item-container {
    min-width: 210px;
    min-height: 60px;
    max-height: 60px;
    background-color: var(--black);
    padding: 6px 8px;
    border-radius: 4px;
    display: flex;
    gap: 0 18px;
    align-items: center;
    cursor: pointer;
  }

  :host(:focus) .item-container {
    outline: 2px solid var(--outline-white);
  }

  ${backgroundByRarity}

  .item-icon {
    height: 36px;
  }

  .item-icon img {
    width: 36px;
    filter: invert(0.8);
  }

  .item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
  }

  .item-content.quantity {
    align-items: flex-end;
  }

  .item-content * {
    flex: 1;
  }

  .item-content .name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-content .name::selection {
    background-color: transparent;
  }

  .item-quantity {
    display: flex;
    justify-content: center;
  }

  .item-content .attr {
    color: var(--sub-font-color);
    font-size: 0.7rem;
    text-align: center;
    line-height: 1.6;
  }
`

export class IgnemItemTinyCard extends IgnemElement {
  #props: ItemTinyCardProps

  constructor(props: ItemTinyCardProps) {
    super()
    this.title = props.name
    this.tabIndex = 0
    this.setAttribute('key-id', props.id)
    props.onClick && this.on('click', props.onClick)
    props.onFocus && this.on('focus', props.onFocus)
    props.onDoubleClick && this.on('dblclick', props.onDoubleClick)

    this.#props = props
    this.applyRender()
  }

  incrementQuantity = () => {
    this
      .select<IgnemQuantityControl>('ignem-quantity-control')
      ?.incrementQuantity()
  }

  styling() {
    return itemTinyCardStyles
  }

  render() {
    const {
      rarity,
      name,
      quantity,
      quantityControl,
      showAttr,
      onIncrement,
      onDecrement
    } = this.#props

    const isQuantityControlEnabled = quantityControl && quantity

    return html`
      <li class="item-container ${rarity.toLowerCase()}">
        <figure class="item-icon">
          <img alt="Item Icon" src="${itemIconByType(this.#props)}" />
        </figure>

        <div class="item-content ${isQuantityControlEnabled && 'quantity'}">
          <span class="name">${name}</span>
          ${isQuantityControlEnabled && html`
            <ignem-quantity-control
              class="item-quantity"
              on-increment=${onIncrement}
              on-decrement=${onDecrement}
            />
          `}
          ${!isQuantityControlEnabled && showAttr && el/*html*/`
            <span class="attr">
              ${capitalize(showAttr)} ${Reflect.get(this.#props, showAttr)}
            </span>
          `}
        </div>
      </li>
    `
  }
}

customElements.define('ignem-item-tiny-card', IgnemItemTinyCard)
