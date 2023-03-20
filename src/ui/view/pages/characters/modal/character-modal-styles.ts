import { characterStatsStyles } from '@/common/ui/styles/index.js'
import { css } from 'lithen-fns'

export const characterModalStyles = css`
  ${characterStatsStyles}

  dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 24px 8%;
    border: 0;
    background-color: #0007;
    overflow-y: auto;
    color: var(--font-color);
  }

  .modal-container {
    background-color: var(--body-bg-color);
    border-radius: 4px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px 2px #0008;
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .modal-header figure {
    width: 80px;
  }

  .modal-header h1 {
    margin-bottom: 4px;
  }

  .modal-close-btn {
    align-self: flex-start;
    margin-left: auto;
    cursor: pointer;
  }

  .primary-stats-container span {
    margin-right: 16px;
  }

  .attributes-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 18px;
    background-color: var(--bright-black);
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .attributes-group div {
    display: flex;
    gap: 0 16px;
    flex-wrap: wrap;
  }

  .equipment-section {
    padding: 16px 2px;
    display: flex;
    gap: 32px;
  }

  .equipment-slot-container {
    margin: 16px 0;
    cursor: pointer;
  }

  .equipment-slot-name {
    font-size: 1.15rem;
    font-weight: bold;
    text-transform: capitalize;
    padding-bottom: 6px;
  }

  .equipment-item-details {
    flex: 1;
    max-width: 300px;
  }

  .inventory {
    display: grid;
    background-color: var(--bright-black);
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
    padding: 10px;
    border-radius: 4px;
    align-content: flex-start;
    max-height: 420px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 10px 0;
  }
`
