import { damageFormaterStyles, propertiesFormaterStyles } from '@/item/ui/components/formaters/index.js'
import { css } from 'lithen-fns'

const rarities = ['common', 'uncommon']

const backgroundByRarity = rarities.map(rarity => css`
  .item-details.${rarity} {
    background-image: linear-gradient(
      145deg,
      var(--dark-${rarity}),
      var(--black-900) 30%
    );
  }
`)

const rarityNameColorByRarity = rarities.map(rarity => css`
  .item-details.${rarity} .rarity {
    --color: var(--bright-${rarity});
  }
`)

export const itemCardStyles = css`
  ${[damageFormaterStyles, propertiesFormaterStyles]}

  .item-details {
    padding: 12px;
    border-radius: 4px;
    background-color: var(--black-900);
    animation: show 120ms backwards ease-in-out;
  }

  ${backgroundByRarity}

  .item-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }

  .item-title img {
    width: 50px;
    filter: invert(0.8);
  }

  .item-title h3 {
    font-size: 1.5em;
  }

  .rarity {
    --color: var(--font-color);

    font-weight: bold;
    text-transform: capitalize;
    padding-top: 5px;
    padding-bottom: 10px;
    color: var(--color);
  }

  ${rarityNameColorByRarity}

  p:not(.description) {
    padding-bottom: 16px;
  }

  .properties {
    display: flex;
    flex-wrap: wrap;
  }

  .properties > p {
    min-width: 50%;
  }

  .property-name {
    display: block;
    font-size: 0.85rem;
    color: var(--sub-font-color);
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateX(15px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`
