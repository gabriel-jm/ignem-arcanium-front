import { Item } from '@/domain/protocols/use-cases'
import { closeIcon } from '@/ui/view/components/icons'
import { itemIconByType } from '@/ui/view/components/item'
import { css, html } from 'lithen-tag-functions'

interface EquipmentItemCardProps {
  item?: Item | null
  onDelete?: Function
}

const rarities = ['common', 'uncommon']

const borderImageByRarity = rarities.map(rarity => css`
  .equip-slot.${rarity} {
    background-image: linear-gradient(
      145deg,
      var(--dark-${rarity}),
      var(--black) 30%
    );
  }
`)

const equipmentItemCardStyles = css`
  .equip-slot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 230px;
    height: 48px;
    background-color: var(--black);
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px 12px;
    border: 0;
    border-radius: 4px;
  }

  ${borderImageByRarity}

  .equip-item-display {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .equip-item-name {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .equip-item-display img {
    width: 26px;
    filter: invert(0.8);
  }
`

export function equipmentItemCard({ item, onDelete }: EquipmentItemCardProps = {}) {
  const cardContent = item
    ? html`
      <div class="equip-item-name">
        <img alt="Item icon" src="${itemIconByType(item)}" />
        <p>${item.name}</p>
      </div>
    `
    : html`<p>None</p>`

  return html`
    <ignem-wrapper css="${equipmentItemCardStyles}">
      <div class="equip-slot ${item?.rarity}">  
        <div class="equip-item-display">
          ${cardContent}    
        </div>
        ${item && onDelete && html`
          <div on-click=${onDelete}>
            ${closeIcon()}
          </div>
        `}
      <div>
    </ignem-wrapper>
  `
}
