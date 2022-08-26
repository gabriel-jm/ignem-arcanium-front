import { css } from 'lithen-tag-functions'

export const characterThirdFormStyles = css`
  .equipment-display {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .item-slot-container {
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 150ms ease-in-out;
  }

  .item-slot-container:hover {
    background-color: var(--bright-black);
  }

  .item-slot-title {
    font-weight: bold;
    font-size: 1.1rem;
    padding-bottom: 5px;
    text-indent: 3px;
  }

  .item-slot {
    width: 230px;
    background-color: var(--black);
    padding: 6px 8px;
    border-radius: 4px;
  }
`
