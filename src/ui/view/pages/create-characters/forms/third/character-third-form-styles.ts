import { css } from 'lithen-tag-functions'

export const characterThirdFormStyles = css`
  .equipment-display {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .items-display {
    display: flex;
    margin-top: 24px;
    gap: 18px;
    overflow-x: hidden;
  }

  .equip-slot-container {
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 150ms ease-in-out;
  }

  .equip-slot-container:hover {
    background-color: var(--bright-black);
  }

  .equip-slot-container.selected {
    background-color: var(--bright-black);
    border: 2px solid var(--container-border-color);
  }

  .equip-slot-title {
    font-weight: bold;
    font-size: 1.1rem;
    padding-bottom: 5px;
    text-indent: 3px;
  }

  .equip-slot {
    width: 230px;
    background-color: var(--black);
    padding: 6px 8px;
    border-radius: 4px;
  }

  .items-list-container {
    flex: 3;
  }

  .items-list.third {
    height: 450px;
  }

  .item-info {
    flex: 1;
  }
`
