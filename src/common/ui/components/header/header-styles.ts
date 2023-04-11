import { containerStyles } from '@/common/ui/styles/index.js'
import { css } from 'lithen-fns'
import { confirmDialogStyles } from '../index.js'

export const headerStyles = css`
  ${[containerStyles, confirmDialogStyles]}

  .container {
    padding: 4px 8px;
  }

  .container div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .float-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(
      150deg,
      var(--primary) 50%,
      var(--primary-bright)
    );
    padding: 6px 18px;
    border-radius: 8px;
    box-shadow: 0 2px 3px var(--primary);
  }

  .title {
    font-size: 1.25rem;
    margin: 0;
    cursor: pointer;
  }

  .user-section {
    position: relative;
  }

  .account-name {
    font-size: 1.15rem;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .vertical-dots-icon {
    font-size: 0.8rem;
    margin-left: 12px;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
  }

  .vertical-dots-icon:hover {
    background-color: #222;
  }
`