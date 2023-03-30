import { css } from 'lithen-fns'

export const characterFourthFormStyles = css`
  .inventory-size {
    height: fit-content;
    text-align: right;
  }

  .inventory-size span:first-of-type {
    pointer-events: none;
  }

  .inventory-size .chevron-up-icon {
    display: none;
    pointer-events: none;
    transition: all 200ms;
    transform-origin: center;
    color: var(--sub-font-color);
  }

  .inventory-size-message {
    font-size: 1.5rem;
    font-weight: bold;
    padding-right: 14px;
  }

  .size-in-use {
    font-size: 1.5rem;
    padding-right: 8px;
  }

  .max-size {
    color: var(--sub-font-color);
  }

  .inventory-container {
    display: flex;
    margin-top: 24px;
    gap: 18px;
    overflow-x: hidden;
  }

  .inventory-items {
    flex: 3;
  }

  .inventory-items h3 {
    font-size: 1.5rem;
    padding-bottom: 8px;
  }

  .item-info-container {
    flex: 1;
  }

  .item-info-container .select-item-message {
    color: var(--sub-font-color);
    text-align: center;
    border-radius: 4px;
    padding: 50px 0;
  }

  .item-info {
    padding-top: 8px;
  }

  [inventory] {
    margin-bottom: 24px;
  }

  [inventory], .items-list {
    display: grid;
    background-color: var(--bright-black);
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    padding: 10px;
    border-radius: 4px;
    align-content: flex-start;
    height: 220px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  [inventory] .item-container,
  .items-list .item-container {
    flex: 1;
  }

  .inventory-empty-message {
    grid-column: span 5;
    text-align: center;
    padding-top: 30px;
    color: var(--sub-font-color);
    font-size: 1.1rem;
  }

  .hide {
    display: none;
  }

  @media screen and (max-width: 1100px) {
    .inventory-items {
      flex: 2;
    }
  }

  @media screen and (max-width: 750px) {
    .inventory-items {
      flex: 1;
    }
  }

  @media screen and (max-width: 425px) {
    .inventory-container {
      display: block;
    }
    
    .inventory-items {
      padding-bottom: 50px;
    }

    .item-info-container {
      width: 100%;
      height: 300px;
      position: fixed;
      left: 0;
      top: 90%;
      background-color: var(--black);
      padding: 6px;
      border-radius: 8px;
      box-shadow: 0 0 3px 2px #1117;
      transition: all 250ms;
    }

    .item-info-container:focus {
      outline: 1px solid var(--container-border-color);
    }

    .item-info-container.open {
      transform: translateY(-80%);
    }

    .inventory-size {
      display: flex;
      padding: 0 8px;
      padding-bottom: 4px;
      justify-content: space-between;
      align-items: center;
    }

    .inventory-size .chevron-up-icon {
      display: block;
    }

    .item-info-container.open .chevron-up-icon {
      transform: rotate(180deg);
    }

    .item-info {
      height: 85%;
      background-color: var(--body-bg-color);
      padding: 6px 8px;
      border-radius: 4px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
`
