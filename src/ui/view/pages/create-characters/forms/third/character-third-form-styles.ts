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
