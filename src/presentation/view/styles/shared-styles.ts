import { defineSharedStyles } from 'lithen-super-element'
import { css } from 'lithen-tag-functions'

export const sharedStyles = () => defineSharedStyles(css`
  button {
    font-family: 'Nunito', sans-serif;
    background-color: #333;
    cursor: pointer;
    padding: 10px 14px;
    color: #ddd;
    border-radius: 4px;
    border: 0;
    outline: 0;
    box-sizing: border-box;
  }

  button:hover {
    background-color: #3f3f3f;
  }

  button:focus {
    outline: 2px solid #aaaa;
  }

  button:active {
    background-color: #2a2a2a;
  }
`)
