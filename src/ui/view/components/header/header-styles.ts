import { containerStyles } from '@/ui/view/styles'
import { confirmDialogStyles } from '@/ui/view/components'
import { css } from 'lithen-tag-functions'

export const headerStyles = css`
  ${[containerStyles, confirmDialogStyles]}

  .header {
    background-color: #151515;
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