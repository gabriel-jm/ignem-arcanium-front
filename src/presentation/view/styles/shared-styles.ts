import { defineSharedStyles } from 'lithen-super-element'
import { css } from 'lithen-tag-functions'

export const sharedStyles = () => defineSharedStyles(css`
  *:not(:host) {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  .btn {
    font-family: 'Nunito', sans-serif;
    background-color: #333;
    cursor: pointer;
    padding: 10px 14px;
    color: #ddd;
    border-radius: 4px;
    border: 0;
  }

  .btn:hover {
    background-color: #3f3f3f;
  }

  .btn:focus {
    outline: 2px solid #aaaa;
  }

  .btn:active {
    background-color: #2a2a2a;
  }
`)
