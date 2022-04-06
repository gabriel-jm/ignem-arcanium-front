import { tooltipStyles } from '@/ui/view/styles'
import { css } from 'lithen-tag-functions'

export const torchRegistryStyles = css`
  ${tooltipStyles}

  :host {
    position: relative;
  }

  .torch-card {
    --lit-color: #c09f34;
    --off-color: #333;
    --edit-color: #2fa0cc;

    display: flex;
    align-items: center;
    gap: 0 18px;
    padding: 12px 14px;
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #1b1b1b;
    box-shadow:
      0 0 0 3px var(--off-color),
      0 0 3px 1px #1114
    ;
    cursor: default;
    transition: 300ms all;
  }

  .torch-card:not(.edit):hover .edit-torch-btn,
  .torch-card.edit .edit-torch-btn {
    transform: scale(1);
  }

  .torch-card.lit {
    box-shadow:
      0 0 0 3px var(--lit-color),
      0 0 6px 2px #eed151c7
    ;
  }

  .torch-card.edit {
    box-shadow:
      0 0 0 3px var(--edit-color),
      0 0 6px 2px #1114
    ;
  }

  .torch-card > div {
    flex: 1;
  }

  .torch-owner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .torch-owner h3 {
    width: 170px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.8rem;
  }

  .torch-owner > p {
    font-size: 1.45rem;
    font-weight: bold;
  }

  .torch-charges {
    display: flex;
    height: 5px;
    justify-content: stretch;
    align-items: center;
    gap: 0 6px;
    padding: 8px 0 4px;
    box-sizing: content-box;
  }

  .charge-count {
    height: 100%;
    width: 100%;
    background-color: #121212;
    border-radius: 50px;
  }

  .charge-count.filled {
    background-color: var(--off-color);
  }

  .torch-card.lit .charge-count.filled {
    background-color: var(--lit-color);
  }

  .torch-icon {
    display: block;
    width: 4rem;
    fill: var(--off-color);
  }

  .torch-card.lit .torch-icon {
    fill: var(--lit-color);
  }

  .edit-torch-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    transform: scale(0);
    transition: all 300ms 250ms ease;
  }
`
