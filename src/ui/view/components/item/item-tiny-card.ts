import '../singles/quantity-control'
import { Item } from '@/domain/protocols/use-cases'
import { itemIconByType } from './item-icon-by-type'
import { css, html, raw } from 'lithen-tag-functions'
import { IgnemQuantityControlElement, IgnemWrapper } from '@/ui/view/components/singles'

export interface ItemTinyCardProps extends Item {
  onClick?: Function
  onFocus?: Function
  onIncrement?: Function
  onDecrement?: Function
  quantity?: number
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

  .item-quantity {
    display: flex;
    justify-content: center;
  }

  .item-content .weight {
    color: var(--sub-font-color);
    font-size: 0.7rem;
    text-align: center;
    line-height: 1.6;
  }
`

export function itemTinyCard(props: ItemTinyCardProps) {
  const {
    id,
    rarity,
    name,
    weight,
    quantity,
    onClick,
    onFocus,
    onIncrement,
    onDecrement
  } = props

  const wrapper = <IgnemWrapper & { incrementQuantity: any }> html.first`
    <ignem-wrapper
      css="${itemTinyCardStyles}"
      title="${name}"
      tabindex="0"
      key-id="${id}"
      on-click=${onClick}
      on-focus=${onFocus}
    >
      <li class="item-container ${rarity.toLowerCase()}">
        <figure class="item-icon">
          <img alt="Item Icon" src="${itemIconByType(props)}" />
        </figure>

        <div class="item-content ${quantity && 'quantity'}">
          <span class="name">${name}</span>
          ${quantity
            ? html`
              <ignem-quantity-control
                class="item-quantity"
                on-increment=${onIncrement}
                on-decrement=${onDecrement}
              />
            `
            : raw`
              <span class="weight">
                Weight ${weight}
              </span>
            `
          }
        </div>
      </li>
    </ignem-wrapper>
  `

  wrapper.incrementQuantity = () => {
    wrapper
      .select<IgnemQuantityControlElement>('ignem-quantity-control')
      ?.incrementQuantity()
  }

  return wrapper
}
