import { css } from 'lithen-tag-functions'

export const buttonStyles = css`
  .btn {
    --btn-bg-color: var(--black);
    --btn-focus-outline-color: #aaaa;
    --btn-border-color: #6a6a6a;

    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    background-color: var(--btn-bg-color);
    cursor: pointer;
    color: var(--font-color);
    padding: 10px 14px;
    border-radius: 4px;
    border: 0;
    transition: background-color 150ms;
  }

  .btn:hover {
    --btn-bg-color: #171717;
  }

  .btn:focus {
    outline: 2px solid var(--btn-focus-outline-color);
  }

  .btn:active {
    --btn-bg-color: #1d1d1d;
  }
`

export const borderedButtonStyles = css`
  .btn-bordered {
    --btn-font-color: var(--font-color);
    --btn-bg-color: transparent;
    --btn-focus-outline-color: #aaaa;
    --btn-border-color: #6a6a6a;

    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    background-color: var(--btn-bg-color);
    cursor: pointer;
    color: var(--btn-font-color);
    padding: 10px 14px;
    border-radius: 4px;
    border: 1px solid var(--btn-border-color);
    transition: background-color 150ms, color 150ms;
  }

  .btn-bordered:hover {
    --btn-bg-color: #6a6a6a1a;
  }

  .btn-bordered:focus {
    outline: 2px solid var(--btn-focus-outline-color);
  }

  .btn-bordered:active {
    --btn-bg-color: #6a6a6a;
    --btn-font-color: var(--black);
  }
`
