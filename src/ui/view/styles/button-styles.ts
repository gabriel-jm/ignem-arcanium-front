import { css } from 'lithen-tag-functions'

export const buttonStyles = css`
  .btn {
    font-family: 'Nunito', sans-serif;
    background-color: var(--btn-bg-color);
    cursor: pointer;
    color: var(--font-color);
    padding: 10px 14px;
    border-radius: 4px;
    border: 0;
    transition: background-color 150ms;
  }

  .btn:hover {
    background-color: var(--btn-hover-bg-color);
  }

  .btn:focus {
    outline: 2px solid var(--btn-focus-outline-color);
  }

  .btn:active {
    background-color: var(--btn-active-bg-color);
  }
`

export const borderedButtonStyles = css`
  .btn-bordered {
    font-family: 'Nunito', sans-serif;
    background-color: transparent;
    cursor: pointer;
    color: var(--font-color);
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid var(--btn-bordered-border-color);
    transition: background-color 150ms;
  }

  .btn-bordered:hover {
    background-color: var(--btn-bordered-border-color);
    color: var(--body-bg-color);
  }

  .btn-bordered:focus {
    outline: 2px solid var(--btn-focus-outline-color);
  }
`
