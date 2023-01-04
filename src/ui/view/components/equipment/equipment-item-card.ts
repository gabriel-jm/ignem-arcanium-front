import { Item } from '@/domain/protocols/use-cases'
import { closeIcon } from '@/ui/view/components/icons'
import { itemIconByType } from '@/ui/view/components/item'
import { css, html } from 'lithen-tag-functions'

interface EquipmentItemCardProps {
  item: Item
  onDelete?: Function
}

const rarities = ['common', 'uncommon']

const borderImageByRarity = rarities.map(rarity => css`
  .equip-slot.${rarity} {
    border-image-source: linear-gradient(
      to bottom right,
      var(--bright-${rarity}),
      var(--black) 35%
    );
  }
`)

const equipmentItemCardStyles = css`
  .equip-slot {
    width: 230px;
    background-color: var(--black);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 8px 8px;
    border: 2px solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(
      to top left,
      var(--black),
      var(--black)
    );
  }

  ${borderImageByRarity}

  .equip-item-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .equip-item-name {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1rem;
  }

  .equip-item-display img {
    width: 26px;
    filter: invert(0.8);
  }
`

export function equipmentItemCard({ item, onDelete }: EquipmentItemCardProps) {
  return html`
    <ignem-wrapper css="${equipmentItemCardStyles}">
      <div class="equip-slot ${item.rarity}">  
        <div class="equip-item-display">
          <div class="equip-item-name">
            <img alt="Item icon" src="${itemIconByType(item)}" />
            <p>${item.name}</p>
          </div>
          ${onDelete && html`
            <div on-click=${onDelete}>
              ${closeIcon()}
            </div>
          `}
        </div>
      <div>
    </ignem-wrapper>
  `
}
