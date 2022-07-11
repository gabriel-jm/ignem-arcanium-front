import { containerStyles } from '@/ui/view/styles'
import { css } from 'lithen-tag-functions'

export const headerStyles = css`
  ${containerStyles}

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

  .log-out-dialog {
    margin: auto;
    margin-top: 5%;
    border: 1px solid var(--container-border-color);
    border-radius: 5px;
    background-color: var(--body-bg-color);
    box-shadow: 0 3px 5px #121212;
  }

  .log-out-dialog[open] {
    animation: show-dialog 300ms ease-out;
  }

  .log-out-dialog p {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--font-color);
    padding: 30px 60px;
  }

  .log-out-dialog button {
    width: 50%;
    background-color: transparent;
    border: 0;
    border-top: 1px solid var(--container-border-color);
    font-size: 1rem;
    color: var(--font-color);
    cursor: pointer;
    padding: 14px 0;
  }

  .log-out-dialog button:first-of-type {
    border-right: 1px solid var(--container-border-color);
  }

  .log-out-dialog.close {
    animation: close-dialog 300ms ease-out;
  }

  @keyframes show-dialog {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes close-dialog {
    to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
`