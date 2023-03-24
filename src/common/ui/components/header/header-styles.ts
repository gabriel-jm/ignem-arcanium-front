import { containerStyles } from '@/common/ui/styles/index.js'
import { css } from 'lithen-fns'
import { confirmDialogStyles } from '../index.js'

export const headerStyles = css`
  ${[containerStyles, confirmDialogStyles]}

  .header {
    background: linear-gradient(
      150deg,
      var(--black) 50%,
      var(--bright-black) 80%,
      var(--body-bg-color) 95%
    );
    display: block;
    padding: 6px 10px;
  }

  .container {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .container > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 1.4rem;
    margin: 0;
    cursor: pointer;
  }

  .menu-icon {
    cursor: pointer;
    margin-right: 16px;
  }

  .account-name {
    font-size: 1.2rem;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .log-out-icon {
    font-size: 0.8rem;
    margin-left: 16px;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
  }

  .log-out-icon:hover {
    background-color: #222;
  }
`