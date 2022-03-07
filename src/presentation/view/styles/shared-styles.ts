import { defineSharedStyles } from 'lithen-super-element'
import { css } from 'lithen-tag-functions'

export const sharedStyles = () => defineSharedStyles(css`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    list-style: none;
  }

  .btn {
    font-family: 'Nunito', sans-serif;
    background-color: var(--btn-bg-color);
    cursor: pointer;
    color: var(--font-color);
    padding: 10px 14px;
    border-radius: 4px;
    border: 0;
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
`)
