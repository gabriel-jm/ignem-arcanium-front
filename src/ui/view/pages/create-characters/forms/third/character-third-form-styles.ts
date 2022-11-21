import { css } from 'lithen-tag-functions'

// TODO: fix item details display
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

  .items-list-container {
    flex: 3;
  }

  .items-list-container h3 {
    font-size: 1.5rem;
    padding-bottom: 8px;
  }

  .items-list.third {
    height: 450px;
  }

  .item-info {
    flex: 1;
  }
`
