import { characterStatsStyles } from '@/ui/view/styles'
import { css } from 'lithen-tag-functions'

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

  .primary-stats-container span {
    margin-right: 16px;
  }

  .attributes-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 18px;
  }

  .attributes-group div {
    display: flex;
    gap: 0 16px;
    flex-wrap: wrap;
  }

  .equipment-section {
    padding: 16px 2px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .equipment-slot-name {
    font-size: 1.15rem;
    font-weight: bold;
    text-transform: capitalize;
    padding-bottom: 6px;
  }
`
